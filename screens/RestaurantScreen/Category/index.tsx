import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {
	ActivityIndicator,
	FlatList,
	Keyboard,
	RefreshControl,
	SafeAreaView,
	View
} from 'react-native'
import { SearchBar } from 'react-native-elements'
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

			console.log(global.tipoRestaurante)
			setTimeout((): void => {
				if (global.tipoRestaurante != tipoRestaurante) {
					setKey(key + 1)
					tipoRestaurante = global.tipoRestaurante
					getRestaurant()
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
		<SafeAreaView style={styles.container} key={key}>
			{!isLoading ? (
				<>
					<SearchBar
						placeholder='Pesquisar restaurantes...'
						lightTheme
						platform='android'
						round
						value={search}
						onChange={(event: any) =>
							searchFilterFunction(event.nativeEvent.text)
						}
						onSubmitEditing={() => {
							Keyboard.dismiss()
						}}
						autoFocus={true}
						style={{
							width: '72vw'
						}}
						onBlur={undefined}
						onChangeText={undefined}
						onFocus={undefined}
						onClear={undefined}
						loadingProps={undefined}
						autoCompleteType={undefined}
						clearIcon={undefined}
						searchIcon={undefined}
						showLoading={false}
						onCancel={undefined}
						cancelButtonTitle={''}
						cancelButtonProps={undefined}
						showCancel={false}
					/>
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
