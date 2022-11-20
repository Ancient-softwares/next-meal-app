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
											color: '#000'
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
											color: '#000'
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
