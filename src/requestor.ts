import "./dotenv";
import { TaskExecutor } from "@golem-sdk/golem-js";
import { program } from "commander";
import fs from "fs";

type MainOptions = {
  subnetTag: string;
  paymentDriver: string;
  paymentNetwork: string;
  tasksCount: number;
  fibonacciNumber: number;
};

program
  // .option("-n, --fibonacci-number <n>", "fibonacci number", "1")
  .option("-c, --tasks-count <c>", "tasks count", "1")
  .option(
    "--subnet-tag <subnet>",
    "set subnet name, for example 'public'",
    "public"
  )
  .option(
    "--payment-driver, --driver <driver>",
    "payment driver name, for example 'erc20'",
    "erc20"
  )
  .option(
    "--payment-network, --network <network>",
    "network name, for example 'goerli'",
    "goerli"
  )
  .action(async (options: MainOptions) => {
    const executor = await TaskExecutor.create({
      package: "lordevendim/simgolem-simulation:latest",
      subnetTag: options.subnetTag,
      payment: {
        driver: options.paymentDriver,
        network: options.paymentNetwork,
      },
    });

    const runningTasks: Promise<string | undefined>[] = [];
    for (let i = 0; i < options.tasksCount; i++) {
      runningTasks.push(
        executor.run(async (ctx) => {
          const result = await ctx.run("/usr/local/bin/node", [
            "/golem/work/task.js",
            // options.fibonacciNumber.toString(),
          ]);
          console.log(result.stdout);
          fs.writeFileSync("./output.txt", result.stdout.toString().trim());
          return result.stdout?.toString().trim();
        })
      );
    }

    try {
      await Promise.all(runningTasks);
    } catch (err) {
      fs.writeFileSync("./error.txt", err.toString().trim());
      console.error("Running the task on Golem failed due to", err);
    } finally {
      await executor.shutdown();
    }
  });

program.parse();

// import { TaskExecutor } from "@golem-sdk/golem-js";

// (async function main() {
//   const executor = await TaskExecutor.create("golem/alpine:latest");
//   try {
//     await executor.run(async (ctx) =>
//       console.log((await ctx.run("echo 'Hello World'")).stdout)
//     );
//   } catch (error) {
//     console.error("Computation failed:", error);
//   } finally {
//     await executor.shutdown();
//   }
// })();
