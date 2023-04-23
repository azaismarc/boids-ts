/**
 * Represents a vector in 2D space
 * @class Vector
 * @param {number} x - x coordinate
 * @param {number} y - y coordinate
 */
export default class Vector {

    constructor(readonly x: number, readonly y: number) {
       
    }

    /**
     * Returns a vector with x and y set to 0
     **/
    static vector_null(): Vector {
        return new Vector(0, 0);
    }

    /**
     * Adds two vectors
     * @param {Vector} v - vector to add
     * @returns {Vector} - the sum of the two vectors
     */
    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    /**
     * Subtracts two vectors
     * @param {Vector} v - vector to subtract
     * @returns {Vector} - the difference of the two vectors
     */
    substr(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    /**
     * Divides a vector by a scalar
     * @param {number} n - scalar to divide by
     * @returns {Vector} - the result of the division
     * @throws {Error} - if n is 0
     */
    div(n: number): Vector {
        if (n === 0) throw new Error("Cannot divide by 0");
        return new Vector(this.x / n, this.y / n);
    }

    /**
     * Multiplies a vector by a scalar
     * @param {number} n - scalar to multiply by
     * @returns {Vector} - the result of the multiplication
     */
    mult(n: number): Vector {
        return new Vector(this.x * n, this.y * n);
    }

    /**
     * Returns the magnitude of the vector
     * @returns {number} - the magnitude of the vector
     */
    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * Returns euclidean distance between two vectors
     * @param {Vector} v - vector to calculate distance to
     * @returns {number} - the distance between the two vectors
     */
    dist(v: Vector): number {
        return this.substr(v).mag();
    }

    /**
     * Returns the angle of the vector
     * @returns {number} - the angle of the vector
     */
    angle(): number {
        return Math.atan2(this.y, this.x);
    }
}