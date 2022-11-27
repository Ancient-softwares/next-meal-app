import { FontAwesome } from '@expo/vector-icons'
import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {
	ActivityIndicator,
	FlatList,
	RefreshControl,
	SafeAreaView,
	Text,
	TextInput,
	View
} from 'react-native'
import { getLetterIndex } from '../../../constants/modules'
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
					<View style={{}}>
						<Card.Img
							variant='top'
							style={styles.cardImg}
							src={require(`../../../assets/Restaurante/${
								// picks a random image from the array skipping duplicates
								// global.indexes[Math.floor(Math.random() * 5)]
								// firstLetter
								getLetterIndex(item[0].item.nomeRestaurante)
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
											fontSize: 18,
											textAlign: 'left'
										}
									]}
								>
									Categoria:{' '}
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
								variant='danger'
								style={styles.buttonReserv}
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

					setFilteredDataSource(json)
				} else {
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
