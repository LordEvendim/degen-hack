import { Simulation } from "./simulation";
import { make, encodePNGToStream } from "pureimage";
import fs from "fs";
import { ENTITY_SIZE, IMAGE_HEIGHT, IMAGE_WIDTH } from "./constants";

const entityTypeToColor = {
  Plant: "green",
  Herbivore: "blue",
  Carnivore: "red",
};

export default async function renderSimulationStep(
  simulation: Simulation
): Promise<void> {
  const img = make(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx = img.getContext("2d");
  const step = simulation.step;

  simulation.entities.forEach((entity) => {
    ctx.fillStyle = entityTypeToColor[entity.type];
    ctx.fillRect(
      entity.pos.x * ENTITY_SIZE,
      entity.pos.y * ENTITY_SIZE,
      ENTITY_SIZE,
      ENTITY_SIZE
    );
  });

  try {
    await encodePNGToStream(img, fs.createWriteStream(`./out/step${step}.png`));
    console.log(`rendered step${step}.png`);
  } catch (error) {
    console.log(`there was an error writing ${error}`);
  }
}
