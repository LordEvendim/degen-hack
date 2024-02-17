import { Herbivore, Plant } from "./entity";
import { Simulation } from "./simulation";
import {ENTITY_SIZE, IMAGE_HEIGHT, IMAGE_WIDTH} from "./constants";
import renderSimulationStep from "./renderer";

const entities = [
    new Plant({x: 0, y: 0}),
    new Herbivore({x: 2, y: 4}),
    new Plant({x: 9, y: 5}),
]

const simulation = new Simulation(
    undefined, {minX: 0, minY: 0, maxX: IMAGE_WIDTH / ENTITY_SIZE, maxY: IMAGE_HEIGHT / ENTITY_SIZE}, entities
);

for (let i = 0; i < 30; ++i) {
    simulation.makeStep();
    console.log(`step ${simulation.step}`);
    renderSimulationStep(simulation);
}