import { Simulation } from "./simulation";
import fs from "fs";
import {
  ENTITY_SIZE,
  FRAME_DELAY,
  IMAGE_HEIGHT,
  IMAGE_WIDTH,
} from "./constants";
import { make } from "pureimage";
import GifEncoder from "gif-encoder";

const entityTypeToColor = {
  Plant: "green",
  Herbivore: "blue",
  Carnivore: "red",
};

let gif = new GifEncoder(IMAGE_WIDTH, IMAGE_HEIGHT, {
  highWaterMark: 100 * 1024 * 1024, // 100MB
});
let file = fs.createWriteStream("./out/gif/simulation.gif");

gif.pipe(file);
gif.setDelay(FRAME_DELAY);
gif.writeHeader();

export async function renderSimulationStep(
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
  gif.addFrame(ctx.getImageData(0, 0, IMAGE_WIDTH, IMAGE_HEIGHT).data);
  console.log(`Added step ${step} to GIF`);
}

export function finishGIF(): void {
  gif.finish();
  console.log("GIF creation completed.");
}
