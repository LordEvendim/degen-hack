import { Simulation } from "./simulation";
import {
  ENTITY_SIZE,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
  SIMULATION_STEPS,
} from "./constants";
import renderSimulationStep from "./renderer";
import { generateRandomEntities } from "./utils";
import { generateGif } from "./gif";

const bounds = {
  minX: 0,
  minY: 0,
  maxX: IMAGE_WIDTH / ENTITY_SIZE,
  maxY: IMAGE_HEIGHT / ENTITY_SIZE,
};
const entities = generateRandomEntities(bounds, 100, 10, 5);

const simulation = new Simulation(undefined, bounds, entities);

const runSimulation = async (steps: number) => {
  for (let i = 0; i < steps; ++i) {
    simulation.makeStep();
    console.log(`step ${simulation.step}`);
    await renderSimulationStep(simulation);
  }
};

export const execute = async () => {
  await runSimulation(SIMULATION_STEPS);
  await generateGif(`./out/`, "step", ".png", SIMULATION_STEPS);
};
