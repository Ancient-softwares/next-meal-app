import React from 'react'
import { ActivityIndicator, FlatList, Text, View } from 'react-native'
import styles from './style'

const HistoryScreen = () => {
	const [data, setData] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

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

		fetch(`${global.API_URL}/api/getReservasByCliente`, {
			method: 'POST',
			mode: 'no-cors',
			headers: {
				Authorization: `Bearer ${global.getToken()}`,
			},
			body: JSON.stringify({
				idCliente: global.user.id,
			}),
		})
			.then((response) => {
				console.log(response)
			})
			.then((json) => {
				json.forEach((element: any) => {
					data.push({
						dataReserva: element.dataReserva,
						horaReserva: element.horaReserva,
						numPessoas: element.numPessoas,
						nomeRestaurante: element.nomeRestaurante,
						statusReserva: element.statusReserva,
					})
				})
			})
			.catch((error) => {
				console.error(error)
			})
			.finally(() => {
				setIsLoading(false)
			})
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
