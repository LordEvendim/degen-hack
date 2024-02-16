import { IEntity, Plant } from "./entity"
import { Rectangle, findEntitiesAtPosition, getRandomPosition } from "./utils"

interface ISimulation {
    step: number
    bounds: Rectangle
    entities: IEntity[]

    setState(step: number, bounds: Rectangle, entities: IEntity[]): void
    getState(): {step: number, bounds: Rectangle, entities: IEntity[]}
    makeStep(): void
}

export class Simulation implements ISimulation {
    step: number
    bounds: Rectangle
    entities: IEntity[]
    plantSpawnRate: number = 0.1
    plantsToSpawn: number = 0

    constructor() {
        this.setState(0, {minX: 0, minY: 0, maxX: 10, maxY: 10}, [])
    }
    
    setState(step?: number, bounds?: Rectangle, entities?: IEntity[]): void {
        if (step !== undefined)
            this.step = step;
        if (bounds !== undefined)
            this.bounds = bounds;
        if (entities !== undefined)
            this.entities = entities;
    }

    getState(): { step: number; bounds: Rectangle; entities: IEntity[] } {
        return {
            step: this.step, bounds: this.bounds, entities: this.entities
        }
    }

    makeStep(): void {
        this.step++;
        this.entities.forEach(entity => {
            entity.computeNextMove(this.entities);
            const encountered = findEntitiesAtPosition(this.entities, entity.pos);
            encountered.forEach(encountered_entity => {
                entity.interact(encountered_entity);
            });
        });
        this.entities = this.entities.filter(entity => entity.alive);
        this.plantsToSpawn += this.plantSpawnRate
        if (this.plantsToSpawn >= 1) {
            const n = this.plantSpawnRate / 1;
            this.plantsToSpawn -= n;
            this.spawnPlants(n);
        }
    }

    spawnPlants(n: number): void {
        for (let i = 0; i < n; i++) {
            const randPos = getRandomPosition(this.bounds);
            this.entities.push(new Plant(randPos));
        }
    }
}
