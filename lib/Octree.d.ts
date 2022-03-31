import { Vector3 } from "./Vector3";
export interface OctTreeElement<T> {
    element: T;
    pos: Vector3;
}
export declare class Octree<T> {
    contents: OctTreeElement<T>[];
    child: Octree<T>[];
    boundary: Vector3[];
    level: number;
    constructor(bound: Vector3[], level?: number);
    add(element: OctTreeElement<T>): boolean;
    isWithin(pos: Vector3): boolean;
    isCloseTo(pos: Vector3, range?: number): boolean;
    nearBy(pos: Vector3, range: number, res: OctTreeElement<T>[], filter?: (T: any) => boolean): boolean;
    /**
     *
     * @param pos The Position to Detectd.
     * @param res  The object return the result content
     * @param filter Costum filter call back
     * @returns Result
     */
    nearest(pos: Vector3, res: {
        curNearest?: OctTreeElement<T>;
        distance: number;
    }, filter?: (T: any) => boolean): boolean;
}
//# sourceMappingURL=Octree.d.ts.map