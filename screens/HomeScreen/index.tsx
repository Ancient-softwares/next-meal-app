import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import React from 'react'
import { Carousel, Stack } from 'react-bootstrap'
import {
	ActivityIndicator,
	Alert,
	Dimensions,
	FlatList,
	Platform,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	View
} from 'react-native'
import 'react-native-gesture-handler'
import '../../constants/globals'
import styles from './style'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
})

const HomeScreen = ({ navigation }: any): JSX.Element => {
	const exampleImage: string = require('../../assets/example.jpeg')
	const carousel01 = require('../../assets/Carousel/Carroca01.jpg')
	const carousel02 = require('../../assets/Carousel/Carroca02.jpg')
	const carousel03 = require('../../assets/Carousel/Carroca03.jpg')

	const categoria01 = require('../../assets/categoria/bistro.jpg')
	const categoria02 = require('../../assets/categoria/Fast food.jpg')

	let DATA: Array<Object> = Array<any>()
	const [filteredDataSource, setFilteredDataSource] = React.useState<
		Array<Object>
	>([])
	const [masterDataSource, setMasterDataSource] =
		React.useState<Array<Object>>(DATA)
	const [popular, setPopular] = React.useState<Array<Object>>([])
	const [melhores, setMelhores] = React.useState<Array<Object>>([])
	const [isLoading, setLoading] = React.useState<boolean>(true)
	const [refresh, setRefresh] = React.useState<boolean>(false)
	const [uniqueValue, setUniqueValue] = React.useState<number>(1)
	const [expoPushToken, setExpoPushToken] = React.useState('')
	const [notification, setNotification] = React.useState(false)
	const notificationListener = React.useRef<any>()
	const responseListener = React.useRef<any>()

	React.useEffect(() => {
		navigation.addListener('focus', (): void => {
			refreshScreen()
			forceRemount()

			try {
				if (global.isLogged) {
					if (global.user.id != null) {
						checkNotifications()
					}
				}
			} catch (err) {
				console.log(err)
			}

			if (Platform.OS === 'android' || Platform.OS === 'ios') {
				handleNotification()
			}
		})
	}, [navigation, global.isLogged])

	const handleNotification = () => {
		registerForPushNotificationsAsync().then((token: any) =>
			setExpoPushToken(token)
		)

		// This listener is fired whenever a notification is received while the app is foregrounded
		notificationListener.current =
			Notifications.addNotificationReceivedListener(
				(notification: any) => {
					setNotification(notification)
				}
			)

		// This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response)
				}
			)

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			)
			Notifications.removeNotificationSubscription(
				responseListener.current
			)
		}
	}

	// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
	const sendPushNotification = async (expoPushToken: any): Promise<void> => {
		const message = {
			to: expoPushToken,
			sound: 'default',
			title: 'Original Title',
			body: 'And here is the body!',
			data: { someData: 'goes here' }
		}

		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		})
	}

	const registerForPushNotificationsAsync = async (): Promise<void> => {
		let token: any

		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync()
			let finalStatus = existingStatus
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync()
				finalStatus = status
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!')
				return
			}
			token = (await Notifications.getExpoPushTokenAsync()).data
		} else {
			alert('Must use physical device for Push Notifications')
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: '#FF231F7C'
			})
		}

		return token
	}

	const checkNotifications = async (): Promise<void> => {
		// sends a notification to the user
		// await sendPushNotification(expoPushToken)

		await fetch(`${global.getApiUrl()}/api/checkNotifications`, {
			method: 'POST',
			headers: new Headers({
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				idCliente: global.user.id
			})
		})
			.then((response) => response.json())
			.then((json) => {
				if (json.status) {
					window.alert(json.message)

					Alert.alert(
						'Notificação',
						json.message,
						[
							{
								text: 'Ok',
								onPress: () => {
									console.log('OK Pressed')
								}
							}
						],
						{ cancelable: false }
					)
				} else {
					console.log(json.message)
				}
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const refreshScreen = (): void => {
		getRestaurant()
		getPopular()
		getMelhores()
	}

	const forceRemount = (): void => {
		setUniqueValue(uniqueValue + 1)
	}

	const getRestaurant = async () => {
		setFilteredDataSource([])
		setMasterDataSource([])
		DATA = []

		try {
			await fetch(`${global.getApiUrl()}/api/restaurantes`, {
				method: 'get',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
				.then((response: any): Promise<JSON> => response.json())
				.then((json: any): void => {
					Object.keys(json).forEach((key: string) => {
						DATA.push(json[key])
					})

					setFilteredDataSource(DATA)
					setMasterDataSource(DATA)
				})
				.catch((err: Error): void => console.error(err))
		} catch (error: unknown) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const getPopular = async () => {
		setPopular([])

		try {
			await fetch(
				`${global.getApiUrl()}/api/getRestaurantesMaisReservados`,
				{
					method: 'post',
					headers: new Headers({
						'Content-Type': 'application/json',
						Accept: 'application/json'
					}),
					body: JSON.stringify({
						limite: 3
					})
				}
			)
				.then((response: any): Promise<JSON> => response.json())
				.then((json: any): void => {
					setPopular(json.data)
				})
				.catch((err: Error): void => console.error(err))
		} catch (error: unknown) {
			console.error(error)
		} finally {
			setLoading(false)
			setRefresh(false)
		}
	}

	const getMelhores = async () => {
		setMelhores([])

		try {
			await fetch(
				`${global.getApiUrl()}/api/getRestaurantesMelhoresAvaliados`,
				{
					method: 'post',
					headers: new Headers({
						'Content-Type': 'application/json',
						Accept: 'application/json'
					}),
					body: JSON.stringify({
						limite: 3
					})
				}
			)
				.then((response: any): Promise<JSON> => response.json())
				.then((json: any): void => {
					setMelhores(json.data)
				})
				.catch((err: Error): void => console.error(err))
		} catch (error: unknown) {
			console.error(error)
		} finally {
			setLoading(false)
			setRefresh(false)
		}
	}

	const onPressRestaurant = (item: any) => {
		let params = []

		filteredDataSource.forEach((element: any) => {
			if (element.idRestaurante === item.idRestaurante) {
				params = element

				navigation.navigate('About', {
					...params
				})

				return
			}
		})
	}

	const onPressCategory = (item: any) => {
		if (item[0].item.tipoRestaurante === null) {
			navigation.navigate('Restaurants')
		} else {
			global.tipoRestaurante = item[0].item.tipoRestaurante

			// first save the categoria
			navigation.navigate('Category', {
				tipoRestaurante: global.tipoRestaurante
			})
		}
	}

	const Item = (...item: any[]): JSX.Element => {
		return (
			<View style={styles.spaceCategory}>
				<img
					src={categoria01}
					onClick={() => onPressCategory(item)}
					className='rounded-circle'
					style={{
						width: 90,
						height: 90,
						marginLeft: 10,
						marginRight: 10
					}}
				/>
				<Text style={styles.nameCategory}>
					{item[0].item.tipoRestaurante || 'did not return'}
				</Text>
			</View>
		)
	}

	const Component = (...item: any[]): JSX.Element => {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					marginTop: '2.5%'
				}}
				onTouchStart={() => onPressRestaurant(item[0].item)}
			>
				<Stack
					direction='horizontal'
					gap={2}
					style={{ marginLeft: 96 }}
				>
					<div style={styles.PositionImgRestaurant}>
						<img
							src={exampleImage}
							className='rounded-circle'
							style={{
								width: 100,
								height: 100,
								marginLeft: 25,
								marginRight: 10
							}}
						/>
					</div>
					<div>
						<Text style={styles.subtitle}>
							{item[0].item.nomeRestaurante}
						</Text>
						<br />
						{(item[0].item.media !== null && (
							<>
								{item[0].item.total ? (
									<Text style={styles.description}>
										Total de reservas: {item[0].item.total}
									</Text>
								) : (
									<Text style={styles.description}>
										Total de avaliações:{' '}
										{item[0].item.notas}
									</Text>
								)}
							</>
						)) || (
								<Text style={styles.description}>
									Total de avaliações: {item[0].item.notas}
								</Text>
							)}
						<br />
						{item[0].item.media !== null ? (
							<>
								<Text style={styles.description}>
									Media de avaliações: {item[0].item.media}
								</Text>
								<br />
							</>
						) : (
							<></>
						)}
					</div>
				</Stack>
			</View>
		)
	}

	const renderItem = (item: any): JSX.Element => {
		return <Item {...item} />
	}

	const renderComponent = (item: any): JSX.Element => {
		return <Component {...item} />
	}

	return (
		<SafeAreaView style={styles.container} key={uniqueValue}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.carousel}>
					<Carousel>
						<Carousel.Item interval={6000}>
							<img
								className='d-block w-100'
								src={carousel01}
								alt='First slide'
								style={styles.carousel}
							/>
							<Carousel.Caption>
								<h3>Veja os restaurantes perto de você.</h3>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={6000}>
							<img
								className='d-block w-100'
								src={carousel02}
								alt='Second slide'
								style={styles.carousel}
							/>

							<Carousel.Caption>
								<h3>Economize tempo ao reservar.</h3>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={6000}>
							<img
								className='d-block w-100'
								src={carousel03}
								alt='Third slide'
								style={styles.carousel}
							/>

							<Carousel.Caption>
								<h3>Visualizar o cardápio dos restaurantes.</h3>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</View>

				<View>
					<Text style={styles.subtitle}>Categorias</Text>
					<Text style={styles.description}>
						Escolha entre as categorias de restaurantes
					</Text>
				</View>
				<View
					style={{
						width: 'auto',
						maxWidth: Dimensions.get('screen').width
					}}
				>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<FlatList
							data={filteredDataSource}
							renderItem={renderItem}
							keyExtractor={(item: any) => item.idRestaurante}
							scrollEnabled={true}
							horizontal={true}
							showsVerticalScrollIndicator={false}
						/>
					</ScrollView>
					<hr style={styles.lineStyle} />
				</View>
				{(popular.length > 0 && (
					<View
						style={{
							marginTop: 15
						}}
					>
						<Text style={[styles.subtitle]}>
							Restaurantes mais populares
						</Text>
						<Text style={styles.description}>
							Os restaurantes mais populares do nosso app
						</Text>
						<br />
						<FlatList
							style={{
								marginTop: -10,
								marginBottom: 10
							}}
							data={popular}
							renderItem={renderComponent}
							keyExtractor={(item: any) => item.idRestaurante}
							refreshControl={
								<RefreshControl
									refreshing={refresh}
									onRefresh={getPopular}
								/>
							}
						/>
					</View>
				)) || (
						<>
							<Text
								style={[
									styles.subtitle,
									{
										textAlign: 'center'
									}
								]}
							>
								Encontrando restaurantes...
							</Text>
							<br />
							<ActivityIndicator
								style={{
									marginTop: '5%'
								}}
								size='large'
								color='#ff0000'
							/>
						</>
					)}
				{(melhores.length > 0 && (
					<View
						style={{
							marginTop: 15
						}}
					>
						<Text style={[styles.subtitle]}>
							Restaurante mais bem avaliados
						</Text>
						<Text style={styles.description}>
							Os restaurantes mais bem avaliados do nosso app
						</Text>
						<br />
						<FlatList
							style={{
								marginTop: -10,
								marginBottom: 10
							}}
							data={melhores}
							renderItem={renderComponent}
							keyExtractor={(item: any) => item.idRestaurante}
							refreshControl={
								<RefreshControl
									refreshing={refresh}
									onRefresh={getMelhores}
								/>
							}
						/>
					</View>
				)) || (
						<>
							<Text
								style={[
									styles.subtitle,
									{
										textAlign: 'center'
									}
								]}
							>
								Encontrando restaurantes...
							</Text>
							<br />
							<ActivityIndicator
								style={{
									marginTop: '5%'
								}}
								size='large'
								color='#ff0000'
							/>
						</>
					)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen
