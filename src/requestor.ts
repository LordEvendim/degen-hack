import "./dotenv";
import { TaskExecutor, pinoLogger } from "@golem-sdk/golem-js";
import { program } from "commander";
import * as fs from "fs";

type MainOptions = {
  subnetTag: string;
  paymentDriver: string;
  paymentNetwork: string;
  tasksCount: number;
  steps: number;
  entitySize: number;
  frameDelay: number;
};

program
  .option("-n, --steps <number>", "simulations steps", "100")
  .option("-ec, --entity-size <number>", "Size of an entity", "10")
  .option("-fd, --frame-delay <number>", "Delay between frames", "100")
  .option("-c, --tasks-count <number>", "tasks count", "3")
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
      logger: pinoLogger({
        level: "debug",
      }),
      taskTimeout: 30 * 60 * 1000,
    });

    const runningTasks: Promise<string | undefined>[] = [];
    for (let i = 0; i < options.tasksCount; i++) {
      runningTasks.push(
        executor.run(async (ctx) => {
          const result = await ctx
            .beginBatch()
            .run("/usr/local/bin/node", [
              "/golem/work/task.js",
              options.steps.toString(),
              options.entitySize.toString(),
              options.frameDelay.toString(),
            ])
            .downloadFile(
              "/golem/work/out/gif/simulation.gif",
              `./gen/simulation${i}.gif`
            )
            .end();

          for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
          }
          return undefined;
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
