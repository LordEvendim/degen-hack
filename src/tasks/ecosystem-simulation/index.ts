import { Herbivore, Plant } from "./entity";
import { Simulation } from "./simulation";

const simulation = new Simulation();
simulation.setState(undefined, undefined, [
    new Plant({x: 0, y: 0}),
    new Herbivore({x: 2, y: 4}),
    new Plant({x: 9, y: 5})
])

for (let i = 0; i < 30; ++i) {
    simulation.makeStep();
    console.log(`step ${simulation.step}`);
    simulation.entities.forEach(entity => {
        console.log(entity);
    })
}
