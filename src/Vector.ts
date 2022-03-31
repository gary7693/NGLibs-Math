import {Matrix3} from"./Matrix"
type Vector2tuple = [number, number];

/**
 * ( interface Vector<T> )
 *
 * Abstract interface of {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector2.js|Vector2},
 * {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector3.js|Vector3}
 * and {@link https://github.com/mrdoob/three.js/blob/master/src/math/Vector4.js|Vector4}.
 *
 * Currently the members of Vector is NOT type safe because it accepts different typed vectors.
 *
 * Those definitions will be changed when TypeScript innovates Generics to be type safe.
 *
 * @example
 * const v:THREE.Vector = new THREE.Vector3();
 * v.addVectors(new THREE.Vector2(0, 1), new THREE.Vector2(2, 3)); // invalid but compiled successfully
 */
export interface Vector {

    elements: number[];

	setComponent( index: number, value: number ): this;

	getComponent( index: number ): number;

	set( ...args: number[] ): this;

	setScalar( scalar: number ): this;

	/**
	 * copy(v:T):T;
	 */
	copy( v: Vector ): this;

	/**
	 * NOTE: The second argument is deprecated.
	 *
	 * add(v:T):T;
	 */
	add( v: Vector ): this;

	/**
	 * addVectors(a:T, b:T):T;
	 */
	addVectors( a: Vector, b: Vector ): this;

	addScaledVector( vector: Vector, scale: number ): this;

	/**
	 * Adds the scalar value s to this vector's values.
	 */
	addScalar( scalar: number ): this;

	/**
	 * sub(v:T):T;
	 */
	sub( v: Vector ): this;

	/**
	 * subVectors(a:T, b:T):T;
	 */
	subVectors( a: Vector, b: Vector ): this;

	/**
	 * multiplyScalar(s:number):T;
	 */
	multiplyScalar( s: number ): this;

	/**
	 * divideScalar(s:number):T;
	 */
	divideScalar( s: number ): this;

	/**
	 * negate():T;
	 */
	negate(): this;

	/**
	 * dot(v:T):T;
	 */
	dot( v: Vector ): number;

	/**
	 * lengthSq():number;
	 */
	lengthSq(): number;

	/**
	 * length():number;
	 */
	length(): number;

	/**
	 * normalize():T;
	 */
	normalize(): this;

	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceTo(v:T):number;
	 */
	distanceTo?( v: Vector ): number;

	/**
	 * NOTE: Vector4 doesn't have the property.
	 *
	 * distanceToSquared(v:T):number;
	 */
	distanceToSquared?( v: Vector ): number;

	/**
	 * setLength(l:number):T;
	 */
	setLength( l: number ): this;

	/**
	 * lerp(v:T, alpha:number):T;
	 */
	lerp( v: Vector, alpha: number ): this;

	/**
	 * equals(v:T):boolean;
	 */
	equals( v: Vector ): boolean;

	/**
	 * clone():T;
	 */
	clone(): Vector;
}

/**
 * 2D vector.
 *
 * ( class Vector2 implements Vector<Vector2> )
 */
export class Vector2 implements Vector {

	constructor( x: number = 0, y: number = 0){
        this.elements = [ x, y];       
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


	/**
	 * @default 0
	 */
	//y: number;
	width: number;
	height: number;
	readonly isVector2: true;

	/**
	 * Sets value of this vector.
	 */
	set( x: number, y: number ): this{

		this.x = x;
		this.y = y;

		return this;

	}

	/**
	 * Sets the x and y values of this vector both equal to scalar.
	 */
	setScalar( scalar: number ): this{

		this.x = scalar;
		this.y = scalar;

		return this;

	}

	/**
	 * Sets X component of this vector.
	 */
	setX( x: number ): this{

		this.x = x;

		return this;

	}

	/**
	 * Sets Y component of this vector.
	 */
	setY( y: number ): this{

		this.y = y;

		return this;

	}

	/**
	 * Sets a component of this vector.
	 */
	setComponent( index: number, value: number ): this{

		switch ( index ) {

			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error( 'index is out of range: ' + index );

		}

		return this;

	}

	/**
	 * Gets a component of this vector.
	 */
	getComponent( index: number ): number{

		switch ( index ) {

			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error( 'index is out of range: ' + index );

		}

	}

	/**
	 * Returns a new Vector2 instance with the same `x` and `y` values.
	 */
	clone(): Vector2{
		return new Vector2().copy(this);
    //return this;

	}

	/**
	 * Copies value of v to this vector.
	 */
	copy( v: Vector2 ): this{

		this.x = v.x;
		this.y = v.y;

		return this;

	}

	/**
	 * Adds v to this vector.
	 */
	add( v: Vector2, w?: Vector2 ): this {

		if ( w !== undefined ) {

			console.warn( 'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.' );
			return this.addVectors( v, w );

		}

		this.x += v.x;
		this.y += v.y;

		return this;

	}

	/**
	 * Adds the scalar value s to this vector's x and y values.
	 */
	addScalar( s: number ): this {

		this.x += s;
		this.y += s;

		return this;

	}


	/**
	 * Sets this vector to a + b.
	 */
	addVectors( a: Vector2, b: Vector2 ): this{

		this.x = a.x + b.x;
		this.y = a.y + b.y;

		return this;

	}

	/**
	 * Adds the multiple of v and s to this vector.
	 */
	addScaledVector( v: Vector2, s: number ): this{

		this.x += v.x * s;
		this.y += v.y * s;

		return this;

	}

	/**
	 * Subtracts v from this vector.
	 */
	sub( v: Vector2 ): this{
		
		this.x -= v.x;
		this.y -= v.y;

		return this;

	}

	/**
	 * Subtracts s from this vector's x and y components.
	 */
	subScalar( s: number ): this {

		this.x -= s;
		this.y -= s;

		return this;

	}

	/**
	 * Sets this vector to a - b.
	 */
	subVectors( a: Vector2, b: Vector2 ): this{

		this.x = a.x - b.x;
		this.y = a.y - b.y;

		return this;

	}

	/**
	 * Multiplies this vector by v.
	 */
	multiply( v: Vector2 ): this{

		this.x *= v.x;
		this.y *= v.y;

		return this;

	}

	/**
	 * Multiplies this vector by scalar s.
	 */
	multiplyScalar( scalar: number ): this{

		this.x *= scalar;
		this.y *= scalar;

		return this;

	}

	/**
	 * Divides this vector by v.
	 */
	divide( v: Vector2 ): this{

		this.x /= v.x;
		this.y /= v.y;

		return this;

	}


	/**
	 * Divides this vector by scalar s.
	 * Set vector to ( 0, 0 ) if s == 0.
	 */
	divideScalar( s: number ): this {

		return this.multiplyScalar( 1 / s );

	}

	/**
	 * Multiplies this vector (with an implicit 1 as the 3rd component) by m.
	 */
	applyMatrix3( m: Matrix3 ): this{

		const x = this.x, y = this.y;
		const e = m.elements;

		this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
		this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

		return this;

	}
	// 	const x = this.x, y = this.y;
	// 	const e = m.elements;

	// 	this.x = e[ 0 ] * x + e[ 3 ] * y + e[ 6 ];
	// 	this.y = e[ 1 ] * x + e[ 4 ] * y + e[ 7 ];

	// 	return this;

	// }

	/**
	 * If this vector's x or y value is greater than v's x or y value, replace that value with the corresponding min value.
	 */
	min( v: Vector2 ): this{

		this.x = Math.min( this.x, v.x );
		this.y = Math.min( this.y, v.y );

		return this;

	}

	/**
	 * If this vector's x or y value is less than v's x or y value, replace that value with the corresponding max value.
	 */
	max( v: Vector2 ): this {

		this.x = Math.max( this.x, v.x );
		this.y = Math.max( this.y, v.y );

		return this;

	}

	/**
	 * If this vector's x or y value is greater than the max vector's x or y value, it is replaced by the corresponding value.
	 * If this vector's x or y value is less than the min vector's x or y value, it is replaced by the corresponding value.
	 * @param min the minimum x and y values.
	 * @param max the maximum x and y values in the desired range.
	 */
	clamp( min: Vector2, max: Vector2 ): this{

		// assumes min < max, componentwise

		this.x = Math.max( min.x, Math.min( max.x, this.x ) );
		this.y = Math.max( min.y, Math.min( max.y, this.y ) );

		return this;

	}

	/**
	 * If this vector's x or y values are greater than the max value, they are replaced by the max value.
	 * If this vector's x or y values are less than the min value, they are replaced by the min value.
	 * @param min the minimum value the components will be clamped to.
	 * @param max the maximum value the components will be clamped to.
	 */
	clampScalar( minVal: number, maxVal: number ): this{

		this.x = Math.max( minVal, Math.min( maxVal, this.x ) );
		this.y = Math.max( minVal, Math.min( maxVal, this.y ) );

		return this;

	}

	/**
	 * If this vector's length is greater than the max value, it is replaced by the max value.
	 * If this vector's length is less than the min value, it is replaced by the min value.
	 * @param min the minimum value the length will be clamped to.
	 * @param max the maximum value the length will be clamped to.
	 */
	clampLength( min: number, max: number ): this {

		const length = this.length();

		return this.divideScalar( length || 1 ).multiplyScalar( Math.max( min, Math.min( max, length ) ) );

	}


	/**
	 * The components of the vector are rounded down to the nearest integer value.
	 */
	floor(): this{

		this.x = Math.floor( this.x );
		this.y = Math.floor( this.y );

		return this;

	}

	/**
	 * The x and y components of the vector are rounded up to the nearest integer value.
	 */
	ceil(): this{

		this.x = Math.ceil( this.x );
		this.y = Math.ceil( this.y );

		return this;

	}

	/**
	 * The components of the vector are rounded to the nearest integer value.
	 */
	round(): this{

		this.x = Math.round( this.x );
		this.y = Math.round( this.y );

		return this;

	}

	/**
	 * The components of the vector are rounded towards zero (up if negative, down if positive) to an integer value.
	 */
	roundToZero(): this{

		this.x = ( this.x < 0 ) ? Math.ceil( this.x ) : Math.floor( this.x );
		this.y = ( this.y < 0 ) ? Math.ceil( this.y ) : Math.floor( this.y );

		return this;

	}

	/**
	 * Inverts this vector.
	 */
	negate(): this{

		this.x = - this.x;
		this.y = - this.y;

		return this;

	}

	/**
	 * Computes dot product of this vector and v.
	 */
	dot( v: Vector2 ): number {

		return this.x * v.x + this.y * v.y;

	}

	/**
	 * Computes cross product of this vector and v.
	 */
	cross( v: Vector2 ): number{

		return this.x * v.y - this.y * v.x;

	}

	/**
	 * Computes squared length of this vector.
	 */
	lengthSq(): number{

		return this.x * this.x + this.y * this.y;

	}

	/**
	 * Computes length of this vector.
	 */
	length(): number {

		return Math.sqrt( this.x * this.x + this.y * this.y );

	}

	/**
	 * @deprecated Use {@link Vector2#manhattanLength .manhattanLength()} instead.
	 */
	lengthManhattan(): number{ return 0;}

	/**
	 * Computes the Manhattan length of this vector.
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanLength(): number{

		return Math.abs( this.x ) + Math.abs( this.y );

	}

	/**
	 * Normalizes this vector.
	 */
	normalize(): this{

		return this.divideScalar( this.length() || 1 );

	}

	/**
	 * computes the angle in radians with respect to the positive x-axis
	 */
	angle(): number{

		const angle = Math.atan2( - this.y, - this.x ) + Math.PI;

		return angle;

	}

	/**
	 * Computes distance of this vector to v.
	 */
	distanceTo( v: Vector2 ): number{

		return Math.sqrt( this.distanceToSquared( v ) );

	}

	/**
	 * Computes squared distance of this vector to v.
	 */
	distanceToSquared( v: Vector2 ): number{

		const dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;

	}

	/**
	 * @deprecated Use {@link Vector2#manhattanDistanceTo .manhattanDistanceTo()} instead.
	 */
	distanceToManhattan( v: Vector2 ): number{

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

	}

	/**
	 * Computes the Manhattan length (distance) from this vector to the given vector v
	 *
	 * @param {Vector2} v
	 *
	 * @return {number}
	 *
	 * @see {@link http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry}
	 */
	manhattanDistanceTo( v: Vector2 ): number{

		return Math.abs( this.x - v.x ) + Math.abs( this.y - v.y );

	}

	/**
	 * Normalizes this vector and multiplies it by l.
	 */
	setLength( length: number ): this {

		return this.normalize().multiplyScalar( length );

	}

	/**
	 * Linearly interpolates between this vector and v, where alpha is the distance along the line - alpha = 0 will be this vector, and alpha = 1 will be v.
	 * @param v vector to interpolate towards.
	 * @param alpha interpolation factor in the closed interval [0, 1].
	 */
	lerp( v: Vector2, alpha: number ): this{

		this.x += ( v.x - this.x ) * alpha;
		this.y += ( v.y - this.y ) * alpha;

		return this;

	}

	/**
	 * Sets this vector to be the vector linearly interpolated between v1 and v2 where alpha is the distance along the line connecting the two vectors - alpha = 0 will be v1, and alpha = 1 will be v2.
	 * @param v1 the starting vector.
	 * @param v2 vector to interpolate towards.
	 * @param alpha interpolation factor in the closed interval [0, 1].
	 */
	lerpVectors( v1: Vector2, v2: Vector2, alpha: number ): this {

		this.x = v1.x + ( v2.x - v1.x ) * alpha;
		this.y = v1.y + ( v2.y - v1.y ) * alpha;

		return this;

	}

	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals( v: Vector2 ): boolean{

		return ( ( v.x === this.x ) && ( v.y === this.y ) );

	}

	/**
	 * Sets this vector's x and y value from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray( array: number[], offset: number = 0 ): this{

		this.x = array[ offset ];
		this.y = array[ offset + 1 ];

		return this;

	}


	/**
	 * Returns an array [x, y], or copies x and y into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray( array: number[] = [], offset = 0 ): number[]{


		array[ offset ] = this.x;
		array[ offset + 1 ] = this.y;

		return array;


	}
	// toArray( array:Vector2tuple): Vector2tuple{
    //     array[0] = this.x;
	// 	array[1] = this.y;
	// 	return array;
    // }

	/**
	 * Copies x and y into the provided array-like.
	 * @param array array-like to store the vector to.
	 * @param offset (optional) optional offset into the array.
	 * @return The provided array-like.
	 */
	//toArray( array: ArrayLike<number>, offset?: number ): ArrayLike<number>;

	/**
	 * Sets this vector's x and y values from the attribute.
	 * @param attribute the source attribute.
	 * @param index index in the attribute.
	 */
	//fromBufferAttribute( attribute: BufferAttribute, index: number ): this;

	/**
	 * Rotates the vector around center by angle radians.
	 * @param center the point around which to rotate.
	 * @param angle the angle to rotate, in radians.
	 */
	rotateAround( center: Vector2, angle: number ): this{

		const c = Math.cos( angle ), s = Math.sin( angle );

		const x = this.x - center.x;
		const y = this.y - center.y;

		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;

		return this;

	}

	/**
	 * Sets this vector's x and y from Math.random
	 */
	random(): this{

		this.x = Math.random();
		this.y = Math.random();

		return this;

	}

}
