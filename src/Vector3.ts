import { Euler } from './Euler';
import { Matrix3 } from './Matrix';
import { Matrix4 } from './Matrix4';
import { Quaternion } from './Quaternion';
import { Vector } from './Vector';

type Vector3Tuple = [number, number, number];

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
export class Vector3 implements Vector {

	constructor( x: number = 0, y: number = 0, z: number = 0){
        this.elements = [ x, y, z];     

		// this.x = x;
		// this.y = y;
		// this.z = z;

	}
    elements: number[];

	/**
	 * @default 0
	 */
	get x():number{
        return this.elements[0];
    }

    set x(value:number){
        this.elements[0] = value;        
    }

    get y():number{
        return this.elements[1];
    }
    
    set y(value:number){
        this.elements[1] = value;        
    }

    get z():number{
        return this.elements[2];
    }
    
    set z(value:number){
        this.elements[2] = value;        
    }

	/**
	 * @default 0
	 */
	//x: number;

	/**
	 * @default 0
	 */
	//y: number;

	/**
	 * @default 0
	 */
	//z: number;
	readonly isVector3: true;

	/**
	 * Sets value of this vector.
	 */
	set( x: number, y: number, z: number ): this{

		if ( z === undefined ) z = this.z; // sprite.scale.set(x,y)

		this.x = x;
		this.y = y;
		this.z = z;

		return this;

	}
	/**
	 * Sets all values of this vector.
	 */
	setScalar( scalar: number ): this{

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;

		return this;

	}

	/**
	 * Sets x value of this vector.
	 */
	setX( x: number ): Vector3{

		this.x = x;

		return this;

	}

	/**
	 * Sets y value of this vector.
	 */
	setY( y: number ): Vector3 {

		this.y = y;

		return this;

	}

	/**
	 * Sets z value of this vector.
	 */
	setZ( z: number ): Vector3{

		this.z = z;

		return this;

	}

	setComponent( index: number, value: number ): this {

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			case 2: this.z = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	getComponent( index: number ): number{

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			case 2: return this.z;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	/**
	 * Clones this vector.
	 */
	clone(): Vector3{
        return new Vector3().copy(this);
		
		//return new this.constructor( this.x, this.y, this.z );
	}


	/**
	 * Copies value of v to this vector.
	 */
	copy( v: Vector3 ): this{

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		return this;

	}

	/**
	 * Adds v to this vector.
	 */
	add( v: Vector3 ): this{

	
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;

	}

	addScalar( s: number ): this {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;

	}

	addScaledVector( v: Vector3, s: number ): this{

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;

		return this;

	}

	/**
	 * Sets this vector to a + b.
	 */
	addVectors( a: Vector3, b: Vector3 ): this{

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;

	}

	/**
	 * Subtracts v from this vector.
	 */
	sub( v :Vector3 ): this{
        this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
		return this;

	}

    

	subScalar( s: number ): this{

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;

	}

	/**
	 * Sets this vector to a - b.
	 */
	subVectors( a: Vector3, b: Vector3 ): this {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;

	}

	multiply( v: Vector3 ): this {

        this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;

	}

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar( scalar : number ): this{

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;

	}

	multiplyVectors( a: Vector3, b: Vector3 ): this{

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;

	}

	applyEuler( euler: Euler ): this{

		if ( ! ( euler && euler.isEuler ) ) {

			console.error( 'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.' );

		}

		return this.applyQuaternion( _quaternion.setFromEuler( euler ) );

	}


	 applyAxisAngle( axis: Vector3, angle: number ): this{

	 	return this.applyQuaternion( _quaternion.setFromAxisAngle( axis, angle ) );

	 }

	applyMatrix3( m: Matrix3 ): this{

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ] * z;
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ] * z;
		this.z = e[ 2 ] * x + e[ 5 ] * y + e[ 8 ] * z;

		return this;

	}

	 applyNormalMatrix( m: Matrix3 ): this{

		return this.applyMatrix3( m ).normalize();

	}

	applyMatrix4( m: Matrix4 ): this{

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		const w = 1 / ( e[ 3 ] * x + e[ 7 ] * y + e[ 11 ] * z + e[ 15 ] );

		this.x = ( e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z + e[ 12 ] ) * w;
		this.y = ( e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z + e[ 13 ] ) * w;
		this.z = ( e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z + e[ 14 ] ) * w;

		return this;

	}

	applyQuaternion( q: Quaternion ): this {

		const x = this.x, y = this.y, z = this.z;
		const qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// calculate quat * vector

		const ix = qw * x + qy * z - qz * y;
		const iy = qw * y + qz * x - qx * z;
		const iz = qw * z + qx * y - qy * x;
		const iw = - qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this.y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this.z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

		return this;

	}

	// project( camera: Camera ): this;

	// unproject( camera: Camera ): this;

	transformDirection( m: Matrix4 ): this{

		// input: Matrix4 affine matrix
		// vector interpreted as a direction

		const x = this.x, y = this.y, z = this.z;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 4 ] * y + e[ 8 ] * z;
		this.y = e[ 1 ] * x + e[ 5 ] * y + e[ 9 ] * z;
		this.z = e[ 2 ] * x + e[ 6 ] * y + e[ 10 ] * z;

		return this.normalize();

	}

	divide( v: Vector3 ): this{

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;

	}

	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0, 0 ) if s == 0.
	 */
	divideScalar( scalar: number ): this {

		return this.multiplyScalar( 1 / scalar );

	}

	min( v: Vector3 ): this{

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );
		this.z = Math.min( this.z, v.z );

		return this;

	}

	max( v: Vector3 ): this{

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );
		this.z = Math.max( this.z, v.z );

		return this;

	}

	clamp( min: Vector3, max: Vector3 ): this{

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );
		this.z = Math.max( min.z, Math.min( max.z, this.z ) );

		return this;

	}

	clampScalar( minVal: number, maxVal: number ): this {

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );
		this.z = Math.max( minVal, Math.min( maxVal, this.z ) );

		return this;

	}

	clampLength( min: number, max: number ): this {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}

	floor(): this{

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );
		this.z = Math.floor( this.z );

		return this;

	}

	ceil(): this{

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );
		this.z = Math.ceil( this.z );

		return this;

	}

	round(): this{

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );
		this.z = Math.round( this.z );

		return this;

	}

	roundToZero(): this{

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );
		this.z = ( this.z < 0 ) ? Math.ceil( this.z ) : Math.floor( this.z );

		return this;

	}

	/**
	 * Inverts this vector.
	 */
	negate(): this {

		this.x = - this.x;
		this.y = - this.y;
		this.z = - this.z;

		return this;

	}


	/**
	 * Computes dot product of this vector and v.
	 */
	dot( v: Vector3 ): number{

		return this.x * v.x + this.y * v.y + this.z * v.z;

	}

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number {

		return this.x * this.x + this.y * this.y + this.z * this.z;

	}

	/**
	 * Computes length of this vector.
	 */
	length(): number{

		return Math.sqrt( this.x * this.x + this.y * this.y + this.z * this.z );

	}

	/**
	 * Computes Manhattan length of this vector.
	 * http://en.wikipedia.org/wiki/Taxicab_geometry
	 *
	 * @deprecated Use {@link Vector3#manhattanLength .manhattanLength()} instead.
	 */
	//lengthManhattan(): number;

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number{
        return Math.abs( this.x ) + Math.abs( this.y ) + Math.abs( this.z );
    }

	/**
	 * Computes the Manhattan length (distance) from this vector to the given vector v
	 *
	 * @param {Vector3} v
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanDistanceTo( v: Vector3 ): number {

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y ) + Math.abs( this.z - v.z );
    }

	/**
	 * Normalizes this vector.
	 */
	normalize(): this {

		return this.divideScalar( this.length() || 1 );

	}

	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength( l: number ): this{

		return this.normalize().multiplyScalar( length );

	}

	lerp( v: Vector3, alpha: number ): this {

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;
		this.z += ( v.z - this.z ) * alpha;

		return this;

	}

	lerpVectors( v1: Vector3, v2: Vector3, alpha: number ): this {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;
		this.z = v1.z + ( v2.z - v1.z ) * alpha;

		return this;

	}

	/**
	 * Sets this vector to cross product of itself and v.
	 */
	cross( a: Vector3 ): this{

	
		return this.crossVectors( this, a);

	}


	/**
	 * Sets this vector to cross product of a and b.
	 */
	crossVectors( a: Vector3, b: Vector3 ): this{

		const ax = a.x, ay = a.y, az = a.z;
		const bx = b.x, by = b.y, bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;

	}

	projectOnVector( v: Vector3 ): this {

		const denominator = v.lengthSq();

		if ( denominator === 0 ) return this.set( 0, 0, 0 );

		const scalar = v.dot( this ) / denominator;

		return this.copy( v ).multiplyScalar( scalar );

	}

    


    // wait to implement
	projectOnPlane( planeNormal: Vector3 ): this{

		 _vector.copy( this ).projectOnVector( planeNormal );
		 return this.sub( _vector );

	}

	reflect( normal: Vector3 ): this{

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		return this.sub( _vector.copy( normal ).multiplyScalar( 2 * this.dot( normal ) ) );

	}
    
    // need to implement
	// angleTo( v: Vector3 ): number{

	// 	const denominator = Math.sqrt( this.lengthSq() * v.lengthSq() );

	// 	if ( denominator === 0 ) return Math.PI / 2;

	// 	const theta = this.dot( v ) / denominator;

	// 	// clamp, to handle numerical problems

	// 	return Math.acos( MathUtils.clamp( theta, - 1, 1 ) );

	// }

	/**
	 * Computes distance of this vector to v.
	 */
	distanceTo( v: Vector3 ): number{

		return Math.sqrt( this.distanceToSquared( v ) );

	}

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared( v: Vector3 ): number {

		const dx = this.x - v.x, dy = this.y - v.y, dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;

	}

	/**
	 * @deprecated Use {@link Vector3#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	//distanceToManhattan( v: Vector3 ): number;
	// setFromSpherical( s: Spherical ): this {

	// 	return this.setFromSphericalCoords( s.radius, s.phi, s.theta );
	// }

	setFromSphericalCoords( radius: number, phi: number, theta:number ): this {

		const sinPhiRadius = Math.sin( phi ) * radius;

		this.x = sinPhiRadius * Math.sin( theta );
		this.y = Math.cos( phi ) * radius;
		this.z = sinPhiRadius * Math.cos( theta );
		return this;
	}

	//setFromCylindrical( s: Cylindrical ): this;
	setFromCylindricalCoords( radius: number, theta: number, y: number ): this{

		this.x = radius * Math.sin( theta );
		this.y = y;
		this.z = radius * Math.cos( theta );

		return this;

	}
	
    setFromMatrixPosition( m:Matrix4 ): this{

		const e = m.elements;

		this.x = e[ 12 ];
		this.y = e[ 13 ];
		this.z = e[ 14 ];

		return this;

	}
	setFromMatrixScale( m: Matrix4 ): this {

		const sx = this.setFromMatrixColumn( m, 0 ).length();
		const sy = this.setFromMatrixColumn( m, 1 ).length();
		const sz = this.setFromMatrixColumn( m, 2 ).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;

	}
	setFromMatrixColumn( matrix: Matrix4, index: number ): this{

		return this.fromArray(  matrix.elements, index * 4 );

	}

	setFromMatrix3Column( matrix: Matrix3, index: number ): this{
		return this.fromArray( matrix.elements, index * 3 );
	}

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals( v: Vector3 ): boolean{

		return ( ( v.x === this.x ) && ( v.y === this.y ) && ( v.z === this.z ) );

	}

	/**
	 * Sets this vector's x, y and z value from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset: number = 0 ): this {

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];
		this.z = array[ offset + 2 ];

		return this;

	}

	/**
	 * Sets this vector's x, y and z value from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	//fromArray( array: ArrayLike<number>, offset?: number ): this;

	/**
	 * Returns an array [x, y, z], or copies x, y and z into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array: number[] = [], offset: number=0 ): number[]{

		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;
		array[ offset + 2 ] = this.z;

		return array;
	}

	toArrayVectot3( array:Vector3Tuple): Vector3Tuple{
		array[0] = this.x;
		array[0] = this.y;
		array[0] = this.z;
		return array;
	}

	/**
	 * Copies x, y and z into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array-like.
	 * @return The provided array-like.
	 */
	//toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	// fromBufferAttribute(
	// 	attribute: BufferAttribute | InterleavedBufferAttribute,
	// 	index: number
	// ): this;

	/**
	 * Sets this vector's x, y and z from Math.random
	 */
	random(): this{

		this.x = Math.random();
		this.y = Math.random();
		this.z = Math.random();

		return this;

	}

	static sumList(list:Vector3[]):Vector3{
		let res = new Vector3();
		return list.reduce((pre,cur)=>{
				res.set(pre.x+cur.x,pre.y+cur.y,pre.z+cur.z); return res;
			});
		/*for (let vec of list){
			res.add(vec);			
		}		
		return res;*/
	}
	
	static averageList(list:Vector3[]):Vector3{	
		return this.sumList(list).multiplyScalar(list.length ? 1.0/list.length : 1);
	}

}
const _vector = /*@__PURE__*/ new Vector3();
const _quaternion = /*@__PURE__*/ new Quaternion();

