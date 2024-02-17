import { Simulation } from "./simulation";
import * as PImage from "pureimage";
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
  const img = PImage.make(IMAGE_WIDTH, IMAGE_HEIGHT);
  const ctx = img.getContext("2d");
  const step = simulation.step;

  simulation.entities.forEach((entity) => {
    ctx.fillStyle = entityTypeToColor[entity.constructor.name];
    ctx.fillRect(
      entity.pos.x * ENTITY_SIZE,
      entity.pos.y * ENTITY_SIZE,
      ENTITY_SIZE,
      ENTITY_SIZE
    );
  });

  try {
    await PImage.encodePNGToStream(
      img,
      fs.createWriteStream(`./out/step${step}.png`)
    );
    console.log(`rendered step${step}.png`);
  } catch (error) {
    console.log(`there was an error writing ${error}`);
  }
}

const ffmpeg = require("fluent-ffmpeg");

export function createVideoFromImages(fps) {
  ffmpeg()
    .addInput(`./out/%d.png`)
    .on("end", () => {
      console.log("Video created successfully!");
    })
    .on("error", (err) => {
      console.error("Error:", err);
    })
    .inputFPS(fps)
    .output("./animation.mp4")
    .run();
}
