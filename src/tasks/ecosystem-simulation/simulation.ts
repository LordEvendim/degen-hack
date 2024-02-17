import {IEntity} from "./entities/entity"
import {Rectangle} from "./utils"

interface ISimulation {
    step: number
    grid: (IEntity | undefined)[][]
    bounds: Rectangle
    entities: IEntity[]

    makeStep(): void
}

export class Simulation implements ISimulation {
    step: number
    grid: (IEntity | undefined)[][]
    bounds: Rectangle
    entities: IEntity[]

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
            entity.computeNextMove(this.entities, this.grid);
            const encountered = this.grid[entity.pos.x][entity.pos.y];
            entity.interact(encountered);
            if (entity.alive)
                this.grid[entity.pos.x][entity.pos.y] = entity;
        });
        this.entities.forEach(entity => {
            if (entity.energy <= 0) {
                entity.alive = false;
                this.grid[entity.pos.x][entity.pos.y] = undefined;
            }
        })
        this.entities = this.entities.filter(entity => entity.alive);

        const newEntities: IEntity[] = [];
        this.entities.forEach(entity => {
            const newEntity = entity.multiply(this.grid);
            if (newEntity !== undefined) {
                newEntities.push(newEntity);
                this.grid[newEntity.pos.x][newEntity.pos.y] = newEntity;
            }
        });
        this.entities = this.entities.concat(newEntities);
    }

}
