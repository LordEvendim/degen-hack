import { direction, distance, Position } from "../utils";
import {BaseEntity, EntityTypes, IEntity} from "./entity";
import { Plant } from "./plant";
import { Carnivore } from "./carnivore";

export class Herbivore extends BaseEntity {
  START_ENERGY = 50;

  constructor(pos: Position) {
    super("Herbivore", pos);
    this.energy = this.START_ENERGY;
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
