import { Position } from "../utils";

export type EntityTypes = "Plant" | "Carnivore" | "Herbivore";

export interface IEntity {
  type: EntityTypes;
  pos: Position;
  energy: number;
  age: number;
  alive: boolean;

  computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void;
  interact(entity: IEntity): void;
  addEnergy(energy: number): void;
}

export class BaseEntity implements IEntity {
  START_ENERGY: number;
  type: EntityTypes;
  pos: Position;
  energy: number;
  age: number;
  alive: boolean;

  constructor(type: EntityTypes, pos: Position) {
    this.type = type;
    this.pos = pos;
    this.energy = 0;
    this.age = 0;
    this.alive = true;
  }

  computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
    this.age += 1;
  }

  interact(entity: IEntity): void {
    return;
  }

  addEnergy(energy: number): void {
    this.energy += energy;
    this.energy = Math.min(this.energy, this.START_ENERGY * 2);
  }
}
