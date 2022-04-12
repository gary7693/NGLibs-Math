"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quaternion = void 0;
const MathUtils_1 = require("./MathUtils");
/**
 * Implementation of a quaternion. This is used for rotating things without incurring in the dreaded gimbal lock issue, amongst other advantages.
 *
 * @example
 * const quaternion = new THREE.Quaternion();
 * quaternion.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), Math.PI / 2 );
 * const vector = new THREE.Vector3( 1, 0, 0 );
 * vector.applyQuaternion( quaternion );
 */
class Quaternion {
    //_onChangeCallback = null;
    /**
     * @param x x coordinate
     * @param y y coordinate
     * @param z z coordinate
     * @param w w coordinate
     */
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this._onChangeCallback = null;
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    // /**
    //  * @default 0
    //  */
    get x() {
        return this._x;
    }
    set x(value) {
        var _a;
        this._x = value;
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    // /**
    //  * @default 0
    //  */
    get y() {
        return this._y;
    }
    set y(value) {
        var _a;
        this._y = value;
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    // /**
    //  * @default 0
    //  */
    get z() {
        return this._z;
    }
    set z(value) {
        var _a;
        this._z = value;
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    // /**
    //  * @default 1
    //  */
    get w() {
        return this._w;
    }
    set w(value) {
        var _a;
        this._w = value;
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    /**
     * Sets values of this quaternion.
     */
    set(x, y, z, w) {
        var _a;
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    /**
     * Clones this quaternion.
     */
    clone() {
        return new Quaternion().copy(this);
    }
    /**
     * Copies values of q to this quaternion.
     */
    copy(quaternion) {
        var _a;
        this._x = quaternion.x;
        this._y = quaternion.y;
        this._z = quaternion.z;
        this._w = quaternion.w;
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    /**
     * Sets this quaternion from rotation specified by Euler angles.
     */
    setFromEuler(euler, update = false) {
        var _a;
        if (!(euler && euler.isEuler)) {
            throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
        }
        const x = euler.x, y = euler.y, z = euler.z, order = euler.order;
        // http://www.mathworks.com/matlabcentral/fileexchange/
        // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
        //	content/SpinCalc.m
        const cos = Math.cos;
        const sin = Math.sin;
        const c1 = cos(x / 2);
        const c2 = cos(y / 2);
        const c3 = cos(z / 2);
        const s1 = sin(x / 2);
        const s2 = sin(y / 2);
        const s3 = sin(z / 2);
        switch (order) {
            case 'XYZ':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'YXZ':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'ZXY':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'ZYX':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            case 'YZX':
                this._x = s1 * c2 * c3 + c1 * s2 * s3;
                this._y = c1 * s2 * c3 + s1 * c2 * s3;
                this._z = c1 * c2 * s3 - s1 * s2 * c3;
                this._w = c1 * c2 * c3 - s1 * s2 * s3;
                break;
            case 'XZY':
                this._x = s1 * c2 * c3 - c1 * s2 * s3;
                this._y = c1 * s2 * c3 - s1 * c2 * s3;
                this._z = c1 * c2 * s3 + s1 * s2 * c3;
                this._w = c1 * c2 * c3 + s1 * s2 * s3;
                break;
            default:
                console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order);
        }
        if (update !== false)
            (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    /**
     * Sets this quaternion from rotation specified by axis and angle.
     * Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm.
     * Axis have to be normalized, angle is in radians.
     */
    setFromAxisAngle(axis, angle) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
        var _a;
        // assumes axis is normalized
        const halfAngle = angle / 2, s = Math.sin(halfAngle);
        this._x = axis.x * s;
        this._y = axis.y * s;
        this._z = axis.z * s;
        this._w = Math.cos(halfAngle);
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    /**
     * Sets this quaternion from rotation component of m. Adapted from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm.
     */
    setFromRotationMatrix(m) {
        // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
        var _a;
        // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
        const te = m.elements, m11 = te[0], m12 = te[4], m13 = te[8], m21 = te[1], m22 = te[5], m23 = te[9], m31 = te[2], m32 = te[6], m33 = te[10], trace = m11 + m22 + m33;
        if (trace > 0) {
            const s = 0.5 / Math.sqrt(trace + 1.0);
            this._w = 0.25 / s;
            this._x = (m32 - m23) * s;
            this._y = (m13 - m31) * s;
            this._z = (m21 - m12) * s;
        }
        else if (m11 > m22 && m11 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
            this._w = (m32 - m23) / s;
            this._x = 0.25 * s;
            this._y = (m12 + m21) / s;
            this._z = (m13 + m31) / s;
        }
        else if (m22 > m33) {
            const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
            this._w = (m13 - m31) / s;
            this._x = (m12 + m21) / s;
            this._y = 0.25 * s;
            this._z = (m23 + m32) / s;
        }
        else {
            const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
            this._w = (m21 - m12) / s;
            this._x = (m13 + m31) / s;
            this._y = (m23 + m32) / s;
            this._z = 0.25 * s;
        }
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    setFromUnitVectors(vFrom, vTo) {
        // assumes direction vectors vFrom and vTo are normalized
        const EPS = 0.000001;
        let r = vFrom.dot(vTo) + 1;
        if (r < EPS) {
            r = 0;
            if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
                this._x = -vFrom.y;
                this._y = vFrom.x;
                this._z = 0;
                this._w = r;
            }
            else {
                this._x = 0;
                this._y = -vFrom.z;
                this._z = vFrom.y;
                this._w = r;
            }
        }
        else {
            // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
            this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
            this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
            this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
            this._w = r;
        }
        return this.normalize();
    }
    angleTo(q) {
        return 2 * Math.acos(Math.abs(MathUtils_1.MathUtils.clamp(this.dot(q), -1, 1)));
    }
    rotateTowards(q, step) {
        const angle = this.angleTo(q);
        if (angle === 0)
            return this;
        const t = Math.min(1, step / angle);
        this.slerp(q, t);
        return this;
    }
    identity() {
        return this.set(0, 0, 0, 1);
    }
    /**
     * Inverts this quaternion.
     */
    invert() {
        // quaternion is assumed to have unit length
        return this.conjugate();
    }
    conjugate() {
        var _a;
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    dot(v) {
        return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }
    lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }
    /**
     * Computes length of this quaternion.
     */
    length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }
    /**
     * Normalizes this quaternion.
     */
    normalize() {
        var _a;
        let l = this.length();
        if (l === 0) {
            this._x = 0;
            this._y = 0;
            this._z = 0;
            this._w = 1;
        }
        else {
            l = 1 / l;
            this._x = this._x * l;
            this._y = this._y * l;
            this._z = this._z * l;
            this._w = this._w * l;
        }
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    /**
     * Multiplies this quaternion by b.
     */
    multiply(q) {
        return this.multiplyQuaternions(this, q);
    }
    premultiply(q) {
        return this.multiplyQuaternions(q, this);
    }
    /**
     * Sets this quaternion to a x b
     * Adapted from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm.
     */
    multiplyQuaternions(a, b) {
        // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
        var _a;
        const qax = a._x, qay = a._y, qaz = a._z, qaw = a._w;
        const qbx = b._x, qby = b._y, qbz = b._z, qbw = b._w;
        this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    slerp(qb, t) {
        var _a, _b;
        if (t === 0)
            return this;
        if (t === 1)
            return this.copy(qb);
        const x = this._x, y = this._y, z = this._z, w = this._w;
        // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/
        let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;
        if (cosHalfTheta < 0) {
            this._w = -qb._w;
            this._x = -qb._x;
            this._y = -qb._y;
            this._z = -qb._z;
            cosHalfTheta = -cosHalfTheta;
        }
        else {
            this.copy(qb);
        }
        if (cosHalfTheta >= 1.0) {
            this._w = w;
            this._x = x;
            this._y = y;
            this._z = z;
            return this;
        }
        const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;
        if (sqrSinHalfTheta <= Number.EPSILON) {
            const s = 1 - t;
            this._w = s * w + t * this._w;
            this._x = s * x + t * this._x;
            this._y = s * y + t * this._y;
            this._z = s * z + t * this._z;
            this.normalize();
            (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
            return this;
        }
        const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
        const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
        const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta, ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
        this._w = (w * ratioA + this._w * ratioB);
        this._x = (x * ratioA + this._x * ratioB);
        this._y = (y * ratioA + this._y * ratioB);
        this._z = (z * ratioA + this._z * ratioB);
        (_b = this._onChangeCallback) === null || _b === void 0 ? void 0 : _b.call(this);
        return this;
    }
    equals(quaternion) {
        return (quaternion._x === this._x) && (quaternion._y === this._y) && (quaternion._z === this._z) && (quaternion._w === this._w);
    }
    /**
     * Sets this quaternion's x, y, z and w value from the provided array.
     * @param array the source array.
     * @param offset (optional) offset into the array. Default is 0.
     */
    fromArray(array, offset) {
        var _a;
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        (_a = this._onChangeCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        return this;
    }
    /**
     * Sets this quaternion's x, y, z and w value from the provided array-like.
     * @param array the source array-like.
     * @param offset (optional) offset into the array-like. Default is 0.
     */
    //fromArray( array: ArrayLike<number>, offset?: number ): this;
    /**
     * Returns an array [x, y, z, w], or copies x, y, z and w into the provided array.
     * @param array (optional) array to store the quaternion to. If this is not provided, a new array will be created.
     * @param offset (optional) optional offset into the array.
     * @return The created or provided array.
     */
    toArray(array = [], offset = 0) {
        array[offset] = this._x;
        array[offset + 1] = this._y;
        array[offset + 2] = this._z;
        array[offset + 3] = this._w;
        return array;
    }
    /**
     * Copies x, y, z and w into the provided array-like.
     * @param array array-like to store the quaternion to.
     * @param offset (optional) optional offset into the array.
     * @return The provided array-like.
     */
    //toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;
    _onChange(callback) {
        this._onChangeCallback = callback;
        return this;
    }
    /**
     * Adapted from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/.
     */
    static slerp(qa, qb, qm, t) {
        return qm.copy(qa).slerp(qb, t);
    }
    // static slerpFlat(
    // 	dst: number[],
    // 	dstOffset: number,
    // 	src0: number[],
    // 	srcOffset0: number,
    // 	src1: number[],
    // 	srcOffset1: number,
    // 	t: number
    // ): Quaternion {
    //     	// fuzz-free, array-based Quaternion SLERP operation
    // 	let x0 = src0[ srcOffset0 + 0 ],
    //     y0 = src0[ srcOffset0 + 1 ],
    //     z0 = src0[ srcOffset0 + 2 ],
    //     w0 = src0[ srcOffset0 + 3 ];
    // const x1 = src1[ srcOffset1 + 0 ],
    //     y1 = src1[ srcOffset1 + 1 ],
    //     z1 = src1[ srcOffset1 + 2 ],
    //     w1 = src1[ srcOffset1 + 3 ];
    // if ( w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1 ) {
    //     let s = 1 - t;
    //     const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
    //         dir = ( cos >= 0 ? 1 : - 1 ),
    //         sqrSin = 1 - cos * cos;
    //     // Skip the Slerp for tiny steps to avoid numeric problems:
    //     if ( sqrSin > Number.EPSILON ) {
    //         const sin = Math.sqrt( sqrSin ),
    //             len = Math.atan2( sin, cos * dir );
    //         s = Math.sin( s * len ) / sin;
    //         t = Math.sin( t * len ) / sin;
    //     }
    //     const tDir = t * dir;
    //     x0 = x0 * s + x1 * tDir;
    //     y0 = y0 * s + y1 * tDir;
    //     z0 = z0 * s + z1 * tDir;
    //     w0 = w0 * s + w1 * tDir;
    //     // Normalize in case we just did a lerp:
    //     if ( s === 1 - t ) {
    //         const f = 1 / Math.sqrt( x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0 );
    //         x0 *= f;
    //         y0 *= f;
    //         z0 *= f;
    //         w0 *= f;
    //     }
    // }
    // dst[ dstOffset ] = x0;
    // dst[ dstOffset + 1 ] = y0;
    // dst[ dstOffset + 2 ] = z0;
    // dst[ dstOffset + 3 ] = w0;
    // }
    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
        const x0 = src0[srcOffset0];
        const y0 = src0[srcOffset0 + 1];
        const z0 = src0[srcOffset0 + 2];
        const w0 = src0[srcOffset0 + 3];
        const x1 = src1[srcOffset1];
        const y1 = src1[srcOffset1 + 1];
        const z1 = src1[srcOffset1 + 2];
        const w1 = src1[srcOffset1 + 3];
        dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
        dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
        dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
        dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
        return dst;
    }
}
exports.Quaternion = Quaternion;