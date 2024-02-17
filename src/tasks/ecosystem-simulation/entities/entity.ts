import { Position } from "../utils";

export type EntityTypes = "Plant" | "Carnivore" | "Herbivore";

export interface IEntity {
  type: EntityTypes;
  pos: Position;
  energy: number;
  age: number;
  alive: boolean;

  computeNextMove(entities: IEntity[], grid: IEntity[][]): void;
  interact(entity: IEntity): void;
  addEnergy(energy: number): void;
  multiply(grid: IEntity[][]): IEntity | undefined;
}

export class BaseEntity implements IEntity {
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

  computeNextMove(entities: IEntity[], grid: IEntity[][]): void {
    this.age += 1;
  }

  interact(entity: IEntity): void {
    return;
  }

  addEnergy(energy: number): void {
    this.energy += energy;
  }

    multiply(grid: IEntity[][]): IEntity | undefined {
      return undefined;
    }
}
