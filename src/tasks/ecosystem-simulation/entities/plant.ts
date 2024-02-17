import { Position } from "../utils";
import { EntityTypes, IEntity } from "./entity";

export class Plant implements IEntity {
  START_ENERGY = 20;

  pos: Position;
  energy: number;
  age: number;
  alive: boolean;
  type: EntityTypes;

  constructor(pos: Position) {
    this.pos = pos;
    this.alive = true;
    this.age = 0;
    this.energy = this.START_ENERGY;
    this.type = "Plant";
  }

  computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
    this.age += 1;
    return;
  }

  interact(entity: IEntity): void {
    return;
  }
}
