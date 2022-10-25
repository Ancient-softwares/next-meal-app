import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import { Text, View } from 'react-native'
import styles from './style'

export default function MapsScreen() {
	const center = {
		lat: -23.552990263455296,
		lng: -46.39968223122055,
	}

	const { isLoaded } = useJsApiLoader({
		id: global.getMapsId(),
		googleMapsApiKey: global.getMapsToken(),
	})

	const [map, setMap] = React.useState(null)

	const onLoad = React.useCallback(function callback(map: any) {
		const bounds = new window.google.maps.LatLngBounds(center)
		map.fitBounds(bounds)
		setMap(map)
	}, [])

	const onUnmount = React.useCallback(function callback(map: any) {
		setMap(null)
	}, [])

	return isLoaded ? (
		<View style={styles.container}>
			<GoogleMap
				mapContainerStyle={{
					width: '100%',
					height: '100%',
				}}
				center={center}
				zoom={10}
				onLoad={onLoad}
				onUnmount={onUnmount}
			>
				<></>
			</GoogleMap>
		</View>
	) : (
		<View>
			<Text>Oops</Text>
		</View>
	)
}
