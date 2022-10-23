import * as dotenv from 'dotenv'
dotenv.config()

declare global {
	// attributes
	var TOKEN: string
	var API_URL: string
	var MAPS_ID: string
	var GOOGLE_MAPS_APIKEY: string
	var constants: any
	var maps: any
	var credentials: any

	// getters
	function getToken(): string
	function getMapsId(): string
	function getMapsToken(): string
	function getApiUrl(): string

	// setters
	function setToken(token: string): void
	function setMapsId(id: string): void
	function setMapsToken(token: string): void
	function setApiUrl(url: string): void

	// functions
	function init(): void
	function isLogged(): boolean
	function getCredentials(): any
	function setCredentials(credentials: any): void

	// interfaces
	interface IMaps {
		id: string
		token: string
	}

	interface ICredentials {
		token: string
		api_url: string
		maps: IMaps
	}

	interface IConstants {
		credentials: ICredentials
	}

	interface IGlobal extends Global {
		constants: IConstants
		credentials: ICredentials
		maps: IMaps
	}
}

// atributos
global.API_URL = process.env.URL || ''
global.MAPS_ID = process.env.MAPS_ID || ''
global.GOOGLE_MAPS_APIKEY = process.env.GOOGLE_MAPS_TOKEN || ''
global.TOKEN = ''

// getters
global.getToken = () => global.TOKEN
global.getMapsId = () => global.MAPS_ID
global.getMapsToken = () => global.GOOGLE_MAPS_APIKEY
global.getApiUrl = () => global.API_URL

// setters
global.setToken = (token: string) => (global.TOKEN = token)
global.setMapsId = (id: string) => (global.MAPS_ID = id)
global.setMapsToken = (token: string) => (global.GOOGLE_MAPS_APIKEY = token)
global.setApiUrl = (url: string) => (global.API_URL = url)

// set global variables
global.setApiUrl('http://127.0.0.1:8000')
global.setMapsId('google-map-script')
global.setMapsToken('AIzaSyCmrE9qeUQP20VEA6AT53UKRDNqbywCvYw')

// functions
global.isLogged = () => global.TOKEN !== ''
