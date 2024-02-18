export const IMAGE_WIDTH = 1920;
export const IMAGE_HEIGHT = 1080;
export const SIMULATION_STEPS = parseInt(process.argv[2] ?? "1000");
export const ENTITY_SIZE = parseInt(process.argv[3] ?? "20");
export const FRAME_DELAY = parseInt(process.argv[4] ?? "200");

export const START_POPULATION = {
  Plant: 30,
  Herbivore: 20,
  Carnivore: 10,
};

export const START_ENERGY_MAP = {
  Plant: 20,
  Herbivore: 100,
  Carnivore: 100,
};

export const REPRODUCTION_ENERGY = {
  Plant: parseInt(process.argv[5] ?? "50"),
  Herbivore: 140,
  Carnivore: 150,
};
