import {Simulation} from "./simulation";
import {ENTITY_SIZE, IMAGE_HEIGHT, IMAGE_WIDTH} from "./constants";
import renderSimulationStep, {createVideoFromImages} from "./renderer";
import {generateRandomEntities} from "./utils";

const bounds = {minX: 0, minY: 0, maxX: IMAGE_WIDTH / ENTITY_SIZE, maxY: IMAGE_HEIGHT / ENTITY_SIZE};
const entities = generateRandomEntities(bounds, 100, 10, 5);

const simulation = new Simulation(
    undefined, bounds, entities
);

for (let i = 0; i < 300; ++i) {
    simulation.makeStep();
    console.log(`step ${simulation.step}`);
    renderSimulationStep(simulation);
}
createVideoFromImages(5);
