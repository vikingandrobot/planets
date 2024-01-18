import { Size } from "@simulation/model";
import { Planet, makePlanet } from "@simulation/model/planet";
import { draw as drawPlanet } from "@ui/planet";
import { draw as drawStars } from "@ui/star";
import { Camera, Renderer } from "@ui/renderer";
import { Star, makeStar } from "@simulation/model/star";

const DELTA_T = 0.04; // 1/25 second

let canvasNewSize: Size | null = null;

const canvas: HTMLCanvasElement = document.getElementById(
  "canvas"
) as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D = canvas.getContext(
  "2d"
) as CanvasRenderingContext2D;

const camera: Camera = new Camera([0, 0, 0], [20, 10], 600, canvas);

const renderer = new Renderer(camera);

const planetMoonDistance = 40000;
let rotationAngle = 0;

const planet = makePlanet([0, 0, 80000], 15000);
const moon = makePlanet([0, 0, 40000 + planetMoonDistance], 5000, "#a35288");
const spatialObjects: Planet[] = [
  makePlanet([-100000, 30000, 100000], 15000, "#445c32"),
  makePlanet([-100000, 30000, 200000], 15000, "#445c32"),
  makePlanet([-100000, 30000, 300000], 15000, "#445c32"),
  makePlanet([-100000, 30000, 350000], 15000, "#445c32"),
  makePlanet([-100000, -30000, 100000], 15000, "#445c32"),
  makePlanet([-100000, -30000, 200000], 15000, "#445c32"),
  makePlanet([-100000, -30000, 300000], 15000, "#445c32"),
  makePlanet([-100000, -30000, 350000], 15000, "#445c32"),
  makePlanet([100000, -30000, 100000], 15000, "#445c32"),
  makePlanet([100000, -30000, 200000], 15000, "#445c32"),
  makePlanet([100000, -30000, 300000], 15000, "#445c32"),
  makePlanet([100000, -30000, 350000], 15000, "#445c32"),
  makePlanet([100000, 30000, 100000], 15000, "#445c32"),
  makePlanet([100000, 30000, 200000], 15000, "#445c32"),
  makePlanet([100000, 30000, 300000], 15000, "#445c32"),
  makePlanet([100000, 30000, 700000], 15000, "#445c32"),
];

const stars: Star[] = [];

for (let i = 0; i < 1000; ++i) {
  stars.push(
    makeStar([
      Math.ceil(Math.random() * 1599900000000) - 700000000000,
      Math.ceil(Math.random() * 609990000000) - 320000000000,
      Math.ceil(Math.random() * 50) + 899900000000,
    ])
  );
}

function render() {
  if (canvasNewSize) {
    camera.setViewportWidth(canvasNewSize[0]);
    canvasNewSize = null;
  }

  // camera.centerCamera([
  //   planet.pos[0],
  //   planet.pos[1],
  //   planet.pos[2] - planet.radius - 100000,
  // ]);

  ctx.clearRect(0, 0, camera.viewportSize[0], camera.viewportSize[1]);

  drawStars(ctx, renderer, stars);

  const objects = [moon, planet, ...spatialObjects];
  const sortedObject = objects.sort((a, b) => b.pos[2] - a.pos[2]);

  for (let i = 0; i < sortedObject.length; ++i) {
    drawPlanet(ctx, renderer, sortedObject[i]);
  }
}

render();

setInterval(() => {
  planet.pos[2] += 10000;

  if (planet.pos[2] > 4000000) {
    planet.pos[2] = 0;
  }

  rotationAngle += ((2 * Math.PI) / 180) % (2 * Math.PI);

  const z = Math.sin(rotationAngle) * planetMoonDistance + planet.pos[2];
  const x = Math.cos(rotationAngle) * planetMoonDistance + planet.pos[0];

  moon.pos = [x, moon.pos[1], z];

  render();
}, 25);

window.addEventListener("resize", requestCanvasResize, false);

function requestCanvasResize() {
  canvasNewSize = [window.innerWidth, window.innerHeight];
  render();
}
requestCanvasResize();

document.addEventListener("keydown", (event) => {
  if (event.isComposing || event.keyCode === 229) {
    return;
  }

  if (event.code === "ArrowRight") {
    camera.zRotation += Math.PI / 64;
  }

  if (event.code === "ArrowLeft") {
    camera.zRotation -= Math.PI / 64;
  }

  if (event.code === "ArrowUp") {
    camera.pos[2] += 2000;
  }

  if (event.code === "ArrowDown") {
    camera.pos[2] -= 2000;
  }
  // do something

  console.log(event.code);
});
