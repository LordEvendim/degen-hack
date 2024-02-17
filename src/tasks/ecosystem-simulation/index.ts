import { Simulation } from "./simulation";
import {
  ENTITY_SIZE,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SIMULATION_STEPS,
  START_POPULATION,
} from "./constants";
import renderSimulationStep from "./renderer";
import { generateRandomEntities } from "./utils";
import { generateGif } from "./gif";
import fs from "fs";

const bounds = {
  minX: 0,
  minY: 0,
  maxX: IMAGE_WIDTH / ENTITY_SIZE,
  maxY: IMAGE_HEIGHT / ENTITY_SIZE,
};
const entities = generateRandomEntities(
  bounds,
  START_POPULATION["Plant"],
  START_POPULATION["Herbivore"],
  START_POPULATION["Carnivore"]
);

const simulation = new Simulation(undefined, bounds, entities);

const runSimulation = async (steps: number) => {
  for (let i = 0; i < steps; ++i) {
    simulation.makeStep();
    console.log(`step ${simulation.step}`);
    await renderSimulationStep(simulation);
    if (simulation.entities.length === 0) {
      console.log("All entities are dead. Stopping simulation.");
      break;
    }
  }
};

export const execute = async () => {
  let dir = "./out/gif";

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await runSimulation(SIMULATION_STEPS);
  await generateGif(`./out/`, "step", ".png", SIMULATION_STEPS);
};
