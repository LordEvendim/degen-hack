import { Position, direction, distance } from "./utils"

export interface IEntity {
    pos: Position
    energy: number
    alive: boolean

    computeNextMove(entities: IEntity[]): void
    interact(entity: IEntity): IEntity
}

export class Plant implements IEntity {
    pos: Position
    energy: number
    alive: boolean

    constructor(pos: Position) {
        this.pos = pos;
        this.alive = true;
        this.energy = 100;
    }

    computeNextMove(entities: IEntity[]): void {
        return
    }

    interact(entity: IEntity): IEntity {
        return entity;
    }
}

export class Herbivore implements IEntity {
    pos: Position
    energy: number
    alive: boolean

    constructor(pos: Position) {
        this.pos = pos;
        this.alive = true;
        this.energy = 100;
    }

    computeNextMove(entities: IEntity[]): void {
        let closestPlant: Plant | undefined;
        entities.forEach(element => {
            if (!(element instanceof Plant))
                return;
            if (closestPlant === undefined || distance(this.pos, element.pos) < distance(this.pos, closestPlant.pos))
                closestPlant = element;
        });
        const change = (closestPlant != undefined) ? direction(this.pos, closestPlant.pos) : {x: 0, y: 0};
        this.pos = {
            x: this.pos.x + change.x,
            y: this.pos.y + change.y
        }
    }

    interact(entity: IEntity): IEntity {
        switch (true) {
            case entity instanceof Plant:
                this.energy += entity.energy
                entity.alive = false
                console.log('herbivore eats plant omnomom')
                return entity
            default:
                return entity
        }
    }
    
}
