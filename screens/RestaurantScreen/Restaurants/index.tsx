import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	SafeAreaView,
	Text,
	View
} from 'react-native'
import { SearchBar } from 'react-native-elements'
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
					// appends a photo property to each object
					DATA[
						DATA.length - 1
					].fotoRestaurante = `../../../assets/Restaurante/${
						// picks a random image from the array skipping duplicates
						global.indexes[Math.floor(Math.random() * 5)]
					}.png`
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
		const letters = [
			['a', 'b', 'c', 'd'],
			['e', 'f', 'g', 'h'],
			['i', 'j', 'k', 'l'],
			['m', 'n', 'o', 'p'],
			['q', 'r', 's', 't'],
			['u', 'v', 'w', 'x', 'y', 'z']
		]

		const getFirstLetter = (name: string): string => {
			return name.charAt(0).toLowerCase()
		}

		const getLetterIndex = (letter: string): number => {
			let index = 0
			letters.forEach((array: string[], i: number) => {
				if (array.includes(letter)) {
					if (typeof i === 'number') {
						index = i
					}
				}
			})
			return index
		}

		const getLetter = (name: string): string => {
			return letters[getLetterIndex(getFirstLetter(name))][0]
		}

		let firstLetter = getLetterIndex(
			getFirstLetter(item[0].item.nomeRestaurante)
		)

		return (
			<View>
				<Card style={styles.card}>
					<View style={{}}>
						<Card.Img
							variant='top'
							style={styles.cardImg}
							src={require(`../../../assets/Restaurante/${
								// picks a random image from the array skipping duplicates
								// global.indexes[Math.floor(Math.random() * 5)]
								firstLetter
							}.png`)}
						/>
					</View>
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
								<Text
									style={[
										styles.subtitle,
										{
											fontSize: 20,
											fontWeight: 'bold',
											fontStyle: 'italic'
										}
									]}
								>
									{item[0].item.nomeRestaurante ||
										'Nome do restaurante'}
								</Text>
							</Card.Title>
							<Card.Text>
								<Text
									style={[
										styles.subtitle,
										{
											color: '#000',
											fontFamily: 'math',
											fontSize: 18
										}
									]}
								>
									Tipo de cozinha:{' '}
								</Text>
								{item[0].item.tipoRestaurante ||
									'Não informado'}
							</Card.Text>
							<Card.Text>
								<Text
									style={[
										styles.subtitle,
										{
											color: '#000',
											fontFamily: 'math',
											fontSize: 18
										}
									]}
								>
									Nota:{' '}
								</Text>
								{item[0].item.notaAvaliacao || 0} / 5.0
							</Card.Text>
						</View>
						<View>
							<Button
								style={styles.buttonReserv}
								variant='danger'
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
				if (json.length > 0) {
					setFilteredDataSource([])

					// Inserted text is not blank
					// Filter the masterDataSource and update FilteredDataSource
					setFilteredDataSource(json)
				} else {
					// Inserted text is blank
					// Update FilteredDataSource with masterDataSource
					setFilteredDataSource(masterDataSource)
				}
			})
			.catch((err: Error) => console.error(err))
	}

	const renderItem = (item: any): JSX.Element => {
		return <Item {...item} />
	}

	return (
		<SafeAreaView style={styles.container} key={uniqueValue}>
			{!isLoading ? (
				<>
					<SearchBar
						placeholder='Pesquisar restaurantes...'
						lightTheme
						platform='android'
						round
						value={search}
						onChangeText={(text: string): void => {
							filterByEverything(text)

							setSearch(text)
						}}
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
