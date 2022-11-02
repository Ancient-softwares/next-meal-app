import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import styles from './style'

export default function MapsScreen() {
	const data: Array<Object> = Array()
	const [map, setMap] = React.useState(null)
	const center = {
		lat: -23.552990263455296,
		lng: -46.39968223122055
	}

	const { isLoaded } = useJsApiLoader({
		id: global.getMapsId(),
		googleMapsApiKey: global.getMapsToken()
	})

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
				console.table(json)

				/* json.forEach((element: any) => {
					data.push({
						id: element.idRestaurante,
						name: element.nomeRestaurante,
						cep: element.cepRestaurante,
						bairro: element.bairroRestaurante,
						cidade: element.cidadeRestaurante,
						estado: element.estadoRestaurante,
						country: "Brasil"
					})

					getLatLong(element.cep, element.id)
				}) */

				Object.keys(json).forEach((key: string) => {
					data.push({
						id: json[key].idRestaurante,
						name: json[key].nomeRestaurante,
						cep: json[key].cepRestaurante,
						bairro: json[key].bairroRestaurante,
						cidade: json[key].cidadeRestaurante,
						estado: json[key].estadoRestaurante,
						country: 'Brasil'
					})
				})

				console.table(data)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const getLatLong = async (address: string, id: number) => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${global.getMapsToken()}`
		)
		const result = await response.json()
		data[id - 1] = {
			...data[id - 1],
			lat: result.results[0].geometry.location.lat,
			lng: result.results[0].geometry.location.lng
		}

		return result.results[0].geometry.location
	}

	React.useEffect(() => {
		fetchRestaurants()
	}, [])

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
				onClick={(e) => {
					console.log(e)

					const marker = new global.google.maps.Marker({
						position: e.latLng,
						map: map,
						title: 'Hello World!'
					})

					const infoWindow = new google.maps.InfoWindow()

					marker.addListener('click', ({ domEvent, latLng }) => {
						const { target } = domEvent

						infoWindow.close()
						infoWindow.setContent('Hello World!')
						infoWindow.open(map, marker)
					})
				}}
				{...data.map((item: any) => () => (
					<Marker
						key={item.id}
						position={{
							lat: item.lat,
							lng: item.lng
						}}
						title={item.name}
					/>
				))}
			>
				{/* Child components, such as markers, info windows, etc. */}
				<>
					<Marker
						label={'Teste'}
						position={center}
						onClick={() => window.alert('teste')}
					/>
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
