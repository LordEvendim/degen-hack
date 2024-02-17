import {Position} from "../utils";
import {IEntity} from "./entity";

export class Plant implements IEntity {
    START_ENERGY = 20

    pos: Position
    energy: number
    age: number
    alive: boolean

    constructor(pos: Position) {
        this.pos = pos;
        this.alive = true;
        this.age = 0;
        this.energy = this.START_ENERGY;
    }

    computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
        this.age += 1
        return
    }

    interact(entity: IEntity): void {
        return
    }
}