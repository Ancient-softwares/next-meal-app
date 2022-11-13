import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import styles from './style'

const Menu = ({ navigation, route }: any) => {
	const [message, setMessage] = React.useState('')
	const [uniqueValue, setUniqueValue] = React.useState(1)
	const restaurante = route.params.restaurante
	const [cardapio, setCardapio] = React.useState<any[]>([])
	const exampleImage: string = require('../../../assets/example.jpeg')

	React.useEffect(() => {
		fetchMenu()

		const focusHandler = navigation.addListener('focus', () => {
			console.log('Refreshed')
		})

		return focusHandler
	}, [navigation, uniqueValue])

	const fetchMenu = async () => {
		try {
			await fetch(`${global.getApiUrl()}/api/getPratosByRestaurante`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idRestaurante: restaurante.idRestaurante
				})
			})
				.then((response: any): Promise<JSON> => response.json())
				.then((json: any): void => {
					json.forEach((element: any) => {
						cardapio.push(element)
					})

					console.log(cardapio)
				})
				.catch((err: Error): void => console.error(err))
		} catch (error: unknown) {
			console.error(error)
		}
	}

	const renderCardapio = (item: any): JSX.Element => {
		return (
			<View
				style={[
					styles.spaceCategory,
					{
						width: '100%'
					}
				]}
			>
				<img
					src={exampleImage}
					onClick={() => window.alert('AAAA')}
					style={{
						width: 140,
						height: 125,
						marginLeft: 7.5,
						marginRight: 20,
						borderRadius: '7.5%'
					}}
				/>
				<Text
					style={[
						styles.nameCategory,
						{
							marginLeft: 12.5,
							fontWeight: 'bold'
						}
					]}
				>
					{item.item.nomePrato}
				</Text>
				<Text
					style={[
						styles.nameCategory,
						{
							marginLeft: 12.5
						}
					]}
				>
					Categoria: {item.item.tipoPrato}
				</Text>
				<Text
					style={[
						styles.nameCategory,
						{
							marginLeft: 12.5
						}
					]}
				>
					Valor: {item.item.valorPrato}
				</Text>
			</View>
		)
	}

	return (
		<SafeAreaView
			style={[
				styles.container,
				{
					height: '100%'
				}
			]}
		>
			<View style={styles.rowList}>
				<View
					style={{
						marginLeft: '6%',
						marginTop: '2.5%'
					}}
				>
					<ListGroup>
						<FlatList
							data={cardapio}
							horizontal={false}
							showsHorizontalScrollIndicator={false}
							scrollEnabled={true}
							keyExtractor={(item: any) => item.idPrato}
							renderItem={renderCardapio}
						/>
					</ListGroup>
				</View>
			</View>
		</SafeAreaView>
	)
}

export default Menu
