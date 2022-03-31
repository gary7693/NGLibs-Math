import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { Vector3 } from './Vector3';
export declare class Euler {
    private _x;
    private _y;
    private _z;
    private _order;
    constructor(x?: number, y?: number, z?: number, order?: string);
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
     * @default THREE.Euler.DefaultOrder
     */
    get order(): string;
    set order(value: string);
    readonly isEuler: true;
    _onChangeCallback: Function;
    set(x: number, y: number, z: number, order?: string): Euler;
    clone(): Euler;
    copy(euler: Euler): this;
    setFromRotationMatrix(m: Matrix4, order?: string, update?: boolean): Euler;
    setFromQuaternion(q: Quaternion, order?: string, update?: boolean): Euler;
    setFromVector3(v: Vector3, order?: string): Euler;
    reorder(newOrder: string): Euler;
    equals(euler: Euler): boolean;
    fromArray(array?: any[]): Euler;
    toArray(array?: any[], offset?: number): any[];
    toVector3(optionalResult?: Vector3): Vector3;
    _onChange(callback: Function): this;
    static RotationOrders: string[];
    static DefaultOrder: string;
}
//# sourceMappingURL=Euler.d.ts.map