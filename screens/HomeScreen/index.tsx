import React from 'react'
import { Carousel, Stack } from 'react-bootstrap'
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	View
} from 'react-native'
import 'react-native-gesture-handler'
import '../../constants/globals'
import styles from './style'

const HomeScreen = ({ navigation }: any): JSX.Element => {
	const exampleImage = require('../../assets/example.jpeg')
	let DATA: Array<Object> = Array<any>()
	const [filteredDataSource, setFilteredDataSource] = React.useState<
		Array<Object>
	>([])
	const [masterDataSource, setMasterDataSource] =
		React.useState<Array<Object>>(DATA)
	const [popular, setPopular] = React.useState<Array<Object>>([])
	const [melhores, setMelhores] = React.useState<Array<Object>>([])
	const [isLoading, setLoading] = React.useState<boolean>(true)
	const [refresh, setRefresh] = React.useState<boolean>(false)
	const [uniqueValue, setUniqueValue] = React.useState<number>(1)

	React.useEffect(() => {
		navigation.addListener('focus', (): void => {
			refreshScreen()
			forceRemount()
		})
	}, [navigation])

	const refreshScreen = (): void => {
		getRestaurant()
		getPopular()
		getMelhores()
	}

	const forceRemount = (): void => {
		setUniqueValue(uniqueValue + 1)
	}

	const getRestaurant = async () => {
		setFilteredDataSource([])
		setMasterDataSource([])
		DATA = []

		try {
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

					setFilteredDataSource(DATA)
					setMasterDataSource(DATA)
				})
				.catch((err: Error): void => console.error(err))
		} catch (error: unknown) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const getPopular = async () => {
		setPopular([])

		try {
			await fetch(
				`${global.getApiUrl()}/api/getRestaurantesMaisReservados`,
				{
					method: 'post',
					headers: new Headers({
						'Content-Type': 'application/json',
						Accept: 'application/json'
					}),
					body: JSON.stringify({
						limite: 3
					})
				}
			)
				.then((response: any): Promise<JSON> => response.json())
				.then((json: any): void => {
					setPopular(json.data)
				})
				.catch((err: Error): void => console.error(err))
		} catch (error: unknown) {
			console.error(error)
		} finally {
			setLoading(false)
			setRefresh(false)
		}
	}

	const getMelhores = async () => {
		setMelhores([])

		try {
			await fetch(
				`${global.getApiUrl()}/api/getRestaurantesMelhoresAvaliados`,
				{
					method: 'post',
					headers: new Headers({
						'Content-Type': 'application/json',
						Accept: 'application/json'
					}),
					body: JSON.stringify({
						limite: 3
					})
				}
			)
				.then((response: any): Promise<JSON> => response.json())
				.then((json: any): void => {
					setMelhores(json.data)
				})
				.catch((err: Error): void => console.error(err))
		} catch (error: unknown) {
			console.error(error)
		} finally {
			setLoading(false)
			setRefresh(false)
		}
	}

	const onPressRestaurant = (item: any) => {
		console.log('got here', item)
		let params = []

		filteredDataSource.forEach((element: any) => {
			if (element.idRestaurante === item.idRestaurante) {
				params = element

				console.log(params)
				navigation.navigate('About', {
					...params
				})

				return
			} else {
				window.alert('Erro ao carregar o restaurante')
			}
		})
	}

	const onPressCategory = (item: any) => {
		if (item[0].item.tipoRestaurante === null) {
			navigation.navigate('Restaurants')
		} else {
			global.tipoRestaurante = item[0].item.tipoRestaurante
			console.log(global.tipoRestaurante)

			// first save the categoria
			navigation.navigate('Category', {
				tipoRestaurante: global.tipoRestaurante
			})
		}
	}

	const Item = (...item: any[]): JSX.Element => {
		return (
			<View style={styles.spaceCategory}>
				<img
					src={exampleImage}
					onClick={() => onPressCategory(item)}
					className='rounded-circle'
					style={{
						width: 90,
						height: 90,
						marginLeft: 10,
						marginRight: 10
					}}
				/>
				<Text style={styles.nameCategory}>
					{item[0].item.tipoRestaurante || 'did not return'}
				</Text>
			</View>
		)
	}

	const Component = (...item: any[]): JSX.Element => {
		console.log(item[0].item)

		return (
			<View
				style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					marginTop: '2.5%'
				}}
				onTouchStart={() => onPressRestaurant(item[0].item)}
			>
				<Stack
					direction='horizontal'
					gap={2}
					style={{ marginLeft: 96 }}
				>
					<div style={styles.PositionImgRestaurant}>
						<img
							src={exampleImage}
							className='rounded-circle'
							style={{
								width: 100,
								height: 100,
								marginLeft: 25,
								marginRight: 10
							}}
						/>
					</div>
					<div>
						<Text style={styles.subtitle}>
							{item[0].item.nomeRestaurante}
						</Text>
						<br />
						{(item[0].item.media !== null && (
							<>
								{item[0].item.total ? (
									<Text style={styles.description}>
										Total de reservas: {item[0].item.total}
									</Text>
								) : (
									<Text style={styles.description}>
										Total de avaliações:{' '}
										{item[0].item.notas}
									</Text>
								)}
							</>
						)) || (
							<Text style={styles.description}>
								Total de avaliações: {item[0].item.notas}
							</Text>
						)}
						<br />
						{item[0].item.media !== null ? (
							<>
								<Text style={styles.description}>
									Media de avaliações: {item[0].item.media}
								</Text>
								<br />
							</>
						) : (
							<></>
						)}
					</div>
				</Stack>
			</View>
		)
	}

	const renderItem = (item: any): JSX.Element => {
		return <Item {...item} />
	}

	const renderComponent = (item: any): JSX.Element => {
		return <Component {...item} />
	}

	return (
		<SafeAreaView style={styles.container} key={uniqueValue}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.carousel}>
					<Carousel>
						<Carousel.Item interval={6000}>
							<img
								className='d-block w-100'
								src={exampleImage}
								alt='First slide'
								style={styles.carousel}
							/>
							<Carousel.Caption>
								<h3>Veja os restaurantes perto de você.</h3>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={6000}>
							<img
								className='d-block w-100'
								src={exampleImage}
								alt='Second slide'
								style={styles.carousel}
							/>

							<Carousel.Caption>
								<h3>Economize tempo ao reservar.</h3>
							</Carousel.Caption>
						</Carousel.Item>
						<Carousel.Item interval={6000}>
							<img
								className='d-block w-100'
								src={exampleImage}
								alt='Third slide'
								style={styles.carousel}
							/>

							<Carousel.Caption>
								<h3>Visualizar o cardápio dos restaurantes.</h3>
							</Carousel.Caption>
						</Carousel.Item>
					</Carousel>
				</View>

				<View>
					<Text style={styles.subtitle}>Categorias</Text>
					<Text style={styles.description}>
						Escolha entre as categorias de restaurantes
					</Text>
				</View>
				<View
					style={{
						width: 'auto',
						maxWidth: Dimensions.get('screen').width
					}}
				>
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					>
						<FlatList
							data={filteredDataSource}
							renderItem={renderItem}
							keyExtractor={(item: any) => item.idRestaurante}
							scrollEnabled={true}
							horizontal={true}
							showsVerticalScrollIndicator={false}
						/>
					</ScrollView>
					<hr style={styles.lineStyle} />
				</View>
				{(popular.length > 0 && (
					<View
						style={{
							marginTop: 15
						}}
					>
						<Text style={[styles.subtitle]}>
							Restaurantes mais populares
						</Text>
						<Text style={styles.description}>
							Os restaurantes mais populares do nosso app
						</Text>
						<br />
						<FlatList
							style={{
								marginTop: -10,
								marginBottom: 10
							}}
							data={popular}
							renderItem={renderComponent}
							keyExtractor={(item: any) => item.idRestaurante}
							refreshControl={
								<RefreshControl
									refreshing={refresh}
									onRefresh={getPopular}
								/>
							}
						/>
					</View>
				)) || (
					<>
						<Text
							style={[
								styles.subtitle,
								{
									textAlign: 'center'
								}
							]}
						>
							Encontrando restaurantes...
						</Text>
						<br />
						<ActivityIndicator
							style={{
								marginTop: '5%'
							}}
							size='large'
							color='#ff0000'
						/>
					</>
				)}
				{(melhores.length > 0 && (
					<View
						style={{
							marginTop: 15
						}}
					>
						<Text style={[styles.subtitle]}>
							Restaurante mais bem avaliados
						</Text>
						<Text style={styles.description}>
							Os restaurantes mais bem avaliados do nosso app
						</Text>
						<br />
						<FlatList
							style={{
								marginTop: -10,
								marginBottom: 10
							}}
							data={melhores}
							renderItem={renderComponent}
							keyExtractor={(item: any) => item.idRestaurante}
							refreshControl={
								<RefreshControl
									refreshing={refresh}
									onRefresh={getMelhores}
								/>
							}
						/>
					</View>
				)) || (
					<>
						<Text
							style={[
								styles.subtitle,
								{
									textAlign: 'center'
								}
							]}
						>
							Encontrando restaurantes...
						</Text>
						<br />
						<ActivityIndicator
							style={{
								marginTop: '5%'
							}}
							size='large'
							color='#ff0000'
						/>
					</>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen
