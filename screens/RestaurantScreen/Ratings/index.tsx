import Joi, { ObjectSchema } from 'joi'
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
	let idRestaurante = route.params.idRestaurante
	const [refresh, setRefresh] = React.useState(false)
	const [loading, setLoading] = React.useState(true)
	const [isSuccess, setIsSuccess] = React.useState(false)
	const [btnLabel, setBtnLabel] = React.useState<string>('Postar Avaliação')

	React.useEffect(() => {
		navigation.addListener('focus', () => {
			setLoading(true)
			checkIfClientHasAlreadyRated()

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
	}, [navigation, global.idRestaurante, uniqueValue])

	const checkIfClientHasAlreadyRated = async (): Promise<void> => {
		/* let hasRated = false

		avaliacoes.forEach((item: any): void => {
			if (item.idCliente == global.idCliente) {
				setRating(item.notaAvaliacao)
				setFeedback(item.descAvaliacao)
				setBtnLabel('Atualizar Avaliação')

				hasRated = true
			}
		})

		return hasRated */
		await fetch(
			`${global.getApiUrl()}/api/findIfClientHasRatingByRestaurant`,
			{
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}),
				body: JSON.stringify({
					idCliente: global.user.id,
					idRestaurante: idRestaurante
				})
			}
		)
			.then((response: Response): Promise<any> => response.json())
			.then((json: any) => {
				if (json !== null) {
					Object.keys(json).forEach((key: any) => {
						console.log(json)

						if (json[key].idCliente == global.user.id) {
							console.log('foi', json[key])

							setRating(json[key].notaAvaliacao)
							setFeedback(json[key].descAvaliacao)
							setBtnLabel('Atualizar Avaliação')

							console.log('true')
						}
					})
				}
			})
			.catch((error: Error) => {
				console.error(error)
			})
	}

	const refreshScreen = (): boolean => {
		try {
			setRefresh(true)
			setRating('')
			setFeedback('')
			setMessage('')
			fetchRatings()
			forceRemount()
			setRefresh(false)

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
						idRestaurante: idRestaurante,
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
						idRestaurante: idRestaurante
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

	const schema: ObjectSchema<any> = Joi.object({
		feedback: Joi.string().required(),
		rating: Joi.string().required()
	})

	const submitRating = async (): Promise<any> => {
		try {
			if (!global.isLogged) {
				setMessage('Você precisa estar logado para avaliar!')
				return
			}

			const params = JSON.stringify({
				idRestaurante: idRestaurante,
				idCliente: global.user.id,
				descAvaliacao: feedback,
				notaAvaliacao: rating,
				dtAvaliacao: new Date()
			})

			const packets = JSON.stringify({
				feedback: feedback,
				rating: rating
			})

			if (schema.validate(packets)) {
				if (checkRatingPermission()) {
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
								if (
									json.message ===
									'Avaliação criada com sucesso!'
								) {
									refreshScreen()
									setMessage('Avaliação criada com sucesso!')
									setIsSuccess(true)
								} else {
									setMessage(json.message)
									setIsSuccess(false)
								}
							})
							.catch((error) => {
								console.error(error)
							})
							.finally(() => {
								setFeedback('')
								setRating('')

								forceRemount()
							})
					} catch (error: unknown) {
						console.log(error)
					} finally {
						setLoading(false)
						forceRemount()
					}
				}
			} else {
				setMessage('Preencha todos os campos!')
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
							{btnLabel}
						</Button>

						<View
							style={{
								marginVertical: '5%',
								backgroundColor: '#fff'
							}}
						>
							{isSuccess ? (
								<Text
									style={{
										color: '#2ea621',
										fontSize: 16,
										fontWeight: 'bold',
										textAlign: 'center'
									}}
								>
									{message}
								</Text>
							) : (
								<Text
									style={{
										color: '#963333',
										fontSize: 16,
										fontWeight: 'bold',
										textAlign: 'center'
									}}
								>
									{message}
								</Text>
							)}
						</View>
					</View>
					<View
						style={{
							marginLeft: '3%',
							marginTop: '2.5%',
							marginBottom: '5%',
							backgroundColor: '#fff'
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
