import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import { ActivityIndicator, Text, View } from 'react-native'
import styles from './style'

const MapsScreen = ({ navigation }: any): JSX.Element => {
	const logo = require('../../assets/logoMarker.png')
	const data: Array<Object> = Array()
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
		navigation.addListener('focus', () => {
			fetchRestaurants()

			navigator.geolocation.getCurrentPosition(
				(position: GeolocationPosition) => {
					let latRes = parseFloat(position.coords.latitude.toString())
					let lngRes = parseFloat(
						position.coords.longitude.toString()
					)

					center.lat = latRes
					center.lng = lngRes

					console.log(center)
				}
			)
		})
	}, [navigation])

	const onLoad = React.useCallback(function callback(map: any) {
		const bounds = new window.google.maps.LatLngBounds(center)
		map.fitBounds(bounds)
		setMap(map)

		data.forEach((item: any) => {
			const marker = new window.google.maps.Marker({
				position: item.position,
				map,
				title: item.title
			})
		})
	}, [])

	const onUnmount = React.useCallback(function callback(map: any) {
		setMap(null)
	}, [])

	const fetchRestaurants = async () => {
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

					data.push({
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

				console.table('data', data)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const getLatLong = async (address: string): Promise<void> => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${global.getMapsToken()}`
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
				/* 
				
					onClick={(e) => {
						console.log(e)

						const marker = new global.google.maps.Marker({
							position: e.latLng,
							map: map,
							title: 'Hello World!'
						})

						const infoWindow = new google.maps.InfoWindow()

						// marker.addListener('click', ({ domEvent, latLng }) => {
						// 	const { target } = domEvent

						// 	infoWindow.close()
						// 	infoWindow.setContent('Hello World!')
						// 	infoWindow.open(map, marker)
						// }) // Exibe o text do mark
					}} 
					
				*/
				{...data.map((item: any) => () => (
					<Marker
						key={item.id}
						position={{
							lat: item.latitude,
							lng: item.longitude
						}}
					/>
				))}
			>
				{/* Child components, such as markers, info windows, etc. */}
				<>
					<Marker
						animation={google.maps.Animation.DROP}
						position={center}
						icon={logo}
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
