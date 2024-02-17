import { direction, distance, Position } from "../utils";
import {BaseEntity, EntityTypes, IEntity} from "./entity";
import { Herbivore } from "./herbivore";
import { Plant } from "./plant";

export class Carnivore extends BaseEntity {
  START_ENERGY = 60;

  constructor(pos: Position) {
    super("Carnivore", pos);
    this.energy = this.START_ENERGY;
  }

  computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
    let closestHerbivore: Herbivore | undefined;
    entities.forEach((element) => {
      if (!(element instanceof Herbivore)) return;
      if (
        closestHerbivore === undefined ||
        distance(this.pos, element.pos) <
          distance(this.pos, closestHerbivore.pos)
      )
        closestHerbivore = element;
    });
    const change =
      closestHerbivore != undefined
        ? direction(this.pos, closestHerbivore.pos)
        : { x: 0, y: 0 };
    const newPos = {
      x: this.pos.x + change.x,
      y: this.pos.y + change.y,
    };
    if (!(nearbyGrid[change.x + 1][change.y + 1] instanceof Carnivore)) {
      this.pos = newPos;
    }
    this.energy -= 1;
    this.age += 1;
  }

  interact(entity: IEntity): void {
    switch (true) {
      case entity instanceof Plant:
        entity.alive = false;
        console.log("carnivore stomps down plant oops");
        return;
      case entity instanceof Herbivore:
        this.energy += entity.energy;
        entity.alive = false;
        console.log("carnivore eats herbivore omnomom");
        return;
      default:
        return;
    }
  }
}
