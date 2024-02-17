import {Position} from "../utils"

export interface IEntity {
    pos: Position
    energy: number
    age: number
    alive: boolean

    computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void
    interact(entity: IEntity): void
}
