import {
  direction,
  distance,
  findAnyEntityOfType,
  findTypeInRadius,
  getRandomEmptySpaceNearPosition,
  Position
} from "../utils";
import {BaseEntity, IEntity} from "./entity";
import {Plant} from "./plant";
import {Carnivore} from "./carnivore";
import {REPRODUCTION_ENERGY, START_ENERGY_MAP} from "../constants";

export class Herbivore extends BaseEntity {
  private target: Plant | undefined;

  constructor(pos: Position) {
    super("Herbivore", pos);
    this.energy = START_ENERGY_MAP["Herbivore"];
  }

  computeNextMove(entities: IEntity[], grid: IEntity[][]): void {
    let energyUsed = 1;
    let closestPlant: Plant | undefined = findTypeInRadius(this.pos, grid, 25, "Plant") as Plant;
    if (closestPlant !== undefined) {
      this.target = closestPlant;
    }
    if (this.target !== undefined && !this.target.alive) {
      this.target = undefined;
    }
    if (this.target === undefined) {
      if (closestPlant === undefined) {
        closestPlant = findAnyEntityOfType(entities, "Plant") as Plant;
      }
      if (closestPlant !== undefined) {
        this.target = closestPlant;
      }
    }
    const change =
      this.target !== undefined
        ? direction(this.pos, this.target.pos)
        : { x: 0, y: 0 };
    if (distance(this.pos, this.target?.pos ?? this.pos) > 2 && this.energy > START_ENERGY_MAP["Herbivore"]) {
      change.x *= 2;
      change.y *= 2;
      energyUsed = 3;
    }
    const newPos = {
      x: this.pos.x + change.x,
      y: this.pos.y + change.y,
    };
    if (!(grid[newPos.x][newPos.y] instanceof Herbivore)) {
      this.pos = newPos;
    }
    this.energy -= energyUsed;
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

  multiply(grid: IEntity[][]): IEntity | undefined {
    if (this.energy < REPRODUCTION_ENERGY[this.type]) return;
    const newPos = getRandomEmptySpaceNearPosition(grid, this.pos, 1);
    if (newPos === undefined) return undefined;
    this.energy = START_ENERGY_MAP[this.type];
    return new Herbivore(newPos);
  }
}
