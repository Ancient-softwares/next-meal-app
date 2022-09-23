import * as dotenv from 'dotenv';
dotenv.config()

const API_URL = process.env.URL || 'http://127.0.0.1:8000'
const MAPS_ID = process.env.MAPS_ID || 'google-map-script'
const GOOGLE_MAPS_APIKEY = process.env.GOOGLE_MAPS_TOKEN ||'AIzaSyCmrE9qeUQP20VEA6AT53UKRDNqbywCvYw'

export { API_URL, MAPS_ID, GOOGLE_MAPS_APIKEY }