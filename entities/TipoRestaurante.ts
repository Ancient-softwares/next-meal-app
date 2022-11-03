interface ITipoRestaurante {
	id: number
	categoria: string
}

export class TipoRestaurante implements ITipoRestaurante {
	id: number
	categoria: string
	public _id: number
	public _tipoRestaurante: string

	constructor(
		props: Omit<ITipoRestaurante, 'idTipoRestaurante'>,
		idTipoRestaurante?: number
	) {
		Object.assign(this, props)
	}

	public get getId(): number {
		return this._id
	}

	public get getTipoRestaurante(): string {
		return this._tipoRestaurante
	}

	public set setTipoRestaurante(tipoRestaurante: string) {
		this._tipoRestaurante = tipoRestaurante
	}

	public set setId(id: number) {
		this._id = id
	}

	public destroy(): void {
		this._id = null
		this._tipoRestaurante = null
	}
}
