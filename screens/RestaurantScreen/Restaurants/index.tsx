import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	SafeAreaView,
	TextInput,
	View
} from 'react-native'
import styles from './style'

const RestaurantsScreen = ({ navigation }: any): JSX.Element => {
	const DATA: Array<Object> = Array<any>()
	const [search, setSearch] = React.useState<string>('')
	const [filteredDataSource, setFilteredDataSource] = React.useState<
		Array<Object>
	>([])
	const [masterDataSource, setMasterDataSource] =
		React.useState<Array<Object>>(DATA)
	const [isLoading, setLoading] = React.useState<boolean>(true)
	const [refresh, setRefresh] = React.useState<boolean>(false)
	const [uniqueValue, setUniqueValue] = React.useState<number>(1)

	const getRestaurant = async (): Promise<void> => {
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

				setRefresh(false)
				setFilteredDataSource(DATA)
				setMasterDataSource(DATA)
				setLoading(false)
			})
			.catch((err: Error): void => console.error(err))
	}

	React.useEffect(() => {
		navigation.addListener('focus', (): void => {
			getRestaurant()
		})
	}, [uniqueValue, navigation, filteredDataSource])

	const Item = (...item: any[]): JSX.Element => {
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

	const forceRemount = (): void => {
		setRefresh(true)
		setUniqueValue(uniqueValue + 1)
		setRefresh(false)

		console.log('refresh')
	}

	const filterByEverything = async (text: string) => {
		await fetch(`${global.getApiUrl()}/api/filterByMealsOrIngredients`, {
			method: 'post',
			headers: {
				Accept: 'Application/json',
				'Content-Type': 'Application/json'
			},
			body: JSON.stringify({
				input: text
			})
		})
			.then((response: Response) => response.json())
			.then((json: any) => {
				console.log(json)

				if (json.length > 0) {
					setFilteredDataSource([])

					// Inserted text is not blank
					// Filter the masterDataSource and update FilteredDataSource
					setFilteredDataSource(json)
					console.log(filteredDataSource)
				} else {
					// Inserted text is blank
					// Update FilteredDataSource with masterDataSource
					setFilteredDataSource(masterDataSource)
				}
			})
			.catch((err: Error) => console.error(err))
			.finally(() => {
				// setSearch('')
				// forceRemount()
				console.log('finally')
			})
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
				const itemData = item.nomeRestaurante
					? item.nomeRestaurante.toUpperCase()
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
		<SafeAreaView style={styles.container} key={uniqueValue}>
			{!isLoading ? (
				<>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%',
							marginTop: 20,
							marginBottom: 20
						}}
					>
						<FontAwesome
							style={{
								marginLeft: 20
							}}
							name='search'
							size={24}
							color='grey'
						/>
						<TextInput
							style={[
								styles.searchBar,
								{
									width: '80%',
									marginLeft: 20,
									marginRight: 20,
									height: 40
								}
							]}
							placeholder='Pesquisar restaurantes...'
							placeholderTextColor='gray'
							onChangeText={(text) => {
								// searchFilterFunction(text)
								filterByEverything(text)

								setSearch(text)
							}}
							value={search}
						/>
						<Button
							variant='danger'
							style={{
								marginRight: 20
							}}
							onClick={() => {
								filterByEverything(search)

								setSearch('')
							}}
						>
							Pesquisar
						</Button>
					</View>
					<FlatList
						data={filteredDataSource}
						renderItem={renderItem}
						extraData={refresh}
						keyExtractor={(item: any) => item.idRestaurante}
						scrollEnabled={true}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={refresh}
								onRefresh={getRestaurant}
								enabled={true}
							/>
						}
					/>
				</>
			) : (
				<ActivityIndicator size='large' color='red' />
			)}
		</SafeAreaView>
	)
}

export default RestaurantsScreen
