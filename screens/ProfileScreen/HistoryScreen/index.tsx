import React from 'react'
import { Stack } from 'react-bootstrap'
import {
	ActivityIndicator,
	FlatList,
	SafeAreaView,
	Text,
	View
} from 'react-native'
import styles from './style'

const HistoryScreen = () => {
	const [data, setData] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	const bearerTokenTest: any = async (): Promise<void> => {
		try {
			await fetch(`${global.API_URL}/api/bearerTokenVerify`, {
				method: 'POST',
				mode: 'no-cors',
				headers: {
					Authorization: `Bearer ${global.getToken()}`
				},
				body: JSON.stringify({
					idCliente: global.user.id,
					idStatusReserva: 1
				})
			})
				.then((response) => response.json())
				.then((json) => {
					console.log(json)
				})
				.catch((error) => {
					console.error(error)
				})
		} catch (error) {
			console.log(error)
		}
	}

	const getReservas = async () => {
		try {
			fetch(`${global.getApiUrl()}/api/getReservasByCliente`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					Authorization: `Bearer ${global.getToken()}`
				},
				body: JSON.stringify({
					idCliente: Number.parseInt(global.user.id)
				})
			})
				.then((response: Response): Promise<JSON> => response.json())
				.then((json: any): void => {
					console.log(json)

					json.data.map((item: any) => {
						data.push(item)
					})
				})
				.catch((error: Error): void => {
					console.error(error)
				})
				.finally((): void => {
					setIsLoading(false)
				})
		} catch (error) {
			console.log(error)
		}
	}

	const Item = ({ item }) => {
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					marginTop: '5%'
				}}
			>
				<Stack
					direction='horizontal'
					gap={2}
					style={{ marginLeft: 96 }}
				>
					<div style={styles.PositionImgRestaurant}>
						<img
							src={require('../../../assets/example.jpeg')}
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
						<Text style={styles.subtitle}>{item.restaurante}</Text>
						<br />
						<Text style={styles.description}>
							Data: {item.dataReserva} - {item.horaReserva}
							<br />
						</Text>
						<Text style={styles.description}>
							Nº Pessoas: {item.numPessoas}
						</Text>
						<br />
						<Text style={styles.description}>
							Status: {item.status}
						</Text>
					</div>
				</Stack>
			</View>
		)
	}

	const renderItem = ({ item }) => {
		return <Item item={item} />
	}

	React.useEffect(() => {
		console.log(global.getToken())
		getReservas()
	}, [])

	return (
		<SafeAreaView
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#fff'
			}}
		>
			{data.length > 0 ? (
				<>
					<FlatList
						data={data}
						renderItem={renderItem}
						keyExtractor={(item) => item.idReserva}
					/>
				</>
			) : (
				<View
					style={[
						styles.container,
						{
							backgroundColor: 'none'
						}
					]}
				>
					<ActivityIndicator />
				</View>
			)}
		</SafeAreaView>
	)
}

export default HistoryScreen
