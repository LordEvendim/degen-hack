import { IEntity, Plant } from "./entity"
import {Rectangle, findEntitiesAtPosition, getRandomPosition, getUniquePosition} from "./utils"

interface ISimulation {
    step: number
    grid: (IEntity | undefined)[][]
    bounds: Rectangle
    entities: IEntity[]

    makeStep(): void
}

export class Simulation implements ISimulation {
    MAX_AGE = 100

    step: number
    grid: (IEntity | undefined)[][]
    bounds: Rectangle
    entities: IEntity[]
    plantSpawnRate: number = 0.1
    plantsToSpawn: number = 0

    constructor(step: number = 0, bounds: Rectangle = {minX: 0, minY: 0, maxX: 10, maxY: 10}, entities: IEntity[] = []) {
        this.step = step;
        this.bounds = bounds;
        this.entities = entities;
        this.populateGrid();
    }

    populateGrid(): void {
        this.grid = new Array(this.bounds.maxX - this.bounds.minX).fill(undefined).map(() => new Array(this.bounds.maxY - this.bounds.minY).fill(undefined));
        this.entities.forEach(entity => {
            this.grid[entity.pos.x][entity.pos.y] = entity;
        });
    }

    makeStep(): void {
        this.step++;
        this.entities.forEach(entity => {
            if (entity.alive === false)
                return;
            this.grid[entity.pos.x][entity.pos.y] = undefined;
            const nearbyGrid = this.grid.slice(entity.pos.x - 1, entity.pos.x + 2).map(row => row.slice(entity.pos.y - 1, entity.pos.y + 2));
            console.log(nearbyGrid)
            entity.computeNextMove(this.entities, nearbyGrid);
            const encountered = this.grid[entity.pos.x][entity.pos.y];
            entity.interact(encountered);
            if (entity.alive)
                this.grid[entity.pos.x][entity.pos.y] = entity;
        });
        this.entities.forEach(entity => {
            if (entity.energy <= 0 || entity.age > this.MAX_AGE) {
                entity.alive = false;
                this.grid[entity.pos.x][entity.pos.y] = undefined;
            }
        })
        this.entities = this.entities.filter(entity => entity.alive);
        this.plantsToSpawn += this.plantSpawnRate
        if (this.plantsToSpawn >= 1) {
            const n = Math.floor(this.plantSpawnRate);
            this.plantsToSpawn -= n;
            this.spawnPlants(n);
        }

    }

    spawnPlants(n: number): void {
        for (let i = 0; i < n; i++) {
            const randPos = getUniquePosition(this.bounds, this.grid);
            this.entities.push(new Plant(randPos));
            this.grid[randPos.x][randPos.y] = this.entities[this.entities.length - 1];
        }
    }
}
