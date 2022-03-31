/**
 * 3D Color
 *
 * @example
 * const a = new NS3D.Color( 1, 1, 1, 0 );
 *
 *
 *
 * ( class Vector3 implements Vector<Vector3> )
 */
export declare class Color {
    constructor(value?: null | Color | number | string, g?: number, b?: number, a?: number);
    elements: number[];
    /**
     * @default 0
     */
    get r(): number;
    set r(value: number);
    get g(): number;
    set g(value: number);
    get b(): number;
    set b(value: number);
    get a(): number;
    set a(value: number);
    readonly isColor: true;
    set(value: Color | string | number): this;
    /**
     * Sets value of Color value by RGBA
     */
    setRGBA(r: number, b: number, g: number, a: number): this;
    setString(value: string): this;
    setHex(hex: number, balpha?: boolean): this;
    getHex(): number;
    addScalar(s: number): this;
    multiply(color: Color): this;
    multiplyScalar(s: number): this;
    /**
     * Sets all values of this color.
     */
    setGray(scalar: number, a?: number): this;
    setComponent(index: number, value: number): this;
    getComponent(index: number): number;
    /**
     * Clones this vector.
     */
    clone(): Color;
    /**
     * Copies value of v to this vector.
     */
    copy(v: Color): this;
    /**
     * Adds v to this vector.
     */
    add(v: Color): this;
    /**
     * Sets this vector to a + b.
     */
    addColors(a: Color, b: Color): this;
    /**
     * Subtracts v from this vector.
     */
    sub(v: Color): this;
    lerp(v: Color, alpha: number): this;
    lerpVectors(v1: Color, v2: Color, alpha: number): this;
    /**
     * Checks for strict equality of this vector and v.
     */
    equals(v: Color): boolean;
    /**
     * Sets this vector's x, y and z value from the provided array.
     * @param array the source array.
     * @param offset (optional) offset into the array. Default is 0.
     */
    fromArray(array: number[], offset?: number): this;
    /**
     * Sets this color RGBA value from the provided array-like.
     * @param array the source array-like.
     * @param offset (optional) offset into the array-like. Default is 0.
     */
    /**
     * Returns an array [r, g, b , a], or copies RGBA into the provided array.
     * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
     * @param offset (optional) optional offset into the array.
     * @return The created or provided array.
     */
    toArray(array?: number[], offset?: number): number[];
    random(): this;
}
//# sourceMappingURL=Color.d.ts.map