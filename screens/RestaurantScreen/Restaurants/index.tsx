import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { FlatList, SafeAreaView, View } from 'react-native'
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

	const getRestaurant = async () => {
		await fetch('http://localhost:8000/api/restaurantes', {
			method: 'get',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((response: any): Promise<JSON> => response.json())
			.then((response: any): void => {
				response.forEach((item: any) => {
					DATA.push({
						id: item.idRestaurante,
						title: item.nomeRestaurante,
						type: item.tipoRestaurante,
						rating: item.notaAvaliacao,
					})
				})

				console.table(DATA)
			})
			.catch((err: Error): void => console.error(err))
	}

	React.useEffect(() => {
		getRestaurant()
	}, [])

	const Item = ({
		id,
		title,
		rating,
		type,
	}: {
		id: number
		title: string
		rating: number
		type: string
	}): JSX.Element => {
		return (
			<View>
				<Card
					style={{
						width: '22em',
						border: 'none',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Card.Img
						variant='top'
						src={require('../../../assets/example.jpeg')}
					/>
					<Card.Body
						style={{
							flex: 1,
							alignItems: 'flex-start',
							justifyContent: 'flex-start',
						}}
					>
						<Card.Title>{title}</Card.Title>
						<Card.Text>
							Tipo de cozinha: {type || 'Não informado'}
						</Card.Text>
						<Card.Text>Nota: {rating || 0} / 5.0</Card.Text>
						<Button
							variant='primary'
							style={{ marginRight: 5 }}
							onClick={() =>
								navigation.navigate('About', {
									id: id,
									title: title,
									rating: rating,
									type: type,
								})
							}
						>
							Reservar
						</Button>
					</Card.Body>
				</Card>
			</View>
		)
	}

	const renderItem = (item: any): JSX.Element => {
		return (
			<Item
				id={item.item.id}
				title={item.item.title}
				rating={item.item.rating}
				type={item.item.type}
			/>
		)
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
			<SearchBar
				placeholder='Pesquisar restaurantes...'
				lightTheme
				platform='android'
				round
				value={search}
				onChangeText={(text: string) => searchFilterFunction(text)}
				autoCorrect={false}
				blurOnSubmit={true}
				autoFocus={true}
				style={{
					width: '72vw',
				}}
			/>
			<FlatList
				data={filteredDataSource}
				renderItem={renderItem}
				keyExtractor={(item: JSX.Element) => item.id}
				scrollEnabled={true}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	)
}

export default RestaurantsScreen
