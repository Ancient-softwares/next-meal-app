import React from 'react'
import { Carousel } from 'react-bootstrap'
import {
	Dimensions,
	FlatList,
	SafeAreaView,
	ScrollView,
	Text,
	View
} from 'react-native'
import 'react-native-gesture-handler'
import '../../constants/globals'
import { TipoRestaurante } from '../../entities/TipoRestaurante'
import styles from './style'

const HomeScreen = ({ navigation }: any): JSX.Element => {
	const exampleImage = require('../../assets/example.jpeg')
	const DATA: Array<Object> = Array<any>()
	const [filteredDataSource, setFilteredDataSource] = React.useState<
		Array<Object>
	>([])
	const [masterDataSource, setMasterDataSource] =
		React.useState<Array<Object>>(DATA)

	const [popular, setPopular] = React.useState<Array<Object>>([])

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
				let temp = Array<any>()

				Object.keys(json).forEach((key: string) => {
					temp.push(json[key])
				})

				Object.keys(temp[1]).forEach((key: string) => {
					popular.push(temp[1][key])
				})

				console.table(popular)
			})
			.catch((err: Error): void => console.error(err))
	}

	const onPressLatest = (item: any) => {
		navigation.navigate('About', {
			restaurant: item
		})
	}

	const onPressCategory = (item: any) => {
		if (item[0].item.tipoRestaurante === null) {
			navigation.navigate('Restaurants')
		} else {
			const categoria = new TipoRestaurante({
				id: item[0].item.tipoRestaurante.id,
				categoria: item[0].item.tipoRestaurante
			})

			categoria.destroy()

			navigation.navigate('Category', {
				...item[0].item
			})
		}
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

				setFilteredDataSource(DATA)
				setMasterDataSource(DATA)
			})
			.catch((err: Error): void => console.error(err))
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

	const Popular = (...item: any[]): JSX.Element => {
		return (
			<View style={styles.container}>
				<img
					src={exampleImage}
					onClick={() => onPressLatest(item)}
					className='rounded-circle'
					style={{
						width: 90,
						height: 90,
						marginLeft: 10,
						marginRight: 10
					}}
				/>
				<Text style={styles.nameCategory}>
					{item[0].item.nomeRestaurante || 'did not return'} -{' '}
					{item[0].item.media}
				</Text>
			</View>
		)
	}

	const renderItem = (item: any): JSX.Element => {
		return <Item {...item} />
	}

	const renderPopular = (item: any): JSX.Element => {
		return <Popular {...item} />
	}

	React.useEffect(() => {
		getRestaurant()
		getRecommended()
	}, [])

	return (
		<SafeAreaView style={styles.container}>
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
					<>
						<Text style={styles.subtitle}>Populares</Text>
						<Text style={styles.description}>
							Estabelecimentos mais populares
						</Text>
						<FlatList
							data={popular}
							renderItem={renderPopular}
							keyExtractor={(item: any) => item.idRestaurante}
							horizontal={false}
							showsHorizontalScrollIndicator={false}
							style={{ marginBottom: 20 }}
						/>
					</>
				)) || (
					<>
						{console.log(popular)}
						<Text style={styles.subtitle}>
							Oops, parece que ocorreu um erro ao buscar suas
							recomendações
						</Text>
					</>
				)}
			</ScrollView>
		</SafeAreaView>
	)
}

export default HomeScreen
