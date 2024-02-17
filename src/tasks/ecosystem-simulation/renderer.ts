import {Simulation} from "./simulation";
import * as PImage from "pureimage";
import fs from "fs";
import {Plant} from "./entity";

export default function renderSimulationStep(simulation: Simulation): void {

    const img = PImage.make(1920, 1080);
    const ctx = img.getContext("2d");

    simulation.entities.forEach(entity => {
        ctx.fillStyle = entity instanceof Plant ? "green" : "blue";
        ctx.fillRect(entity.pos.x * 10, entity.pos.y * 10, 10, 10);
    });

    PImage.encodePNGToStream(img, fs.createWriteStream(`./out/step${simulation.step}.png`))
        .then(() => {
            console.log(`rendered step${simulation.step}.png`);
        })
        .catch((e) => {
            console.log(`there was an error writing ${e}`);
        });
}