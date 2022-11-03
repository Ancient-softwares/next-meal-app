import React from 'react'
import { Carousel, ListGroup } from 'react-bootstrap'
import {
	Dimensions,
	FlatList,
	Pressable,
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
	const DATA: Array<Object> = Array<any>()
	const [filteredDataSource, setFilteredDataSource] = React.useState<
		Array<Object>
	>([])
	const [masterDataSource, setMasterDataSource] =
		React.useState<Array<Object>>(DATA)

	const [latest, setLatest] = React.useState<Array<Object>>([])
	const [popular, setPopular] = React.useState<Array<Object>>([])

	const getLatest = async () => {
		if (global.user !== null) {
			await fetch('http://localhost:8000/api/getLatestReservasCliente', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					idCliente: global.user.id || 0
				})
			})
				.then((response: any): Promise<JSON> => response.json())
				.then((json: any): void => {
					Object.keys(json).forEach((key: string) => {
						latest.push(json[key])
					})

					console.table(latest)
					setLatest(latest)
				})
				.catch((err: Error): void => console.error(err))
		}
	}

	const getRecommended = async () => {
		await fetch(
			'http://localhost:8000/api/getRestaurantesMaisReservadosMelhoresAvaliados',
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				},
				body: JSON.stringify({
					limite: 3
				})
			}
		)
			.then((response: any): Promise<JSON> => response.json())
			.then((json: any): void => {
				Object.keys(json).forEach((key: string) => {
					popular.push(json[key])
				})

				console.table(popular)
				setPopular(popular)
			})
			.catch((err: Error): void => console.error(err))
	}

	const onPressLatest = (item: any) => {
		navigation.navigate('About', {
			restaurant: item
		})
	}

	const onPressCategory = (item: any) => {
		navigation.navigate('Category', {
			category: item
		})
	}

	const getRestaurant = async () => {
		await fetch('http://localhost:8000/api/restaurantes', {
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

				console.table(DATA)
				setFilteredDataSource(DATA)
				setMasterDataSource(DATA)
			})
			.catch((err: Error): void => console.error(err))
	}

	const Item = (...item: any[]): JSX.Element => {
		console.log(item[0])
		return (
			<View style={styles.spaceCategory}>
				<img
					src={exampleImage}
					onClick={onPressCategory}
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

	const renderItem = (item: any): JSX.Element => {
		return <Item {...item} />
	}

	React.useEffect(() => {
		console.log([getRestaurant(), getLatest()])
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* <View style={styles.navHome}>
					
				</View> */}
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
								<h3>
									Economize tempo na hora de realizar sua
									reserva.
								</h3>
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
								<h3>
									Conosco você pode visualizar o pratos do
									restaurantes que selecionar.
								</h3>
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
						{/* Pressable só pra deixar com espaço */}
						<Pressable>
							<View style={styles.spaceCategory}>
								<img
									src={exampleImage}
									onClick={Item}
									className='rounded-circle'
									style={{
										width: 90,
										height: 90,
										marginLeft: 10,
										marginRight: 10
									}}
								/>
								<Text style={styles.nameCategory}>
									Categoria
								</Text>
							</View>
						</Pressable>
						<Pressable>
							<View style={styles.spaceCategory}>
								<img
									src={exampleImage}
									onClick={Item}
									className='rounded-circle'
									style={{
										width: 90,
										height: 90,
										marginLeft: 10,
										marginRight: 10
									}}
								/>
								<Text style={styles.nameCategory}>
									Categoria
								</Text>
							</View>
						</Pressable>
						<Pressable>
							<View style={styles.spaceCategory}>
								<img
									src={exampleImage}
									onClick={Item}
									className='rounded-circle'
									style={{
										width: 90,
										height: 90,
										marginLeft: 10,
										marginRight: 10
									}}
								/>
								<Text style={styles.nameCategory}>
									Categoria
								</Text>
							</View>
						</Pressable>
						<Pressable>
							<View style={styles.spaceCategory}>
								<img
									src={exampleImage}
									onClick={Item}
									className='rounded-circle'
									style={{
										width: 90,
										height: 90,
										marginLeft: 10,
										marginRight: 10
									}}
								/>
								<Text style={styles.nameCategory}>
									Categoria
								</Text>
							</View>
						</Pressable>
					</ScrollView>
					<hr style={styles.lineStyle} />
				</View>
				<View>
					{latest.length > 0 ? (
						<>
							<Text style={styles.subtitle}>
								Reservados recentemente
							</Text>
							<Text style={styles.description}>
								Estabelecimentos que você visitou recentemente
							</Text>
							<ListGroup as='ul'>
								<FlatList
									data={filteredDataSource}
									renderItem={renderItem}
									keyExtractor={(item: any) =>
										item.idRestaurante
									}
									scrollEnabled={true}
									horizontal={false}
									showsVerticalScrollIndicator={false}
								/>
								<ListGroup.Item
									onClick={onPressLatest}
									as='li'
									className='d-flex justify-content-between align-items-start'
									style={{
										border: 'none',
										marginTop: 10,
										marginBottom: 10
									}}
								>
									<img
										src={exampleImage}
										className='rounded-circle'
										style={{
											width: 40,
											height: 40,
											marginLeft: 10,
											marginRight: 10
										}}
									/>
									<div className='ms-2 me-auto'>
										<div className='fw-bold'>
											Bar do Edinaldo
										</div>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</>
					) : (
						<>
							<Text style={styles.subtitle}>
								Recomendados para você
							</Text>
							<Text style={styles.description}>
								Estabelecimentos que você pode gostar
							</Text>
							<ListGroup as='ul'>
								<ListGroup.Item
									onClick={onPressLatest}
									as='li'
									className='d-flex justify-content-between align-items-start'
									style={{
										border: 'none',
										marginTop: 10,
										marginBottom: 10
									}}
								>
									<img
										src={exampleImage}
										className='rounded-circle'
										style={{
											width: 40,
											height: 40,
											marginLeft: 10,
											marginRight: 10
										}}
									/>
									<div className='ms-2 me-auto'>
										<div className='fw-bold'>
											Pinguço's Bar
										</div>
									</div>
								</ListGroup.Item>
								<ListGroup.Item
									onClick={onPressLatest}
									as='li'
									className='d-flex justify-content-between align-items-start'
									style={{
										border: 'none',
										marginTop: 10,
										marginBottom: 10
									}}
								>
									<img
										src={exampleImage}
										className='rounded-circle'
										style={{
											width: 40,
											height: 40,
											marginLeft: 10,
											marginRight: 10
										}}
									/>
									<div className='ms-2 me-auto'>
										<div className='fw-bold'>Mocotó</div>
									</div>
								</ListGroup.Item>
								<ListGroup.Item
									onClick={onPressLatest}
									as='li'
									className='d-flex justify-content-between align-items-start'
									style={{
										border: 'none',
										marginTop: 10,
										marginBottom: 10
									}}
								>
									<img
										src={exampleImage}
										className='rounded-circle'
										style={{
											width: 40,
											height: 40,
											marginLeft: 10,
											marginRight: 10
										}}
									/>
									<div className='ms-2 me-auto'>
										<div className='fw-bold'>
											Restaurante do Povão
										</div>
									</div>
								</ListGroup.Item>
							</ListGroup>
						</>
					)}
				</View>
				{(popular.length > 0 && (
					<>
						<Text style={styles.subtitle}>Populares</Text>
						<Text style={styles.description}>
							Estabelecimentos mais populares
						</Text>
						<FlatList
							data={popular}
							renderItem={({ id, name, rating, total }: any) => {
								return (
									<>
										{id}
										{name}
										{rating}
										{total}
									</>
								)
							}}
							keyExtractor={(item) => item.idRestaurante}
							horizontal={true}
							numColumns={2}
							showsHorizontalScrollIndicator={false}
							style={{ marginBottom: 20 }}
						/>
					</>
				)) || <></>}
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen
