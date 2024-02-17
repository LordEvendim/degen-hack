import {Carnivore, Herbivore, IEntity, Plant} from "./entity"

export interface Rectangle {
    minX: number
    maxX: number
    minY: number
    maxY: number
}

export interface Position {
    x: number
    y: number
}

export function distance(pos1: Position, pos2: Position): number {
    return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}

export function direction(from: Position, to: Position): {x: number, y: number} {
    let dir = {
        x: 0,
        y: 0
    }
    if (Math.abs(to.x - from.x) > Math.abs(to.y - from.y)) {
        dir.x = Math.abs(to.x - from.x) === 0 ? 0 : (to.x - from.x) / Math.abs(to.x - from.x)
    } else {
        dir.y = Math.abs(to.y - from.y) === 0 ? 0 : (to.y - from.y) / Math.abs(to.y - from.y)
    }
    return dir
}

export function findEntitiesAtPosition(entities: IEntity[], pos: Position) {
    let list: IEntity[] = []
    entities.forEach(entity => {
        if (entity.pos.x === pos.x && entity.pos.y === pos.y)
            list.push(entity);
    });
    return list;
}

export function getRandomPosition(bounds: Rectangle): Position {
    const x = Math.floor(Math.random() * (bounds.maxX - bounds.minX) + bounds.minX);
    const y = Math.floor(Math.random() * (bounds.maxY - bounds.minY) + bounds.minY);
    return { x, y };
}

export function getUniquePosition(bounds: Rectangle, grid: (IEntity | undefined)[][]): Position {
    let pos: Position;
    do {
        pos = getRandomPosition(bounds);
    } while (grid[pos.x][pos.y] !== undefined);
    return pos;
}

export function generateRandomEntities(bounds: Rectangle, plantsCount: number, herbivoreCount: number, carnivoreCount: number): IEntity[] {
    let entities: IEntity[] = [];
    let positionsSet = new Set(); // Set to store unique positions

    function addEntity(entityType: any, bounds: Rectangle) {
        let attempts = 0;
        const maxAttempts = 10000; // Prevent infinite loops
        while (attempts < maxAttempts) {
            const randPos = getRandomPosition(bounds);
            const posKey = `${randPos.x},${randPos.y}`; // Hash the position
            if (!positionsSet.has(posKey)) {
                positionsSet.add(posKey);
                entities.push(new entityType(randPos));
                break;
            }
            attempts++;
        }
    }

    for (let i = 0; i < plantsCount; i++) {
        addEntity(Plant, bounds);
    }
    for (let i = 0; i < herbivoreCount; i++) {
        addEntity(Herbivore, bounds);
    }
    for (let i = 0; i < carnivoreCount; i++) {
        addEntity(Carnivore, bounds);
    }

    // Randomize the order of the output array
    for (let i = entities.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [entities[i], entities[j]] = [entities[j], entities[i]]; // Swap elements
    }

    return entities;
}
