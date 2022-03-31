"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathUtils = void 0;
const Vector3_1 = require("./Vector3");
const Quaternion_1 = require("./Quaternion");
const Matrix_1 = require("./Matrix");
const Matrix4_1 = require("./Matrix4");
const _lut = [];
for (let i = 0; i < 256; i++) {
    _lut[i] = (i < 16 ? '0' : '') + (i).toString(16);
}
let _seed = 1234567;
//const  __tempTest:Quaternion|null =  /*@__PURE__*/ new Quaternion();
/**
 * @see {@link https://github.com/mrdoob/three.js/blob/master/src/math/MathUtils.js|src/math/MathUtils.js}
 */
var MathUtils;
(function (MathUtils) {
    MathUtils.DEG2RAD = Math.PI / 180;
    MathUtils.RAD2DEG = 180 / Math.PI;
    function generateUUID() {
        // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
        const d0 = Math.random() * 0xffffffff | 0;
        const d1 = Math.random() * 0xffffffff | 0;
        const d2 = Math.random() * 0xffffffff | 0;
        const d3 = Math.random() * 0xffffffff | 0;
        const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' +
            _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' +
            _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] +
            _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff];
        // .toUpperCase() here flattens concatenated strings to save heap memory space.
        return uuid.toUpperCase();
    }
    MathUtils.generateUUID = generateUUID;
    /**
     * Clamps the x to be between a and b.
     *
     * @param value Value to be clamped.
     * @param min Minimum value
     * @param max Maximum value.
     */
    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }
    MathUtils.clamp = clamp;
    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation
    function euclideanModulo(n, m) {
        return ((n % m) + m) % m;
    }
    MathUtils.euclideanModulo = euclideanModulo;
    /**
     * Linear mapping of x from range [a1, a2] to range [b1, b2].
     *
     * @param x Value to be mapped.
     * @param a1 Minimum value for range A.
     * @param a2 Maximum value for range A.
     * @param b1 Minimum value for range B.
     * @param b2 Maximum value for range B.
     */
    function mapLinear(x, a1, a2, b1, b2) {
        return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    }
    MathUtils.mapLinear = mapLinear;
    function smoothstep(x, min, max) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * (3 - 2 * x);
    }
    MathUtils.smoothstep = smoothstep;
    function smootherstep(x, min, max) {
        if (x <= min)
            return 0;
        if (x >= max)
            return 1;
        x = (x - min) / (max - min);
        return x * x * x * (x * (x * 6 - 15) + 10);
    }
    MathUtils.smootherstep = smootherstep;
    /**
     * Random float from 0 to 1 with 16 bits of randomness.
     * Standard Math.random() creates repetitive patterns when applied over larger space.
     *
     * @deprecated Use {@link Math#random Math.random()}
     */
    //export function random16(): number;
    /**
     * Random integer from low to high interval.
     */
    function randInt(low, high) {
        return low + Math.floor(Math.random() * (high - low + 1));
    }
    MathUtils.randInt = randInt;
    /**
     * Random float from low to high interval.
     */
    function randFloat(low, high) {
        return low + Math.random() * (high - low);
    }
    MathUtils.randFloat = randFloat;
    /**
     * Random float from - range / 2 to range / 2 interval.
     */
    function randFloatSpread(range) {
        return range * (0.5 - Math.random());
    }
    MathUtils.randFloatSpread = randFloatSpread;
    /**
     * Deterministic pseudo-random float in the interval [ 0, 1 ].
     */
    function seededRandom(s) {
        if (s !== undefined)
            _seed = s % 2147483647;
        // Park-Miller algorithm
        _seed = _seed * 16807 % 2147483647;
        return (_seed - 1) / 2147483646;
    }
    MathUtils.seededRandom = seededRandom;
    function degToRad(degrees) {
        return degrees * MathUtils.DEG2RAD;
    }
    MathUtils.degToRad = degToRad;
    function radToDeg(radians) {
        return radians * MathUtils.RAD2DEG;
    }
    MathUtils.radToDeg = radToDeg;
    function isPowerOfTwo(value) {
        return (value & (value - 1)) === 0 && value !== 0;
    }
    MathUtils.isPowerOfTwo = isPowerOfTwo;
    /**
     * Returns a value linearly interpolated from two known points based
     * on the given interval - t = 0 will return x and t = 1 will return y.
     *
     * @param x Start point.
     * @param y End point.
     * @param t interpolation factor in the closed interval [0, 1]
     * @return {number}
     */
    function lerp(x, y, t) {
        return (1 - t) * x + t * y;
    }
    MathUtils.lerp = lerp;
    /**
     * @deprecated Use {@link Math#floorPowerOfTwo .floorPowerOfTwo()}
     */
    //export function nearestPowerOfTwo( value: number ): number;
    /**
     * @deprecated Use {@link Math#ceilPowerOfTwo .ceilPowerOfTwo()}
     */
    //export function nextPowerOfTwo( value: number ): number;
    function floorPowerOfTwo(value) {
        return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    }
    MathUtils.floorPowerOfTwo = floorPowerOfTwo;
    function ceilPowerOfTwo(value) {
        return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
    }
    MathUtils.ceilPowerOfTwo = ceilPowerOfTwo;
    function setQuaternionFromProperEuler(q, a, b, c, order) {
        // Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles
        // rotations are applied to the axes in the order specified by 'order'
        // rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
        // angles are in radians
        const cos = Math.cos;
        const sin = Math.sin;
        const c2 = cos(b / 2);
        const s2 = sin(b / 2);
        const c13 = cos((a + c) / 2);
        const s13 = sin((a + c) / 2);
        const c1_3 = cos((a - c) / 2);
        const s1_3 = sin((a - c) / 2);
        const c3_1 = cos((c - a) / 2);
        const s3_1 = sin((c - a) / 2);
        switch (order) {
            case 'XYX':
                q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
                break;
            case 'YZY':
                q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
                break;
            case 'ZXZ':
                q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
                break;
            case 'XZX':
                q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
                break;
            case 'YXY':
                q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
                break;
            case 'ZYZ':
                q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
                break;
            default:
                console.warn('THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order);
        }
    }
    MathUtils.setQuaternionFromProperEuler = setQuaternionFromProperEuler;
    let _tempM3 = null;
    function solveMatrix3CramersRule(mat, q) {
        const detBase = mat.determinant();
        // check if no solution.
        if (detBase == 0)
            return null;
        const res = new Vector3_1.Vector3();
        // test
        _tempM3 = _tempM3 ? _tempM3 : new Matrix_1.Matrix3();
        _tempM3.copy(mat);
        _tempM3.elements[0] = q.x;
        _tempM3.elements[1] = q.y;
        _tempM3.elements[2] = q.z;
        res.x = _tempM3.determinant() / detBase;
        _tempM3.copy(mat);
        _tempM3.elements[3] = q.x;
        _tempM3.elements[4] = q.y;
        _tempM3.elements[5] = q.z;
        res.y = _tempM3.determinant() / detBase;
        _tempM3.copy(mat);
        _tempM3.elements[6] = q.x;
        _tempM3.elements[7] = q.y;
        _tempM3.elements[8] = q.z;
        res.z = _tempM3.determinant() / detBase;
        return res;
    }
    MathUtils.solveMatrix3CramersRule = solveMatrix3CramersRule;
    let _tempM4 = null;
    function solveMatrix4CramersRule(mat, q) {
        const detBase = mat.determinant();
        // check if no solution.
        if (detBase == 0)
            return null;
        const res = new Quaternion_1.Quaternion();
        //_tempM4 = _tempM4? _tempM4 : new Matrix4();
        _tempM4 = _tempM4 ? _tempM4 : new Matrix4_1.Matrix4();
        _tempM4.copy(mat);
        _tempM4.elements[0] = q.x;
        _tempM4.elements[1] = q.y;
        _tempM4.elements[2] = q.z;
        _tempM4.elements[3] = q.w;
        res.x = _tempM4.determinant() / detBase;
        _tempM4.copy(mat);
        _tempM4.elements[4] = q.x;
        _tempM4.elements[5] = q.y;
        _tempM4.elements[6] = q.z;
        _tempM4.elements[7] = q.w;
        res.y = _tempM4.determinant() / detBase;
        _tempM4.copy(mat);
        _tempM4.elements[8] = q.x;
        _tempM4.elements[9] = q.y;
        _tempM4.elements[10] = q.z;
        _tempM4.elements[11] = q.w;
        res.z = _tempM4.determinant() / detBase;
        _tempM4.copy(mat);
        _tempM4.elements[12] = q.x;
        _tempM4.elements[13] = q.y;
        _tempM4.elements[14] = q.z;
        _tempM4.elements[15] = q.w;
        res.w = _tempM4.determinant() / detBase;
        return res;
    }
    MathUtils.solveMatrix4CramersRule = solveMatrix4CramersRule;
    /**
     * Returns the angle for solve the Angle Sum equation
     * sin(alpha) + b*cos(alpha) = c, return alpha for given b , c
     * @param b cosine parameter
     * @param c constant
     *
     *  * @return {number}
     */
    function solveAngleSumSPC(b, c) {
        let ret = 0;
        let arcroot = Math.sqrt(1 + b * b);
        let beta = Math.acos(1 / arcroot);
        beta = b > 0 ? beta : beta * -1;
        ret = Math.asin(c / arcroot) - beta;
        return ret;
    }
    MathUtils.solveAngleSumSPC = solveAngleSumSPC;
})(MathUtils = exports.MathUtils || (exports.MathUtils = {}));
//# sourceMappingURL=MathUtils.js.map