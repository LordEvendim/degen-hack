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
}
