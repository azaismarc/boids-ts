import Boid from './Boid';
import Vector from './Vector';
import type { Param, Size } from './type';

/**
 * A flock is a collection of boids
 * @class Flock
 * @param {number} n - number of boids in the flock
 * @param {Size} size - size of the canvas
 */
export default class Flock {

    private flock: Boid[] = [];

    constructor(n: number, size: Size) {
        for (let i = 0; i < n; i++) {
            const pos_x = Math.random() * size.width;
            const pos_y = Math.random() * size.height;
            const position = new Vector(pos_x, pos_y);
            const vel_x = -10 + Math.random() * 20;
            const vel_y = -10 + Math.random() * 20;
            const velocity = new Vector(vel_x, vel_y);
            const boid = new Boid(i, position, velocity);
            this.flock.push(boid);
        }
    }

    /**
     * Move all boids in the flock 
     * @param {Size} size - size of the canvas
     * @param {Param} param - parameters for the boids
     */
    move(size: Size, param: Param) {
        for (const boid of this.flock) {
            boid.move(this.flock, size, param);
        }
    }

    /**
     * Draw all boids in the flock
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    draw(ctx: CanvasRenderingContext2D) {
        for (const boid of this.flock) {
            boid.draw(ctx);
        }
    }
}