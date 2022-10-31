interface IRestaurante {
	idRestaurante: number
	nomeRestaurante: string
	telRestaurante: string
	emailRestaurante: string
	cepRestaurante: string
	ruaRestaurante: string
	numRestaurante: string
	bairroRestaurante: string
	fotoRestaurante: string
	cidadeRestaurante: string
	estadoRestaurante: string
	horarioAberturaRestaurante: Date
	horarioFechamentoRestaurante: Date
	capacidadeRestaurante: number
	ocupacaoRestaurante: number
	descricaoRestaurante: string
	tipoRestaurante: string
	avaliacaoRestaurante: number
}

export class Restaurante {
	public readonly _idRestaurante: number
	public readonly _nomeRestaurante: string
	public readonly _telRestaurante: string
	public readonly _emailRestaurante: string
	public readonly _cepRestaurante: string
	public readonly _ruaRestaurante: string
	public readonly _numRestaurante: string
	public readonly _bairroRestaurante: string
	public readonly _fotoRestaurante: string
	public readonly _cidadeRestaurante: string
	public readonly _estadoRestaurante: string
	public readonly _horarioAberturaRestaurante: Date
	public readonly _horarioFechamentoRestaurante: Date
	public readonly _capacidadeRestaurante: number
	public readonly _ocupacaoRestaurante: number
	public readonly _descricaoRestaurante: string
	public readonly _tipoRestaurante: string
	public readonly _avaliacaoRestaurante: number

	constructor(
		props: Omit<IRestaurante, "idRestaurante">,
		idRestaurante?: number
	) {
		Object.assign(this, props)
	}

	public get getIdRestaurante(): number {
		return this._idRestaurante
	}

	public get getNomeRestaurante(): string {
		return this._nomeRestaurante
	}

	public get getTelRestaurante(): string {
		return this._telRestaurante
	}

	public get getFotoRestaurante(): string {
		return this._fotoRestaurante
	}

	public get getEmailRestaurante(): string {
		return this._emailRestaurante
	}

	public get getCepRestaurante(): string {
		return this._cepRestaurante
	}

	public get getRuaRestaurante(): string {
		return this._ruaRestaurante
	}

	public get getNumRestaurante(): string {
		return this._numRestaurante
	}

	public get getBairroRestaurante(): string {
		return this._bairroRestaurante
	}

	public get getCidadeRestaurante(): string {
		return this._cidadeRestaurante
	}

	public get getEstadoRestaurante(): string {
		return this._estadoRestaurante
	}

	public get getHorarioAberturaRestaurante(): Date {
		return this._horarioAberturaRestaurante
	}

	public get getHorarioFechamentoRestaurante(): Date {
		return this._horarioFechamentoRestaurante
	}

	public get getCapacidadeRestaurante(): number {
		return this._capacidadeRestaurante
	}

	public get getOcupacaoRestaurante(): number {
		return this._ocupacaoRestaurante
	}

	public get getDescricaoRestaurante(): string {
		return this._descricaoRestaurante
	}

	public get getTipoRestaurante(): string {
		return this._tipoRestaurante
	}

	public get getAvaliacaoRestaurante(): number {
		return this._avaliacaoRestaurante
	}

	public destroy(baseObject: Object, refName: string): void {
		delete baseObject[refName]
	}
}
