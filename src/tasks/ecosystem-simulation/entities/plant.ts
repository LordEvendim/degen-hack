import {getRandomEmptySpaceNearPosition, Position} from "../utils";
import {BaseEntity, IEntity} from "./entity";
import {REPRODUCTION_ENERGY, START_ENERGY_MAP} from "../constants";

export class Plant extends BaseEntity {
  constructor(pos: Position) {
    super("Plant", pos);
    this.energy = START_ENERGY_MAP["Plant"];
  }

    computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
      super.computeNextMove(entities, nearbyGrid);
      const energyAdd = Math.floor(Math.random() * 5);
      this.addEnergy(energyAdd);
    }

    multiply(grid: IEntity[][]): IEntity | undefined {
      if (this.energy < REPRODUCTION_ENERGY["Plant"]) return;
      const newPos = getRandomEmptySpaceNearPosition(grid, this.pos, 2);
      if (newPos === undefined) return undefined;
      this.energy = START_ENERGY_MAP["Plant"];
      return new Plant(newPos);
    }
}
