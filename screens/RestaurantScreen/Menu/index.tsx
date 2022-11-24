import React from 'react'
import { Button, ListGroup, Card } from 'react-bootstrap'
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Modal,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	View
} from 'react-native'
import styles from './style'

const Menu = ({ navigation, route }: any) => {
	const [message, setMessage] = React.useState<string>('')
	const [uniqueValue, setUniqueValue] = React.useState<number>(1)
	let idRestaurante = route.params.idRestaurante
	const [cardapio, setCardapio] = React.useState<any[]>([])
	const exampleImage: string = require('../../../assets/example.jpeg')
	const [refresh, setRefresh] = React.useState<boolean>(false)
	const [loading, setLoading] = React.useState<boolean>(true)
	const [modalVisible, setModalVisible] = React.useState<boolean>(false)
	const [infoPrato, setInfoPrato] = React.useState<any>({
		nomePrato: '',
		tipoPrato: '',
		valorPrato: ''
	})
	const [ingredientesPrato, setIngredientesPrato] = React.useState<string[]>(
		[]
	)

	React.useEffect((): void => {
		navigation.addListener('focus', async () => {
			setLoading(true)

			setTimeout((): void => {
				if (route.params.idRestaurante != idRestaurante) {
					forceRemount()
					idRestaurante = route.params.idRestaurante
					getRestaurant()
				} else {
					if (refreshScreen()) {
						setLoading(false)

						return
					}
				}
			}, 1000)
		})
	}, [navigation, global.idRestaurante])

	const refreshScreen = (): boolean => {
		try {
			setRefresh(true)
			setUniqueValue(uniqueValue + 1)
			fetchMenu()
			setRefresh(false)
			forceRemount()

			return true
		} catch (err) {
			return false
		}
	}

	const wait = (timeout: number) => {
		return new Promise((resolve) => setTimeout(resolve, timeout))
	}

	const forceRemount = (): void => {
		setUniqueValue(uniqueValue + 1)
	}

	const onRefresh = React.useCallback(() => {
		wait(250).then(() => forceRemount())
	}, [])

	const fetchMenu = async () => {
		try {
			await fetch(`${global.getApiUrl()}/api/getPratosByRestaurante`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					idRestaurante: idRestaurante
				})
			})
				.then((response: any): Promise<JSON> => response.json())
				.then((json: any): void => {
					console.log(json)

					if (cardapio) {
						setRefresh(true)
						setCardapio(json)
						setRefresh(false)
					}
				})
				.catch((err: Error): void => console.error(err))
		} catch (error: unknown) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	const renderCardapio = (item: any): JSX.Element => {
		return (
			<View
			style={{width:'100%'}}
			>
				<Card style={styles.card}>
					<View style={{
					}}>
					<Card.Img
						variant='top'
						style={styles.cardImg}
						src={require('../../../assets/example.jpeg')}
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
										{item.item.nomePrato}
								</Text>
							</Card.Title>
							<Card.Text>
								<Text
									style={[
										styles.subtitle,
										{
											color: '#000',
											fontFamily:'math',
											fontSize:18
										}
									]}
								>
									Categoria: {item.item.tipoPrato}
								</Text>
							</Card.Text>
							<Card.Text>
								<Text
									style={[
										styles.subtitle,
										{
											color: '#000',
											fontFamily:'math',
											fontSize:18
										}
									]}
								>
									Valor: {item.item.valorPrato}
								</Text>
							</Card.Text>
						</View>
						<View>
							<Button
								style=
								{{

									padding: 10,
									marginTop: 20
								}}
								variant='danger'
								onClick=
								{
									(): void => {
										setInfoPrato(item.item)
										setIngredientesPrato(
											item.item.ingredientesPrato.split(',')
										)
										console.log(ingredientesPrato)
										setModalVisible(true)
									}
								}
							>
								Ver Mais
							</Button>
						</View>
					</Card.Body>
				</Card>

				<Modal
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible)
					}}
				>
					<ScrollView>
						<View style={styles.centeredView}>
							<View style={styles.modalView}>
								<Text
									style={[
										styles.listTitle,
										{
											fontSize: 20,
											fontWeight: 'bold',
											fontStyle: 'italic',
											color: '#963333'
										}
									]}
								>
									Informações sobre o prato
								</Text>
								<br />
								<br />

								<View
									style={{
										alignItems: 'flex-start'
									}}
								>
									<Text style={styles.modalText}>
										<strong>Nome do prato: </strong>
										{infoPrato.nomePrato}
									</Text>
									<Text style={styles.modalText}>
										<strong>Tipo de refeição: </strong>
										{infoPrato.tipoPrato}
									</Text>
									<Text style={styles.modalText}>
										<strong>Ingredientes: </strong>
									</Text>
									<FlatList
										data={ingredientesPrato}
										renderItem={(item: any) => {
											return (
												<Text
													style={[
														styles.modalText,
														{
															marginLeft: 10
														}
													]}
												>
													{item.index + 1}){' '}
													{item.item}
												</Text>
											)
										}}
										keyExtractor={(
											item: string,
											index: number
										) => index.toString()}
									/>
									<Text style={styles.modalText}>
										<strong>Valor: </strong>
										R$ {infoPrato.valorPrato}
									</Text>
								</View>
								<View style={[styles.row, { marginBottom: 5 }]}>
									<Button
										variant='danger'
										onClick={(): void =>
											setModalVisible(false)
										}
										style={{
											marginTop: 15,
											marginBottom: 5,
											width: '100%'
										}}
									>
										<Text
											style={{
												paddingHorizontal: 30,
												color: '#fff'
											}}
										>
											Fechar
										</Text>
									</Button>
								</View>
							</View>
						</View>
					</ScrollView>
				</Modal>
			</View>
		)
	}

	return (
		<>
			{loading ? (
				<View
					style={{margin:-8}}
				>
					<ActivityIndicator
						style={{
							marginTop: '70%'
						}}
						size='large'
						color='#963333'
					/>
				</View>
			) : (
				<SafeAreaView
					style={[
						{
							height: '100%',
							flexDirection: 'column',
							flex: 1,
							justifyContent: 'flex-start',
							backgroundColor: '#fff'
						}
					]}
					key={uniqueValue}
				>
					<ScrollView
						style={{
							width: '100%',
							height: '100%'
						}}
						refreshControl={
							<RefreshControl
								refreshing={refresh}
								onRefresh={onRefresh}
							/>
						}
						scrollEnabled={true}
						showsVerticalScrollIndicator={false}
					>
						<View style={styles.rowList}>
							<View
								style={{
									marginLeft: '6%',
									marginTop: '2.5%'
								}}
							>
								<ListGroup>
									<FlatList
										data={cardapio}
										showsHorizontalScrollIndicator={false}
										scrollEnabled={true}
										keyExtractor={(item: any) =>
											item.idPrato
										}
										renderItem={renderCardapio}
										refreshControl={
											<RefreshControl
												refreshing={refresh}
												onRefresh={onRefresh}
											/>
										}
									/>
								</ListGroup>
							</View>
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</>
	)
}

export default Menu
