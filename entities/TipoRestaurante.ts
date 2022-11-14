interface ITipoRestaurante {
	id: number
	categoria: string
}

export class TipoRestaurante implements ITipoRestaurante {
	id: number
	categoria: string
	public static _id: number
	public static _tipoRestaurante: string

	constructor(
		props: Omit<ITipoRestaurante, 'idTipoRestaurante'>,
		idTipoRestaurante?: number
	) {
		Object.assign(this, props)
	}

	public static get getId(): number {
		return this._id
	}

	public static get getTipoRestaurante(): string {
		return this._tipoRestaurante
	}

	public static set setTipoRestaurante(tipoRestaurante: string) {
		this._tipoRestaurante = tipoRestaurante
	}

	public static set setId(id: number) {
		this._id = id
	}

	public static destroy(): void {
		this._id = null
		this._tipoRestaurante = null
	}
}
