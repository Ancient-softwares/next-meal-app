import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import React from 'react'
import { ActivityIndicator, Platform, Text, View } from 'react-native'
import GetLocation from 'react-native-get-location'
import Geolocation from 'react-native-geolocation-service'
import * as Location from 'expo-location';
import styles from './style'

const MapsScreen = ({ navigation }: any): JSX.Element => {
	const logo = require('../../assets/logoMarker.png')
	const userLogo = require('../../assets/user-marker.png')
	const [markers, setMarkers] = React.useState<Array<Object>>(
		new Array<Object>()
	)
	const [map, setMap] = React.useState<any>(null)
	const [userLocation, setUserLocation] = React.useState<any>({
		lat: -23.5698143,
		lng: -46.4203087
	})
	const { isLoaded } = useJsApiLoader({
		id: global.getMapsId(),
		googleMapsApiKey: global.getMapsToken()
	})

	React.useEffect(() => {
		(async () => {
			if (Platform.OS !== "web") {
			   const { status } = await Location.requestForegroundPermissionsAsync();
			   
			   if (status !== "granted") {
				 window.alert("Insufficient permissions!")
				 return;
			   }
			 }
	   
			 let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, timeInterval: 1000, distanceInterval: 0});
			 console.log(location)
			 setUserLocation({
				lat: location.coords.latitude,
				lng: location.coords.longitude
			 });
			 console.log(userLocation)
		   })();


		navigation.addListener('focus', (): void => {
			// setUserActualLocation()
			// checks if the markers array is empty
			if (markers.length === 0) {
				// if it is, it will get the restaurants from the API
				fetchRestaurants()
			}

			/* navigator.geolocation.watchPosition(
				//console.log(position.coords.latitude) loc do user
				(position: GeolocationPosition) => {
					setUserLocation({
						lat: position.coords.latitude,
						lng: position.coords.longitude
					})
				}
			) */

			/* Geolocation.getCurrentPosition(
				(position) => {
				  const currentLatitude = JSON.stringify(position.coords.latitude);
				  const currentLongitude = JSON.stringify(position.coords.longitude);
				 
				  setUserLocation({
					lat: currentLatitude,
					lng: currentLongitude
				  })
				},
				(error) => alert(error.message),
				{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
			  ); */

			// gets user location with navigator and sets it to the userLocation state
			// setLocation()
		})
	}, [navigation, markers])

	const setLocation = (): void => {
		GetLocation.getCurrentPosition({
			enableHighAccuracy: true,
			timeout: 15000
		})
			.then((location: any) => {
				setUserLocation({
					lat: location.latitude,
					lng: location.longitude
				})
			})
			.catch((error: any) => {
				const { code, message } = error
				console.warn(code, message)
			})
	}

	const setUserActualLocation = (): void => {
		const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${global.getMapsToken()}`

		fetch(url, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				considerIp: true,
				homeMobileCountryCode: 724,
				homeMobileNetworkCode: 310,
				radioType: 'lte',
				cellTowers: [
					{
						cellId: 42,
						locationAreaCode: 415,
						mobileCountryCode: 724,
						mobileNetworkCode: 310,
						age: 0,
						signalStrength: -60,
						ta: 15
					}
				]
			})
		})
			.then((response: any): Promise<JSON> => response.json())
			.then((data: any): void => {
				console.log(data)

				setUserLocation({
					lat: data.location.lat,
					lng: data.location.lng
				})
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
							url: userLogo,
							origin: new window.google.maps.Point(0, 0),
							labelOrigin: new window.google.maps.Point(10, -15)
						}}
						label={{
							text: 'Sua localização',
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

					{navigator.geolocation.watchPosition(
						//console.log(position.coords.latitude) loc do user
						(position: GeolocationPosition) => {
							;<Marker
								icon={{
									url: logo,
									origin: new window.google.maps.Point(0, 0),
									labelOrigin: new window.google.maps.Point(
										10,
										-15
									)
								}}
								position={{
									lat: position.coords.latitude,
									lng: position.coords.longitude
								}}
							/>
						}
					)}
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
