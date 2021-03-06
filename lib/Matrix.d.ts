import { Matrix4 } from './Matrix4';
import { Vector3 } from './Vector3';
/**
 * ( interface Matrix<T> )
 */
export interface Matrix {
    /**
     * Array with matrix values.
     */
    elements: number[];
    /**
     * identity():T;
     */
    identity(): Matrix;
    /**
     * copy(m:T):T;
     */
    copy(m: this): this;
    /**
     * multiplyScalar(s:number):T;
     */
    multiplyScalar(s: number): Matrix;
    determinant(): number;
    /**
     * transpose():T;
     */
    transpose(): Matrix;
    /**
     * invert():T;
     */
    invert(): Matrix;
    /**
     * clone():T;
     */
    clone(): Matrix;
}
/**
 * ( class Matrix3 implements Matrix<Matrix3> )
 */
export declare class Matrix3 implements Matrix {
    /**
     * Creates an identity matrix.
     */
    constructor();
    /**
     * Array with matrix values.
     * @default [1, 0, 0, 0, 1, 0, 0, 0, 1]
     */
    elements: number[];
    set(n11: number, n12: number, n13: number, n21: number, n22: number, n23: number, n31: number, n32: number, n33: number): Matrix3;
    identity(): Matrix3;
    clone(): Matrix3;
    copy(m: Matrix3): this;
    extractBasis(xAxis: Vector3, yAxis: Vector3, zAxis: Vector3): Matrix3;
    setFromMatrix4(m: Matrix4): Matrix3;
    multiplyScalar(s: number): this;
    determinant(): number;
    /**
     * Inverts this matrix in place.
     */
    invert(): Matrix3;
    /**
     * Transposes this matrix in place.
     */
    transpose(): Matrix3;
    getNormalMatrix(matrix4: Matrix4): Matrix3;
    /**
     * Transposes this matrix into the supplied array r, and returns itself.
     */
    transposeIntoArray(r: number[]): Matrix3;
    setUvTransform(tx: number, ty: number, sx: number, sy: number, rotation: number, cx: number, cy: number): Matrix3;
    scale(sx: number, sy: number): Matrix3;
    rotate(theta: number): Matrix3;
    translate(tx: number, ty: number): Matrix3;
    equals(matrix: Matrix3): boolean;
    /**
     * Sets the values of this matrix from the provided array.
     * @param array the source array.
     * @param offset (optional) offset into the array. Default is 0.
     */
    fromArray(array?: number[], offset?: number): Matrix3;
    /**
     * Sets the values of this matrix from the provided array-like.
     * @param array the source array-like.
     * @param offset (optional) offset into the array-like. Default is 0.
     */
    /**
     * Returns an array with the values of this matrix, or copies them into the provided array.
     * @param array (optional) array to store the matrix to. If this is not provided, a new array will be created.
     * @param offset (optional) optional offset into the array.
     * @return The created or provided array.
     */
    toArray(array?: number[], offset?: number): number[];
    /**
     * Copies he values of this matrix into the provided array-like.
     * @param array array-like to store the matrix to.
     * @param offset (optional) optional offset into the array-like.
     * @return The provided array-like.
     */
    /**
     * Multiplies this matrix by m.
     */
    multiply(m: Matrix3): Matrix3;
    premultiply(m: Matrix3): Matrix3;
    /**
     * Sets this matrix to a x b.
     */
    multiplyMatrices(a: Matrix3, b: Matrix3): Matrix3;
}
