import { Position, direction, distance } from "./utils"

export interface IEntity {
    pos: Position
    energy: number
    age: number
    alive: boolean

    computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void
    interact(entity: IEntity): void
}

export class Plant implements IEntity {
    START_ENERGY = 20

    pos: Position
    energy: number
    age: number
    alive: boolean

    constructor(pos: Position) {
        this.pos = pos;
        this.alive = true;
        this.energy = this.START_ENERGY;
    }

    computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
        this.age += 1
        return
    }

    interact(entity: IEntity): void {
        return
    }
}

export class Herbivore implements IEntity {
    START_ENERGY = 50

    pos: Position
    energy: number
    age: number
    alive: boolean

    constructor(pos: Position) {
        this.pos = pos;
        this.alive = true;
        this.energy = this.START_ENERGY;
    }

    computeNextMove(entities: IEntity[], nearbyGrid: IEntity[][]): void {
        let closestPlant: Plant | undefined;
        entities.forEach(element => {
            if (!(element instanceof Plant))
                return;
            if (closestPlant === undefined || distance(this.pos, element.pos) < distance(this.pos, closestPlant.pos))
                closestPlant = element;
        });
        const change = (closestPlant != undefined) ? direction(this.pos, closestPlant.pos) : {x: 0, y: 0};
        const newPos = {
            x: this.pos.x + change.x,
            y: this.pos.y + change.y
        }
        if (!(nearbyGrid[change.x + 1][change.y + 1] instanceof Herbivore)) {
            this.pos = newPos
        }
        this.energy -= 1;
        this.age += 1
    }

    interact(entity: IEntity) {
        switch (true) {
            case entity instanceof Plant:
                this.energy += entity.energy
                entity.alive = false
                console.log('herbivore eats plant omnomom')
                return
            case entity instanceof Carnivore:
                entity.energy += this.energy
                this.alive = false
                console.log('herbivore gets eaten by carnivore oops')
                return
            default:
                return
        }
    }
}

export class Carnivore implements IEntity {
    START_ENERGY = 30

    pos: Position
    energy: number
    age: number
    alive: boolean

    constructor(pos: Position) {
        this.pos = pos;
        this.alive = true;
        this.energy = this.START_ENERGY;
    }

    computeNextMove(entities: IEntity[]): void {
        let closestHerbivore: Herbivore | undefined;
        entities.forEach(element => {
            if (!(element instanceof Herbivore))
                return;
            if (closestHerbivore === undefined || distance(this.pos, element.pos) < distance(this.pos, closestHerbivore.pos))
                closestHerbivore = element;
        });
        const change = (closestHerbivore != undefined) ? direction(this.pos, closestHerbivore.pos) : {x: 0, y: 0};
        this.pos = {
            x: this.pos.x + change.x,
            y: this.pos.y + change.y
        }
        this.energy -= 1;
        this.age += 1
    }

    interact(entity: IEntity): void {
        switch (true) {
            case entity instanceof Plant:
                entity.alive = false
                console.log('carnivore stomps down plant oops')
                return
            case entity instanceof Herbivore:
                this.energy += entity.energy
                entity.alive = false
                console.log('carnivore eats herbivore omnomom')
                return
            default:
                return
        }
    }
}