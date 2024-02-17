import {IEntity} from "./entities/entity";
import {Plant} from "./entities/plant";
import {Herbivore} from "./entities/herbivore";
import {Carnivore} from "./entities/carnivore";

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

export function getRandomEmptySpaceNearPosition(grid: (IEntity | undefined)[][], pos: Position, radius: number): Position | undefined {
    let emptySpaces: Position[] = [];
    for (let i = pos.x - radius; i <= pos.x + radius; i++) {
        for (let j = pos.y - radius; j <= pos.y + radius; j++) {
            if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) {
                continue;
            }
            if (grid[i][j] === undefined) {
                emptySpaces.push({ x: i, y: j });
            }
        }
    }
    if (emptySpaces.length === 0) {
        return undefined;
    }
    return emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
}

export function findTypeInRadius(pos: Position, grid: IEntity[][], radius: number, type: string): IEntity | undefined {
    let closest: IEntity | undefined;
    function isValidPosition(x: number, y: number) {
        return x >= 0 && x < grid.length && y >= 0 && y < grid[0].length;
    }

    for (let r = 1; r <= radius; r++) {
        [r, -r].forEach(i => {
            const x = pos.x + i;
            for (let j = -r; j <= r; j++) {
                let y = pos.y + j;
                if (!isValidPosition(x, y))
                    continue;
                const entity = grid[x][y];
                if (entity === undefined) continue;
                if (entity.type === type) {
                    closest = entity;
                    break;
                }
            }
        });
        if (closest !== undefined) break;
        [r, -r].forEach(j => {
            const y = pos.y + j;
            for (let i = -r; i <= r; i++) {
                let x = pos.x + i;
                if (!isValidPosition(x, y))
                    continue;
                const entity = grid[x][y];
                if (entity === undefined) continue;
                if (entity.type === type) {
                    closest = entity;
                    break;
                }
            }
        });
        if (closest !== undefined) break;
    }
    return closest;
}

export function findAnyEntityOfType(entities: IEntity[], type: string): IEntity | undefined {
    const startIndex = Math.floor(Math.random() * entities.length);
    const tries = 10;
    for (let i = startIndex; i < Math.min(entities.length, startIndex + tries); i++) {
        if (entities[i].type === type) {
            return entities[i];
        }
    }
    return undefined;
}