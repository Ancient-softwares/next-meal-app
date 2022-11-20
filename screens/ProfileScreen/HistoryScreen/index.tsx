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

const HistoryScreen = ({ navigation }: any) => {
	const [data, setData] = React.useState<Array<Object>>([])
	const [isLoading, setIsLoading] = React.useState<boolean>(true)
	const [uniqueValue, setUniqueValue] = React.useState<number>(1)

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
		navigation.addListener('focus', (): void => {
			forceRemount()

			try {
				if (global.isLogged) {
					if (global.user.id != null) {
						getReservas()
					}
				}
			} catch (err) {
				console.log(err)
			}
		})
	}, [navigation, global.user.id])

	const forceRemount = (): void => {
		setUniqueValue(uniqueValue + 1)
	}

	return (
		<SafeAreaView
			style={{
				width: '100%',
				height: '100%',
				backgroundColor: '#fff'
			}}
			key={uniqueValue}
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
