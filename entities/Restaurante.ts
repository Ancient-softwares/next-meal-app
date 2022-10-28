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
	private readonly _idRestaurante: number
	private readonly _nomeRestaurante: string
	private readonly _telRestaurante: string
	private readonly _emailRestaurante: string
	private readonly _cepRestaurante: string
	private readonly _ruaRestaurante: string
	private readonly _numRestaurante: string
	private readonly _bairroRestaurante: string
	private readonly _fotoRestaurante: string
	private readonly _cidadeRestaurante: string
	private readonly _estadoRestaurante: string
	private readonly _horarioAberturaRestaurante: Date
	private readonly _horarioFechamentoRestaurante: Date
	private readonly _capacidadeRestaurante: number
	private readonly _ocupacaoRestaurante: number
	private readonly _descricaoRestaurante: string
	private readonly _tipoRestaurante: string
	private readonly _avaliacaoRestaurante: number

	constructor(
		props: Omit<IRestaurante, 'idRestaurante'>,
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
