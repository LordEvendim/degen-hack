import {
  direction,
  distance,
  findAnyEntityOfType,
  findTypeInRadius,
  getRandomEmptySpaceNearPosition,
  Position
} from "../utils";
import {BaseEntity, IEntity} from "./entity";
import {Herbivore} from "./herbivore";
import {Plant} from "./plant";
import {REPRODUCTION_ENERGY, START_ENERGY_MAP} from "../constants";

export class Carnivore extends BaseEntity {
  private target: Herbivore | undefined;

  constructor(pos: Position) {
    super("Carnivore", pos);
    this.energy = START_ENERGY_MAP["Carnivore"];
  }

  computeNextMove(entities: IEntity[], grid: IEntity[][]): void {
    let closestHerbivore: Herbivore | undefined = findTypeInRadius(this.pos, grid, 25, "Herbivore") as Herbivore;
    if (closestHerbivore !== undefined) {
      this.target = closestHerbivore;
    }
    if (this.target !== undefined && !this.target.alive) {
      this.target = undefined;
    }
    if (this.target === undefined) {
      if (closestHerbivore === undefined) {
        closestHerbivore = findAnyEntityOfType(entities, "Herbivore") as Herbivore;
      }
      if (closestHerbivore !== undefined) {
        this.target = closestHerbivore;
      }
    }
    const change =
      this.target !== undefined
        ? direction(this.pos, this.target.pos)
        : { x: 0, y: 0 };
    const newPos = {
      x: this.pos.x + change.x,
      y: this.pos.y + change.y,
    };
    if (!(grid[newPos.x][newPos.y] instanceof Carnivore)) {
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

  multiply(grid: IEntity[][]): IEntity | undefined {
    if (this.energy < REPRODUCTION_ENERGY["Carnivore"]) return;
    const newPos = getRandomEmptySpaceNearPosition(grid, this.pos, 1);
    if (newPos === undefined) return undefined;
    this.energy = START_ENERGY_MAP["Carnivore"];
    return new Carnivore(newPos);
  }
}
