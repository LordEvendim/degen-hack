import { direction, distance, Position } from "../utils";
import { EntityTypes, IEntity } from "./entity";
import { Plant } from "./plant";
import { Carnivore } from "./carnivore";

export class Herbivore implements IEntity {
  START_ENERGY = 50;

  pos: Position;
  energy: number;
  age: number;
  alive: boolean;
  type: EntityTypes;

  constructor(pos: Position) {
    this.pos = pos;
    this.age = 0;
    this.alive = true;
    this.energy = this.START_ENERGY;
    this.type = "Herbivore";
  }

  computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
    let closestPlant: Plant | undefined;
    entities.forEach((element) => {
      if (!(element instanceof Plant)) return;
      if (
        closestPlant === undefined ||
        distance(this.pos, element.pos) < distance(this.pos, closestPlant.pos)
      )
        closestPlant = element;
    });
    const change =
      closestPlant != undefined
        ? direction(this.pos, closestPlant.pos)
        : { x: 0, y: 0 };
    const newPos = {
      x: this.pos.x + change.x,
      y: this.pos.y + change.y,
    };
    if (!(nearbyGrid[change.x + 1][change.y + 1] instanceof Herbivore)) {
      this.pos = newPos;
    }
    this.energy -= 1;
    this.age += 1;
  }

  interact(entity: IEntity) {
    switch (true) {
      case entity instanceof Plant:
        this.energy += entity.energy;
        entity.alive = false;
        console.log("herbivore eats plant omnomom");
        return;
      case entity instanceof Carnivore:
        entity.energy += this.energy;
        this.alive = false;
        console.log("herbivore gets eaten by carnivore oops");
        return;
      default:
        return;
    }
  }
}
