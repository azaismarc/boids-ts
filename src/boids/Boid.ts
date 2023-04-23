import Vector from "./Vector";
import type { Param, Size } from "./type";

/**
 * A boid is a single entity in the flock
 * @class Boid
 * @param {number} id - unique id of the boid
 * @param {Vector} position - position of the boid
 * @param {Vector} velocity - velocity of the boid
 */
export default class Boid {

    private static color = 'blue';
    
    constructor(readonly id: number, private position: Vector, private velocity: Vector) {
      
    }

    /**
     * Move the boid
     * @param {Boid[]} flock - array of boids in the flock
     * @param {Size} size - size of the canvas
     * @param {Param} param - parameters of the simulation
     */
    move(flock: Boid[], size: Size, param: Param) {
        const v1 = this.cohesion(flock, param.cohesion);
        const v2 = this.separation(flock, param.separation);
        const v3 = this.alignment(flock, param.alignment);
        this.velocity = this.velocity.add(v1).add(v2).add(v3);
        this.limit_velocity(param.speed);
        this.position = this.position.add(this.velocity);
        this.limit_position(size);
    }

    /**
     * Apply cohesion rule to the boid
     * @param {Boid[]} flock - array of boids in the flock
     * @param {number} cohesion - cohesion parameter
     * @returns {Vector} - cohesion vector
     */
    private cohesion(flock: Boid[], cohesion: number): Vector {
        let v = Vector.vector_null();
        if (cohesion === 0) return v;
        for (const boid of flock) {
            if (boid.id === this.id) continue;
            v = v.add(boid.position);
        }
        v = v.div(flock.length - 1);
        return v.substr(this.position).mult(cohesion);
    }

    /**
     * Apply separation rule to the boid
     * @param {Boid[]} flock - array of boids in the flock
     * @param {number} separation - separation parameter
     * @returns {Vector} - separation vector
     */
    private separation(flock: Boid[], separation: number): Vector {
        let v = Vector.vector_null();
        if (separation === 0) return v;
        for (const boid of flock) {
            if (boid.id === this.id) continue;
            if (this.position.dist(boid.position) > separation) continue;
            v = v.add(this.position.substr(boid.position));
        }
        return v;
    }

    /**
     * Apply alignment rule to the boid
     * @param {Boid[]} flock - array of boids in the flock
     * @param {number} alignment - alignment parameter
     * @returns {Vector} - alignment vector
     */
    private alignment(flock: Boid[], alignment: number): Vector {
        let v = Vector.vector_null();
        if (alignment === 0) return v;
        for (const boid of flock) {
            if (boid.id === this.id) continue;
            v = v.add(boid.velocity);
        }
        v = v.div(flock.length - 1);
        return v.substr(this.velocity).mult(alignment);
    }

    /**
     * Apply speed limit to the boid
     * @param {number} speed - speed limit
     */
    private limit_velocity(speed: number): void {

        if (speed === 0) {
            this.velocity = Vector.vector_null();
            return;
        }

        const mag = this.velocity.mag();
        if (mag < speed) return;
        this.velocity = this.velocity.div(mag).mult(speed);
    }

    /**
     * Apply position limit to the boid
     * @param {Size} size - size of the canvas
     */
    private limit_position(size: Size): void {
        const margin = 100;
        const turn = 1;
        let vx = this.velocity.x;
        let vy = this.velocity.y;
        if (this.position.x < margin) vx += turn;
        if (this.position.x > size.width - margin) vx -= turn;
        if (this.position.y < margin) vy += turn;
        if (this.position.y > size.height - margin) vy -= turn;
        
        this.velocity = new Vector(vx, vy)
    }

    /**
     * Draw the boid
     * @param {CanvasRenderingContext2D} ctx - canvas context
     */
    draw(ctx: CanvasRenderingContext2D): void {
        // Rotate the canvas to the direction of the boid
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.velocity.angle());
        ctx.translate(-this.position.x, -this.position.y);

        // Draw the boid
        ctx.fillStyle = Boid.color;
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x - 15, this.position.y + 5);
        ctx.lineTo(this.position.x - 15, this.position.y - 5);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.closePath();
        ctx.fill();

        // Restore the canvas
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(-this.velocity.angle());
        ctx.translate(-this.position.x, -this.position.y);
    }
}