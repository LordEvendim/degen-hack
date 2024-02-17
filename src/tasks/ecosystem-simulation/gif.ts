import fs from "fs";
import GifEncoder from "gif-encoder";
import png from "png-js";
import { FRAME_DELAY } from "./constants";

const decodePNG = async (path: string): Promise<number[]> => {
  return await new Promise((resolve) => {
    png.decode(path, (pixels: any) => resolve(pixels));
  });
};

export const generateGif = async (
  path: string,
  imageBaseName: string,
  extension: string,
  count: number
) => {
  if (extension !== ".png") throw new Error("File extension not supported");

  let gif = new GifEncoder(1920, 1080, {
    highWaterMark: 5 * 1024 * 1024, // 5MB
  });
  let file = fs.createWriteStream("./out/gif/simulation.gif");

  gif.pipe(file);
  gif.setDelay(FRAME_DELAY);
  gif.writeHeader();

  for (let i = 1; i <= count; i++) {
    let image = await decodePNG(`${path}${imageBaseName}${i}${extension}`);

    console.log("Decoded image: " + `${path}${imageBaseName}${i}${extension}`);

    gif.addFrame(image);
  }

  gif.finish();
};
