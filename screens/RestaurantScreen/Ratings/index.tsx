import React from 'react'
import { Button, Card } from 'react-bootstrap'
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	RefreshControl,
	SafeAreaView,
	Text,
	TextInput,
	View
} from 'react-native'
import styles from './style'

const Ratings = ({ navigation, route }: any) => {
	const [avaliacoes, setAvaliacoes] = React.useState<any[]>([])
	const [message, setMessage] = React.useState<string>('')
	const [uniqueValue, setUniqueValue] = React.useState(1)
	const [feedback, setFeedback] = React.useState<string>('')
	const [rating, setRating] = React.useState<string>('')
	const restaurante = route.params.restaurante
	const [refresh, setRefresh] = React.useState(false)
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		console.log('kkkkkk', route.params.restaurante)

		const focusHandler = navigation.addListener('focus', () => {
			setTimeout(() => {
				refreshScreen()
			}, 250)
		})

		return focusHandler
	}, [navigation, uniqueValue])

	const refreshScreen = (): void => {
		setRefresh(true)
		setRating('')
		setFeedback('')
		setUniqueValue(uniqueValue + 1)
		fetchRatings()
		setRefresh(false)
		forceRemount()
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

	const checkRatingPermission = async () => {
		try {
			const response = await fetch(
				`${global.getApiUrl()}/api/checkRatingPermission`,
				{
					method: 'post',
					headers: new Headers({
						Accept: 'application/json',
						'Content-Type': 'application/json'
					}),
					body: JSON.stringify({
						idRestaurante: restaurante.idRestaurante,
						idCliente: global.user.id
					})
				}
			)
			const json = await response.json()
			if (json.status) {
				setMessage('')
				return true
			} else {
				setMessage(json.message)
				return false
			}
		} catch (error) {
			console.error(error)
		}
	}

	const fetchRatings = async () => {
		setAvaliacoes([])

		try {
			await fetch(
				`${global.getApiUrl()}/api/getAvaliacoesByRestaurante`,
				{
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						idRestaurante: restaurante.idRestaurante
					})
				}
			)
				.then((response: Response): Promise<JSON> => response.json())
				.then((json: any): void => {
					setAvaliacoes(json)

					console.log(avaliacoes)
				})
				.catch((error: Error): void => {
					console.error(error)
				})
				.finally((): void => {
					setLoading(false)
					setRating('')
					setFeedback('')
				})
		} catch (error: unknown) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	}

	const renderAvaliacoes = (item: any): JSX.Element => {
		return (
			<View key={uniqueValue}>
				<Card
					style={{
						width: Dimensions.get('window').width * 0.9,
						border: 'none'
					}}
				>
					<Card.Body>
						<Card.Title>
							{item.item.nomeCliente} - {item.item.notaAvaliacao}
						</Card.Title>
						<Card.Subtitle className='mb-2 text-muted'>
							{item.item.dtAvaliacao}
						</Card.Subtitle>
						<Card.Text>{item.item.descAvaliacao}</Card.Text>
					</Card.Body>
				</Card>
			</View>
		)
	}

	const submitRating = async (): Promise<any> => {
		try {
			if (!global.isLogged) {
				setMessage('Você precisa estar logado para avaliar!')
				return
			}

			const params = JSON.stringify({
				idRestaurante: restaurante.idRestaurante,
				idCliente: global.user.id,
				descAvaliacao: feedback,
				notaAvaliacao: rating,
				dtAvaliacao: new Date()
			})

			if (!checkRatingPermission()) {
				try {
					await fetch(`${global.getApiUrl()}/api/postAvaliacao`, {
						method: 'POST',
						headers: {
							Accept: 'application/json',
							'Content-Type': 'application/json',
							Authorization: `Bearer ${global.getToken()}`
						},
						body: params
					})
						.then((response) => response.json())
						.then((json) => {
							window.alert('Avaliação criada com sucesso')
						})
						.catch((error) => {
							console.error(error)
						})
						.finally(() => {
							setFeedback('')
							setRating('')
							setMessage('')
						})
				} catch (error: unknown) {
					console.log(error)
				} finally {
					setLoading(false)
					forceRemount()
				}
			}
		} catch (error: unknown) {
			if (!global.isLogged) {
				setMessage('Você precisa estar logado para avaliar!')
			}

			console.log(error)
		}
	}

	return (
		<>
			{loading ? (
				<View style={styles.container}>
					<ActivityIndicator
						style={{
							marginTop: '75%'
						}}
						size='large'
						color='#FF0000'
					/>
				</View>
			) : (
				<SafeAreaView
					style={{
						backgroundColor: '#fff',
						alignItems: 'flex-start',
						justifyContent: 'flex-start'
					}}
					key={uniqueValue}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'center',
							justifyContent: 'center'
						}}
					>
						<TextInput
							multiline={true}
							style={{
								padding: 10,
								width: Dimensions.get('window').width - 40,
								height: 100,
								borderColor: 'gray',
								borderWidth: 1,
								borderRadius: 10,
								marginBottom: 10,
								marginLeft: '5%'
							}}
							placeholder='Escreva sua avaliação'
							onChangeText={(text: any) => setFeedback(text)}
							numberOfLines={4}
							maxLength={40}
							editable
							value={feedback}
						/>

						<TextInput
							keyboardType='numeric'
							style={{
								padding: 10,
								width: Dimensions.get('window').width - 40,
								height: 50,
								borderColor: 'gray',
								borderWidth: 1,
								borderRadius: 10,
								marginBottom: 10,
								marginLeft: '5%'
							}}
							placeholder='Nota'
							onChangeText={(text: any) => setRating(text)}
							editable
							value={rating}
						/>

						<Button
							variant='danger'
							style={{
								width: Dimensions.get('window').width - 40,
								marginLeft: '5%'
							}}
							onClick={() => submitRating()}
						>
							Avaliar
						</Button>

						<View
							style={{
								marginVertical: '5%'
							}}
						>
							<Text
								style={{
									color: '#963333',
									fontSize: 16,
									fontWeight: 'bold'
								}}
							>
								{message}
							</Text>
						</View>
					</View>
					<View
						style={{
							marginLeft: '3%',
							marginTop: '2.5%',
							marginBottom: '5%'
						}}
					>
						<FlatList
							data={avaliacoes}
							showsVerticalScrollIndicator={false}
							renderItem={renderAvaliacoes}
							scrollEnabled={true}
							keyExtractor={(item): any => item.idAvaliacao}
							refreshControl={
								<RefreshControl
									refreshing={refresh}
									onRefresh={onRefresh}
								/>
							}
						/>
					</View>
				</SafeAreaView>
			)}
		</>
	)
}

export default Ratings
