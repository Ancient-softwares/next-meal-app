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
	const center = {
		lat: -23.552990263455296,
		lng: -46.39968223122055
	}

	const { isLoaded } = useJsApiLoader({
		id: global.getMapsId(),
		googleMapsApiKey: global.getMapsToken()
	})

	React.useEffect(() => {
		navigation.addListener('focus', (): void => {
			setMarkers([])
			fetchRestaurants()

			/* markers.forEach((item: any): void => {
				console.log('item', item)

				const marker = new window.google.maps.Marker({
					position: item.position,
					map,
					title: item.title
				})

				marker.addListener('click', () => {
					console.log('marker', marker)

					navigation.navigate('About', {
						restaurant: item
					})
				})
			}) */

			generateMarkers(markers)

			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					adjustUserMarkerLocation(position)
				}
			)
		})
	}, [navigation])

	const adjustUserMarkerLocation = (position: GeolocationPosition): void => {
		let latRes = parseFloat(position.coords.latitude.toString())
		let lngRes = parseFloat(position.coords.longitude.toString())

		center.lat = latRes
		center.lng = lngRes

		console.log('marker', center)
	}

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
			const bounds = new window.google.maps.LatLngBounds(center)
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

					console.log(location)

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
				center={center}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				<>
					<Marker
						animation={google.maps.Animation.DROP}
						position={center}
						icon={logo}
						label={'Sua localização'}
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
