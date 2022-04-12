import { Euler } from './Euler';
import { Matrix3 } from './Matrix';
import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { Vector } from './Vector';
declare type Vector3Tuple = [number, number, number];
/**
 * 3D vector.
 *
 * @example
 * const a = new Vector3( 1, 0, 0 );
 * const b = new Vector3( 0, 1, 0 );
 * const c = new Vector3();
 * c.crossVectors( a, b );
 *
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js|src/math/Vector3.js}
 *
 * ( class Vector3 implements Vector<Vector3> )
 */
export declare class Vector3 implements Vector {
    constructor(x?: number, y?: number, z?: number);
    elements: number[];
    /**
     * @default 0
     */
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get z(): number;
    set z(value: number);
    /**
     * @default 0
     */
    /**
     * @default 0
     */
    /**
     * @default 0
     */
    readonly isVector3: true;
    /**
     * Sets value of this vector.
     */
    set(x: number, y: number, z: number): this;
    /**
     * Sets all values of this vector.
     */
    setScalar(scalar: number): this;
    /**
     * Sets x value of this vector.
     */
    setX(x: number): Vector3;
    /**
     * Sets y value of this vector.
     */
    setY(y: number): Vector3;
    /**
     * Sets z value of this vector.
     */
    setZ(z: number): Vector3;
    setComponent(index: number, value: number): this;
    getComponent(index: number): number;
    /**
     * Clones this vector.
     */
    clone(): Vector3;
    /**
     * Copies value of v to this vector.
     */
    copy(v: Vector3): this;
    /**
     * Adds v to this vector.
     */
    add(v: Vector3): this;
    addScalar(s: number): this;
    addScaledVector(v: Vector3, s: number): this;
    /**
     * Sets this vector to a + b.
     */
    addVectors(a: Vector3, b: Vector3): this;
    /**
     * Subtracts v from this vector.
     */
    sub(v: Vector3): this;
    subScalar(s: number): this;
    /**
     * Sets this vector to a - b.
     */
    subVectors(a: Vector3, b: Vector3): this;
    multiply(v: Vector3): this;
    /**
     * Multiplies this vector by scalar s.
     */
    multiplyScalar(scalar: number): this;
    multiplyVectors(a: Vector3, b: Vector3): this;
    applyEuler(euler: Euler): this;
    applyAxisAngle(axis: Vector3, angle: number): this;
    applyMatrix3(m: Matrix3): this;
    applyNormalMatrix(m: Matrix3): this;
    applyMatrix4(m: Matrix4): this;
    applyQuaternion(q: Quaternion): this;
    transformDirection(m: Matrix4): this;
    divide(v: Vector3): this;
    /**
     * Divides this vector by scalar s.
     * Set vector to ( 0, 0, 0 ) if s == 0.
     */
    divideScalar(scalar: number): this;
    min(v: Vector3): this;
    max(v: Vector3): this;
    clamp(min: Vector3, max: Vector3): this;
    clampScalar(minVal: number, maxVal: number): this;
    clampLength(min: number, max: number): this;
    floor(): this;
    ceil(): this;
    round(): this;
    roundToZero(): this;
    /**
     * Inverts this vector.
     */
    negate(): this;
    /**
     * Computes dot product of this vector and v.
     */
    dot(v: Vector3): number;
    /**
     * Computes squared length of this vector.
     */
    lengthSq(): number;
    /**
     * Computes length of this vector.
     */
    length(): number;
    /**
     * Computes Manhattan length of this vector.
     * http://en.wikipedia.org/wiki/Taxicab_geometry
     *
     * @deprecated Use {@link Vector3#manhattanLength .manhattanLength()} instead.
     */
    /**
     * Computes the Manhattan length of this vector.
     *
     * @return {number}
     *
     * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
     */
    manhattanLength(): number;
    /**
     * Computes the Manhattan length (distance) from this vector to the given vector v
     *
     * @param {Vector3} v
     *
     * @return {number}
     *
     * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
     */
    manhattanDistanceTo(v: Vector3): number;
    /**
     * Normalizes this vector.
     */
    normalize(): this;
    /**
     * Normalizes this vector and multiplies it by l.
     */
    setLength(l: number): this;
    lerp(v: Vector3, alpha: number): this;
    lerpVectors(v1: Vector3, v2: Vector3, alpha: number): this;
    /**
     * Sets this vector to cross product of itself and v.
     */
    cross(a: Vector3): this;
    /**
     * Sets this vector to cross product of a and b.
     */
    crossVectors(a: Vector3, b: Vector3): this;
    projectOnVector(v: Vector3): this;
    projectOnPlane(planeNormal: Vector3): this;
    reflect(normal: Vector3): this;
    /**
     * Computes distance of this vector to v.
     */
    distanceTo(v: Vector3): number;
    /**
     * Computes squared distance of this vector to v.
     */
    distanceToSquared(v: Vector3): number;
    /**
     * @deprecated Use {@link Vector3#manhattanDistanceTo .manhattanDistanceTo()} instead.
     */
    setFromSphericalCoords(radius: number, phi: number, theta: number): this;
    setFromCylindricalCoords(radius: number, theta: number, y: number): this;
    setFromMatrixPosition(m: Matrix4): this;
    setFromMatrixScale(m: Matrix4): this;
    setFromMatrixColumn(matrix: Matrix4, index: number): this;
    setFromMatrix3Column(matrix: Matrix3, index: number): this;
    /**
     * Checks for strict equality of this vector and v.
     */
    equals(v: Vector3): boolean;
    /**
     * Sets this vector's x, y and z value from the provided array.
     * @param array the source array.
     * @param offset (optional) offset into the array. Default is 0.
     */
    fromArray(array: number[], offset?: number): this;
    /**
     * Sets this vector's x, y and z value from the provided array-like.
     * @param array the source array-like.
     * @param offset (optional) offset into the array-like. Default is 0.
     */
    /**
     * Returns an array [x, y, z], or copies x, y and z into the provided array.
     * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
     * @param offset (optional) optional offset into the array.
     * @return The created or provided array.
     */
    toArray(array?: number[], offset?: number): number[];
    toArrayVectot3(array: Vector3Tuple): Vector3Tuple;
    /**
     * Copies x, y and z into the provided array-like.
     * @param array array-like to store the vector to.
     * @param offset (optional) optional offset into the array-like.
     * @return The provided array-like.
     */
    /**
     * Sets this vector's x, y and z from Math.random
     */
    random(): this;
    static sumList(list: Vector3[]): Vector3;
    static averageList(list: Vector3[]): Vector3;
}
export {};
