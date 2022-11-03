import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { ActivityIndicator, FlatList, SafeAreaView, View } from 'react-native'
import { SearchBar } from 'react-native-elements'
import styles from './style'

const RestaurantsScreen = ({ navigation, route }: any): JSX.Element => {
	const DATA: Array<Object> = Array<any>()
	const [search, setSearch] = React.useState<string>('')
	const [filteredDataSource, setFilteredDataSource] = React.useState<
		Array<Object>
	>([])
	const [masterDataSource, setMasterDataSource] =
		React.useState<Array<Object>>(DATA)
	const [isLoading, setLoading] = React.useState<boolean>(true)

	const getRestaurant = async () => {
		await fetch('http://localhost:8000/api/getRestaurantsByType', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				tipoRestaurante: route.params.tipoRestaurante
			})
		})
			.then((response: any): Promise<JSON> => response.json())
			.then((json: any): void => {
				Object.keys(json).forEach((key: string) => {
					DATA.push(json[key])
				})

				console.table(DATA)
				setFilteredDataSource(DATA)
				setMasterDataSource(DATA)
				setLoading(false)
			})
			.catch((err: Error): void => console.error(err))
	}

	React.useEffect(() => {
		getRestaurant()
	}, [])

	const Item = (...item: any[]): JSX.Element => {
		console.log(item[0])

		return (
			<View>
				<Card style={styles.card}>
					<Card.Img
						variant='top'
						style={styles.cardImg}
						src={require('../../../assets/example.jpeg')}
					/>
					<Card.Body
						style={{
							flex: 1,
							alignItems: 'flex-start',
							justifyContent: 'flex-start'
						}}
					>
						<hr style={styles.LineCard} />
						<View style={styles.textCardPosition}>
							<Card.Title>
								{item[0].item.nomeRestaurante ||
									'Nome do restaurante'}
							</Card.Title>
							<Card.Text>
								Tipo de cozinha:{' '}
								{item[0].item.tipoRestaurante ||
									'Não informado'}
							</Card.Text>
							<Card.Text>
								Nota: {item[0].item.notaAvaliacao || 0} / 5.0
							</Card.Text>
						</View>
						<View>
							<Button
								style={styles.buttonReserv}
								variant='primary'
								onClick={() => {
									navigation.navigate('About', {
										...item[0].item
									})
								}}
							>
								Reservar
							</Button>
						</View>
					</Card.Body>
				</Card>
			</View>
		)
	}

	const renderItem = (item: any): JSX.Element => {
		return <Item {...item} />
	}

	const searchFilterFunction = (text: string) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = masterDataSource.filter((item: any) => {
				// Applying filter for the inserted text in search bar
				const itemData = item.title
					? item.title.toUpperCase()
					: ''.toUpperCase()

				const textData = text.toUpperCase()

				return itemData.indexOf(textData) > -1
			})
			setFilteredDataSource(newData)
			setSearch(text)
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFilteredDataSource(masterDataSource)
			setSearch(text)
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			{!isLoading ? (
				<>
					<SearchBar
						placeholder='Pesquisar restaurantes...'
						lightTheme
						platform='android'
						round
						value={search}
						onChangeText={(text: string) =>
							searchFilterFunction(text)
						}
						autoCorrect={false}
						blurOnSubmit={true}
						autoFocus={true}
						style={{
							width: '72vw'
						}}
					/>
					<FlatList
						data={filteredDataSource}
						renderItem={renderItem}
						keyExtractor={(item: any) => item.idRestaurante}
						scrollEnabled={true}
						showsVerticalScrollIndicator={false}
					/>
				</>
			) : (
				<ActivityIndicator size='large' color='red' />
			)}
		</SafeAreaView>
	)
}

export default RestaurantsScreen