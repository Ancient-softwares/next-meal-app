import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
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
					Authorization: `Bearer ${global.getToken()}`,
				},
				body: JSON.stringify({
					idCliente: global.user.id,
					idStatusReserva: 1,
				}),
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
			fetch(`${global.API_URL}/api/getReservasByCliente`, {
				method: 'POST',
				mode: 'no-cors',
				headers: {
					Authorization: `Bearer ${global.getToken()}`,
				},
				body: JSON.stringify({
					idCliente: global.user.id,
					idStatusReserva: 1,
				}),
			})
				.then((response) => {
					console.log(response)

					return response.json()
				})
				.then((json) => {
					json.map((element: any) => {
						/* 					data.push({
                            dataReserva: element.dataReserva,
                            horaReserva: element.horaReserva,
                            numPessoas: element.numPessoas,
                            nomeRestaurante: element.nomeRestaurante,
                            statusReserva: element.statusReserva,
                        }) */

						console.table(element)
					})
				})
				.catch((error) => {
					console.error(error)
				})
				.finally(() => {
					setIsLoading(false)
				})
		} catch (error) {
			console.log(error)
		}
	}

	const Item = ({ item }) => {
		return (
			<View>
				<Text>{item.dataReserva}</Text>
				<Text>{item.horaReserva}</Text>
				<Text>{item.numPessoas}</Text>
				<Text>{item.nomeRestaurante}</Text>
				<Text>{item.statusReserva}</Text>
			</View>
		)
	}

	const renderItem = ({ item }) => {
		return <Item item={item} />
	}

	React.useEffect(() => {
		global.user.id = 1
		global.setToken(
			'veXRDoBjl7VPLeCRHIRAYA1jnwLd4TMpiu96SkRdCiKEYQpcFWoiBKX6GaqX2q2o0pyA9VTQMaSXn4cFvcVq5aeqC2mUyGfDa6E6vsA60Vy4u5YT3fldpJ3BeSKIon7i9L0ckhPsMxWjZbRaE9FccDhfNvw9ga4wY8OT272dRSoeAb6vBFbZbMRV0dulrAiRLY6wjPle'
		)

        console.log(global.getToken())

		bearerTokenTest(global.getToken())
	}, [])

	return (
		<View>
			{data.length > 0 ? (
				<>
					<Text>HistoryScreen</Text>
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
							backgroundColor: 'none',
						},
					]}
				>
					<ActivityIndicator />
				</View>
			)}
		</View>
	)
}

export default HistoryScreen
