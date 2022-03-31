type ColorTuple = [number, number, number, number];

const _colorKeywords = {
	'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF, 'aquamarine': 0x7FFFD4, 'azure': 0xF0FFFF,
	'beige': 0xF5F5DC, 'bisque': 0xFFE4C4, 'black': 0x000000, 'blanchedalmond': 0xFFEBCD, 'blue': 0x0000FF, 'blueviolet': 0x8A2BE2,
	'brown': 0xA52A2A, 'burlywood': 0xDEB887, 'cadetblue': 0x5F9EA0, 'chartreuse': 0x7FFF00, 'chocolate': 0xD2691E, 'coral': 0xFF7F50,
	'cornflowerblue': 0x6495ED, 'cornsilk': 0xFFF8DC, 'crimson': 0xDC143C, 'cyan': 0x00FFFF, 'darkblue': 0x00008B, 'darkcyan': 0x008B8B,
	'darkgoldenrod': 0xB8860B, 'darkgray': 0xA9A9A9, 'darkgreen': 0x006400, 'darkgrey': 0xA9A9A9, 'darkkhaki': 0xBDB76B, 'darkmagenta': 0x8B008B,
	'darkolivegreen': 0x556B2F, 'darkorange': 0xFF8C00, 'darkorchid': 0x9932CC, 'darkred': 0x8B0000, 'darksalmon': 0xE9967A, 'darkseagreen': 0x8FBC8F,
	'darkslateblue': 0x483D8B, 'darkslategray': 0x2F4F4F, 'darkslategrey': 0x2F4F4F, 'darkturquoise': 0x00CED1, 'darkviolet': 0x9400D3,
	'deeppink': 0xFF1493, 'deepskyblue': 0x00BFFF, 'dimgray': 0x696969, 'dimgrey': 0x696969, 'dodgerblue': 0x1E90FF, 'firebrick': 0xB22222,
	'floralwhite': 0xFFFAF0, 'forestgreen': 0x228B22, 'fuchsia': 0xFF00FF, 'gainsboro': 0xDCDCDC, 'ghostwhite': 0xF8F8FF, 'gold': 0xFFD700,
	'goldenrod': 0xDAA520, 'gray': 0x808080, 'green': 0x008000, 'greenyellow': 0xADFF2F, 'grey': 0x808080, 'honeydew': 0xF0FFF0, 'hotpink': 0xFF69B4,
	'indianred': 0xCD5C5C, 'indigo': 0x4B0082, 'ivory': 0xFFFFF0, 'khaki': 0xF0E68C, 'lavender': 0xE6E6FA, 'lavenderblush': 0xFFF0F5, 'lawngreen': 0x7CFC00,
	'lemonchiffon': 0xFFFACD, 'lightblue': 0xADD8E6, 'lightcoral': 0xF08080, 'lightcyan': 0xE0FFFF, 'lightgoldenrodyellow': 0xFAFAD2, 'lightgray': 0xD3D3D3,
	'lightgreen': 0x90EE90, 'lightgrey': 0xD3D3D3, 'lightpink': 0xFFB6C1, 'lightsalmon': 0xFFA07A, 'lightseagreen': 0x20B2AA, 'lightskyblue': 0x87CEFA,
	'lightslategray': 0x778899, 'lightslategrey': 0x778899, 'lightsteelblue': 0xB0C4DE, 'lightyellow': 0xFFFFE0, 'lime': 0x00FF00, 'limegreen': 0x32CD32,
	'linen': 0xFAF0E6, 'magenta': 0xFF00FF, 'maroon': 0x800000, 'mediumaquamarine': 0x66CDAA, 'mediumblue': 0x0000CD, 'mediumorchid': 0xBA55D3,
	'mediumpurple': 0x9370DB, 'mediumseagreen': 0x3CB371, 'mediumslateblue': 0x7B68EE, 'mediumspringgreen': 0x00FA9A, 'mediumturquoise': 0x48D1CC,
	'mediumvioletred': 0xC71585, 'midnightblue': 0x191970, 'mintcream': 0xF5FFFA, 'mistyrose': 0xFFE4E1, 'moccasin': 0xFFE4B5, 'navajowhite': 0xFFDEAD,
	'navy': 0x000080, 'oldlace': 0xFDF5E6, 'olive': 0x808000, 'olivedrab': 0x6B8E23, 'orange': 0xFFA500, 'orangered': 0xFF4500, 'orchid': 0xDA70D6,
	'palegoldenrod': 0xEEE8AA, 'palegreen': 0x98FB98, 'paleturquoise': 0xAFEEEE, 'palevioletred': 0xDB7093, 'papayawhip': 0xFFEFD5, 'peachpuff': 0xFFDAB9,
	'peru': 0xCD853F, 'pink': 0xFFC0CB, 'plum': 0xDDA0DD, 'powderblue': 0xB0E0E6, 'purple': 0x800080, 'rebeccapurple': 0x663399, 'red': 0xFF0000, 'rosybrown': 0xBC8F8F,
	'royalblue': 0x4169E1, 'saddlebrown': 0x8B4513, 'salmon': 0xFA8072, 'sandybrown': 0xF4A460, 'seagreen': 0x2E8B57, 'seashell': 0xFFF5EE,
	'sienna': 0xA0522D, 'silver': 0xC0C0C0, 'skyblue': 0x87CEEB, 'slateblue': 0x6A5ACD, 'slategray': 0x708090, 'slategrey': 0x708090, 'snow': 0xFFFAFA,
	'springgreen': 0x00FF7F, 'steelblue': 0x4682B4, 'tan': 0xD2B48C, 'teal': 0x008080, 'thistle': 0xD8BFD8, 'tomato': 0xFF6347, 'turquoise': 0x40E0D0,
	'violet': 0xEE82EE, 'wheat': 0xF5DEB3, 'white': 0xFFFFFF, 'whitesmoke': 0xF5F5F5, 'yellow': 0xFFFF00, 'yellowgreen': 0x9ACD32
};

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
export class Color {

	constructor(value: null | Color | number | string = null, g?: number, b?: number, a: number = 1) {
		//  r: number = 1, g: number = 1, b: number = 1, a: number = 1) {
		if (value===null) {
			// default
			this.elements = [1, 1, 1, 1];
		} else {
			if (typeof value == "number" && (g != undefined)) {
				this.elements = [value, g, b, a];
			}else{
				this.elements = [1, 1, 1, 1];//Initialzile elements
				this.set(value);
			}
		}
		//this.elements = [value, g, b, a];
	}
	elements: number[];

	/**
	 * @default 0
	 */
	get r(): number {
		return this.elements[0];
	}

	set r(value: number) {
		this.elements[0] = value;
	}

	get g(): number {
		return this.elements[1];
	}

	set g(value: number) {
		this.elements[1] = value;
	}

	get b(): number {
		return this.elements[2];
	}

	set b(value: number) {
		this.elements[2] = value;
	}

	get a(): number {
		return this.elements[3];
	}

	set a(value: number) {
		this.elements[3] = value;
	}

	readonly isColor: true;

	set(value: Color | string | number): this {
		if (value && value instanceof Color) {
			this.copy(value);
		} else {
			if (typeof value == "number") {
				this.setHex(value);
			} else {
				if (typeof value == "string") {
					this.setString(value);
				}
			}
		}
		return this;
	}

	/**
	 * Sets value of Color value by RGBA
	 */
	setRGBA(r: number, b: number, g: number, a: number): this {

		if (a === undefined) a = this.a; // sprite.scale.set(x,y)

		this.r = r;
		this.g = g;
		this.b = b;
		this.a = a;

		return this;

	}

	setString(value: string): this {

		if(_colorKeywords[value]){
			this.setHex(_colorKeywords[value]);
		}else{
			console.warn("unknow color:"+value);
		}
		return this;
	}

	setHex(hex: number, balpha: boolean = false): this {

		hex = Math.floor(hex);

		if (hex > 0xffffff || balpha) {
			this.r = (hex >> 24 & 255) / 255;
			this.g = (hex >> 16 & 255) / 255;
			this.b = (hex >> 8 & 255) / 255;
			this.a = (hex >> 0 & 255) / 255;
		} else {
			this.r = (hex >> 16 & 255) / 255;
			this.g = (hex >> 8 & 255) / 255;
			this.b = (hex >> 0 & 255) / 255;
		}
		return this;

	}

	getHex(): number {

		return (this.r * 255) << 24 ^ (this.g * 255) << 16 ^ (this.b * 255) << 8 ^ (this.a * 255);

	}

	addScalar( s:number ):this {

		this.r += s;
		this.g += s;
		this.b += s;

		return this;

	}

	multiply( color:Color ):this {

		this.r *= color.r;
		this.g *= color.g;
		this.b *= color.b;

		return this;

	}

	multiplyScalar( s:number ):this {

		this.r *= s;
		this.g *= s;
		this.b *= s;

		return this;

	}


	/**
	 * Sets all values of this color.
	 */
	setGray(scalar: number, a: number = 1): this {

		this.r = scalar;
		this.g = scalar;
		this.b = scalar;
		this.a = a;
		return this;

	}

	setComponent(index: number, value: number): this {

		switch (index) {

			case 0: this.r = value; break;
			case 1: this.g = value; break;
			case 2: this.b = value; break;
			case 3: this.a = value; break;
			default: throw new Error('index is out of range: ' + index);

		}

		return this;

	}

	getComponent(index: number): number {

		switch (index) {

			case 0: return this.r;
			case 1: return this.g;
			case 2: return this.b;
			case 3: return this.a;
			default: throw new Error('index is out of range: ' + index);

		}

	}

	/**
	 * Clones this vector.
	 */
	clone(): Color {
		return new Color().copy(this);

		//return new this.constructor( this.x, this.y, this.z );
	}


	/**
	 * Copies value of v to this vector.
	 */
	copy(v: Color): this {

		this.r = v.r;
		this.g = v.g;
		this.b = v.b;
		this.a = v.a;
		return this;

	}

	/**
	 * Adds v to this vector.
	 */
	add(v: Color): this {


		this.r += v.r * v.a;
		this.g += v.g * v.a;
		this.b += v.b * v.a;

		return this;

	}

	/**
	 * Sets this vector to a + b.
	 */
	addColors(a: Color, b: Color): this {

		this.r = a.r * a.a + b.r * b.a;

		this.g = a.g * a.a + b.g * b.a;

		this.b = a.b * a.a + b.b * b.a;

		return this;

	}

	/**
	 * Subtracts v from this vector.
	 */
	sub(v: Color): this {
		this.r -= v.r * v.a;
		this.g -= v.g * v.a;
		this.b -= v.b * v.a;
		return this;

	}

	lerp(v: Color, alpha: number): this {

		this.r += (v.r - this.r) * alpha;
		this.g += (v.g - this.g) * alpha;
		this.b += (v.b - this.b) * alpha;
		this.a += (v.a - this.a) * alpha;

		return this;

	}

	lerpVectors(v1: Color, v2: Color, alpha: number): this {

		this.r = v1.r + (v2.r - v1.r) * alpha;
		this.g = v1.g + (v2.g - v1.g) * alpha;
		this.b = v1.b + (v2.b - v1.b) * alpha;
		this.a = v1.a + (v2.a - v1.a) * alpha;

		return this;

	}
	/**
	 * Checks for strict equality of this vector and v.
	 */
	equals(v: Color): boolean {

		return ((v.r === this.r) && (v.g === this.g) && (v.b === this.b) && (v.a === this.a));

	}

	/**
	 * Sets this vector's x, y and z value from the provided array.
	 * @param array the source array.
	 * @param offset (optional) offset into the array. Default is 0.
	 */
	fromArray(array: number[], offset?: number): this {

		this.r = array[offset];
		this.g = array[offset + 1];
		this.b = array[offset + 2];
		this.a = array[offset + 3];
		return this;

	}

	/**
	 * Sets this color RGBA value from the provided array-like.
	 * @param array the source array-like.
	 * @param offset (optional) offset into the array-like. Default is 0.
	 */
	//fromArray( array: ArrayLike<number>, offset?: number ): this;

	/**
	 * Returns an array [r, g, b , a], or copies RGBA into the provided array.
	 * @param array (optional) array to store the vector to. If this is not provided, a new array will be created.
	 * @param offset (optional) optional offset into the array.
	 * @return The created or provided array.
	 */
	toArray(array: number[] = [], offset: number = 0): number[] {

		array[offset] = this.r;
		array[offset + 1] = this.g;
		array[offset + 2] = this.b;
		array[offset + 3] = this.a;

		return array;
	}

	random(): this {

		this.r = Math.random();
		this.g = Math.random();
		this.b = Math.random();
		this.a = Math.random();
		return this;

	}

}

//const _vector = /*@__PURE__*/ new Vector3();
//const _quaternion = /*@__PURE__*/ new Quaternion();

