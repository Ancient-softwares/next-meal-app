import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import styles from './style'

const MapsScreen = ({ navigation }: any): JSX.Element => {
	const logo = require('../../assets/logoMarker.png')
	const [markers, setMarkers] = React.useState<Array<Object>>(
		new Array<Object>()
	)
	const [map, setMap] = React.useState<any>(null)
	const [userLocation, setUserLocation] = React.useState<any>({
		lat: -23.552990263455296,
		lng: -46.39968223122055
	})

	const { isLoaded } = useJsApiLoader({
		id: global.getMapsId(),
		googleMapsApiKey: global.getMapsToken()
	})

	React.useEffect(() => {
		navigation.addListener('focus', (): void => {
			// checks if the markers array is empty
			if (markers.length === 0) {
				// if it is, it will get the restaurants from the API
				fetchRestaurants()
			}

			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					/* const userLocation = adjustUserMarkerLocation(position)
					console.log('show', userLocation) */
				}
			)

			navigator.geolocation.watchPosition(
				(position: GeolocationPosition) => {
					/* const userLocation = adjustUserMarkerLocation(position)
					console.log('show', userLocation) */
				}
			)
		})
	}, [navigation, markers])

	const adjustUserMarkerLocation = (position: GeolocationPosition) => {
		let lat = position.coords.latitude
		let lng = position.coords.longitude

		return { lat, lng }
	}

	const watchId = navigator.geolocation.watchPosition(
		(position: GeolocationPosition) => console.log(position)
	)

	const generateMarkers = (restaurants: Array<Object>): void => {
		console.log('restaurants', restaurants)

		restaurants.forEach((item: any): void => {
			console.log('item', item)

			const marker = {
				position: {
					lat: item.latitude,
					lng: item.longitude
				},
				title: item.nomeRestaurante,
				restaurant: item
			}

			setMarkers((prev: any): any => [...prev, marker])
		})
	}

	const onLoad = React.useCallback(
		function callback(map: any): void {
			const bounds = new window.google.maps.LatLngBounds(userLocation)
			map.fitBounds(bounds)
			setMap(map)

			const listener = window.google.maps.event.addListener(
				map,
				'idle',
				() => {
					if (map.getZoom() > 16) map.setZoom(16)
					else if (map.getZoom() < 10) map.setZoom(10)
					window.google.maps.event.removeListener(listener)
				}
			)
		},
		[markers]
	)

	const onUnmount = React.useCallback((map: any): void => {
		setMap(null)
	}, [])

	const fetchRestaurants = async (): Promise<void> => {
		setMarkers([])
		console.log('now', markers + ' - ' + markers.length)

		try {
			await fetch(`${global.getApiUrl()}/api/restaurantes`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
				.then((response) => response.json())
				.then((json) => {
					Object.keys(json).forEach(async (key: string) => {
						const response = await fetch(
							`https://maps.googleapis.com/maps/api/geocode/json?address=${
								json[key].cepRestaurante
							}&key=${global.getMapsToken()}`
						)
						const result = await response.json()
						const location = result.results[0].geometry.location

						const markerIcon = {
							url: logo,
							origin: new window.google.maps.Point(0, 0),
							labelOrigin: new window.google.maps.Point(10, -15)
						}

						const marker = {
							position: {
								lat: location.lat,
								lng: location.lng
							},
							label: json[key].nomeRestaurante,
							restaurant: json[key],
							icon: markerIcon
						}

						console.log(marker)

						// adds onclick event to marker
						marker.restaurant.onClick = () => {
							let param: any = marker.restaurant

							navigation.navigate('About', {
								...param
							})
						}

						marker.label = {
							text: marker.restaurant.nomeRestaurante,
							color: '#963333',
							fontSize: '18px',
							fontWeight: 'bold',
							fontFamily: 'Roboto',
							backgroundColor: '#fff'
						}

						// renders marker
						setMarkers((prev: any): any => [...prev, marker])

						markers.push({
							id: json[key].idRestaurante,
							name: json[key].nomeRestaurante,
							cep: json[key].cepRestaurante,
							bairro: json[key].bairroRestaurante,
							cidade: json[key].cidadeRestaurante,
							estado: json[key].estadoRestaurante,
							latitude: location.lat,
							longitude: location.lng,
							country: 'Brasil'
						})
					})
				})
				.catch((error) => {
					console.error(error)
				})
		} catch (error) {
			console.log(error)
		}
	}

	const getLatitudeLongitudeByCep = async (cep: string): Promise<void> => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${global.getMapsToken()}`
		)
		const result = await response.json()
		const location = result.results[0].geometry.location

		console.log(location)

		return result.results[0].geometry.location
	}

	return isLoaded ? (
		<View style={styles.container}>
			<GoogleMap
				mapContainerStyle={{
					width: '100%',
					height: '100%'
				}}
				center={userLocation}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				{/* Looping through the array rendering all markers */}
				{markers.map((marker: any, index: number) => (
					<Marker
						animation={google.maps.Animation.DROP}
						key={index}
						icon={marker.icon}
						position={marker.position}
						label={marker.label}
						onClick={marker.restaurant.onClick}
					/>
				))}

				<>
					<Marker
						animation={google.maps.Animation.DROP}
						position={userLocation}
						icon={{
							url: logo,
							origin: new window.google.maps.Point(0, 0),
							labelOrigin: new window.google.maps.Point(10, -15)
						}}
						label={{
							text: 'Você está aqui',
							color: '#963333',
							fontSize: '18px',
							fontWeight: 'bold',
							fontFamily: 'Roboto'
						}}
						onClick={() => navigation.navigate('Profile')}
					>
						<View>
							<Text></Text>
						</View>
					</Marker>
				</>
			</GoogleMap>
		</View>
	) : (
		<ActivityIndicator
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center'
			}}
		/>
	)
}

export default MapsScreen
