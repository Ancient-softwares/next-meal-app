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
import { getLetterIndex } from '../../../constants/modules'
import styles from './style'

const RestaurantsScreen = ({ navigation, route }: any): JSX.Element => {
	let DATA: Array<Object> = Array<any>()
	const [search, setSearch] = React.useState<string>('')
	const [filteredDataSource, setFilteredDataSource] = React.useState<
		Array<Object>
	>([])
	const [masterDataSource, setMasterDataSource] =
		React.useState<Array<Object>>(DATA)
	const [isLoading, setLoading] = React.useState<boolean>(true)
	const [refresh, setRefresh] = React.useState<boolean>(false)
	let tipoRestaurante = route.params.tipoRestaurante
	const [key, setKey] = React.useState<number>(0)
	const [hasAlreadyFetched, setHasAlreadyFetched] =
		React.useState<boolean>(false)

	const getRestaurant = async () => {
		await fetch(`${global.getApiUrl()}/api/getRestaurantsByType`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				tipoRestaurante: tipoRestaurante
			})
		})
			.then((response: any): Promise<JSON> => response.json())
			.then((json: any): void => {
				DATA = []

				Object.keys(json).forEach((key: string) => {
					DATA.push(json[key])
				})

				setFilteredDataSource(DATA)
				setMasterDataSource(DATA)
			})
			.catch((err: Error): void => console.error(err))
	}

	React.useEffect(() => {
		navigation.addListener('focus', () => {
			setLoading(true)

			setTimeout((): void => {
				if (global.tipoRestaurante != tipoRestaurante) {
					setKey(key + 1)
					tipoRestaurante = global.tipoRestaurante
					if (hasAlreadyFetched === false) {
						getRestaurant()

						setHasAlreadyFetched(!hasAlreadyFetched)
					}
				} else {
					if (refreshScreen()) {
						setLoading(false)

						return
					}
				}
			}, 1000)
		})
	}, [navigation, key, global.tipoRestaurante])

	const refreshScreen = (): boolean => {
		try {
			DATA = []
			getRestaurant()
			getRestaurant()
			forceRemount()

			return true
		} catch (error) {
			return false
		}
	}

	const forceRemount = (): void => {
		setKey(key + 1)
	}

	const Item = (...item: any[]): JSX.Element => {
		return (
			<View>
				<Card style={styles.card}>
					<Card.Img
						variant='top'
						style={styles.cardImg}
						src={require(`../../../assets/Restaurante/${
							// global.indexes[Math.floor(Math.random() * 5)]
							// firstLetter
							getLetterIndex(item[0].item.nomeRestaurante)
						}.png`)}
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
										restaurante: item[0].item,
										previousPage: 'Restaurants'
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
		if (text) {
			const newData = masterDataSource.filter((item: any) => {
				const itemData = item.title
					? item.title.toUpperCase()
					: ''.toUpperCase()

				const textData = text.toUpperCase()

				return itemData.indexOf(textData) > -1
			})
			setFilteredDataSource(newData)
			setSearch(text)
		} else {
			setFilteredDataSource(masterDataSource)
			setSearch(text)
		}
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
				if (json.length > 0) {
					setFilteredDataSource(json)
				} else {
					setFilteredDataSource(masterDataSource)
				}
			})
			.catch((err: Error) => console.error(err))
	}

	return (
		<SafeAreaView style={styles.container} key={key}>
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
							onChangeText={(text: string): void => {
								if (text.length === 0) {
									setFilteredDataSource(masterDataSource)
								}

								setSearch(text)
							}}
							value={search}
						/>
						<Button
							variant='danger'
							style={{
								marginRight: 20
							}}
							onClick={(): Promise<void> =>
								filterByEverything(search)
							}
						>
							Pesquisar
						</Button>
					</View>
					<FlatList
						data={filteredDataSource}
						renderItem={renderItem}
						keyExtractor={(item: any) => item.idRestaurante}
						scrollEnabled={true}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={refresh}
								onRefresh={getRestaurant}
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
