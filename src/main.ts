import './style.css'

import { Param } from './boids/type';
import Flock from './boids/Flock';

const param: Param = {
  cohesion: 0.015,
  separation: 6,
  alignment: 0.66,
  speed: 10,
};

const background_color = 'black';

const height = 600;
const width = innerWidth > 1300 ? 1300 : innerWidth - 20;

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.height = height;
canvas.width = width;

const ctx = canvas.getContext('2d');
if (ctx == null) throw new Error('Cannot get context');

const flock = new Flock(100, {width, height});

const draw = () => {
    ctx.fillStyle = background_color;
    ctx.fillRect(0, 0, width, height);
    flock.draw(ctx);
};

const update = () => {
    draw();
    flock.move({width, height}, param)
    requestAnimationFrame(update);
}

update();

const cohesion_slider = document.getElementById('cohesion') as HTMLInputElement;
cohesion_slider.min = '0';
cohesion_slider.max = '0.1';
cohesion_slider.step = '0.001';
cohesion_slider.value = param.cohesion.toString();


cohesion_slider.oninput = () => {
    param.cohesion = Number(cohesion_slider.value);
}

const separation_slider = document.getElementById('separation') as HTMLInputElement;
separation_slider.min = '0';
separation_slider.max = '40';
separation_slider.step = '1';
separation_slider.value = param.separation.toString();

separation_slider.oninput = () => {
    param.separation = Number(separation_slider.value);
}

const alignment_slider = document.getElementById('alignment') as HTMLInputElement;
alignment_slider.min = '0';
alignment_slider.max = '1';
alignment_slider.step = '0.01';
alignment_slider.value = param.alignment.toString();

alignment_slider.oninput = () => {
    param.alignment = Number(alignment_slider.value);
}

const speed_slider = document.getElementById('speed') as HTMLInputElement;
speed_slider.min = '0';
speed_slider.max = '20';
speed_slider.step = '1';
speed_slider.value = param.speed.toString();

speed_slider.oninput = () => {
    param.speed = Number(speed_slider.value);
}

// every 1000ms, console.log the current value of the slider
setInterval(() => {
    console.log(param);
}, 1000);