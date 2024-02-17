import {Position} from "../utils";
import {BaseEntity, EntityTypes, IEntity} from "./entity";

export class Plant extends BaseEntity {
  START_ENERGY = 20;

  constructor(pos: Position) {
    super("Plant", pos);
    this.energy = this.START_ENERGY;
  }

    computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
      super.computeNextMove(entities, nearbyGrid);
      this.addEnergy(1);
    }
}
