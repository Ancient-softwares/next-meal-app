import { AxiosError } from 'axios'
import Joi, { ObjectSchema } from 'joi'
import React from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { Restaurante } from '../../../entities/Restaurante'
import styles from './style'

const AboutScreen = ({
	navigation,
	route,
}: {
	navigation: any
	route: any
}): JSX.Element => {
	const exampleImage: string = require('../../../assets/example.jpeg')

	const [date, setDate] = React.useState()
	const [people, setPeople] = React.useState()
	const [message, setMessage] = React.useState<string>()
	let restaurante: Restaurante = route.params

	const schema: ObjectSchema<any> = Joi.object({
		date: Joi.date().required().min('now'),
		people: Joi.number().required().min(1).max(10).integer(),
	})

	const showInfo = async () => {
		console.table(restaurante)
	}

	React.useEffect(() => {
		showInfo()
	}, [])

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault()

		const packets = {
			dataReserva: date,
			numPessoas: people,
		}

		if (schema.validate(packets)) {
			await fetch(`${global.API_URL}/api/reserva`, {
				method: 'post',
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					idCliente: global.user.id,
					idStatusReserva: 1,
					idRestaraunte: restaurante.getIdRestaurante,
					dataReserva: date,
					numPessoas: people,
				}),
			})
				.then((response: Response): Promise<JSON> => response.json())
				.then((response: JSON): void => {
					console.log('RES::' + JSON.stringify(response))

					setMessage('Reserva realizada com sucesso!')
				})
				.catch((error: AxiosError<any>): void => {
					setMessage(
						'Erro ao realizar reserva. Tente novamente mais tarde.'
					)
				})
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.tecoVermeio}></View>
			<ScrollView>
				{/* <View style={styles.carousel}>
					<img
						src={exampleImage}
						style={{
							width: Dimensions.get('window').width * 0.85,
							height: Dimensions.get('window').height * 0.3,
							marginTop: 54,
							marginLeft: 57,
							marginRight: 10,
							borderRadius: 10,
						}}
					/>
				</View> */}
				<View
					style={{
						flex: 1,
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						marginTop: '5%',
					}}
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
									marginLeft: 5,
									marginRight: 10,
								}}
							/>
						</div>
						<div>
							<Text style={styles.subtitle}>
								{restaurante.nomeRestaurante}
							</Text>
							<br />
							<Text style={styles.description}>
								{restaurante.rating['']}: Classificação: {''}
								★★★★★
								<br />
							</Text>
							<Text style={styles.description}>
								Tipo De Culinaria: {restaurante.tipoRestaurante}
							</Text>
						</div>
					</Stack>
				</View>

				<View
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						marginBottom: '15%',
						backgroundColor: '#ffeeee',
						padding: 55,
					}}
				>
					<Form onSubmit={handleSubmit} style={styles.formsStyle}>
						<Form.Group controlId='formBasicDate'>
							<Form.Label>Data</Form.Label>
							<Form.Control
								type='date'
								placeholder='Data'
								onChange={(e: any) => setDate(e.target.value)}
								style={{
									width:
										Dimensions.get('window').width * 0.75,
								}}
							/>
						</Form.Group>

						<Form.Group controlId='formBasicHour'>
							<Form.Label>Hora</Form.Label>
							<Form.Control type='time' placeholder='Hora' />
						</Form.Group>

						<Form.Group controlId='formBasicPeople'>
							<Form.Label>Pessoas</Form.Label>
							<Form.Control type='number' placeholder='Pessoas' />
						</Form.Group>

						<Form.Group
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
							controlId='formBasicSubmit'
						>
							<Button
								style={{
									marginTop: 20,
									backgroundColor: 'red',
								}}
								variant='outline-danger'
								type='submit'
								onClick={async () => {
									await fetch(
										`${global.API_URL}/api/reserva`,
										{
											method: 'post',
											mode: 'no-cors',
											headers: {
												'Content-Type':
													'application/json',
												Accept: 'application/json',
												Authorization: `Bearer ${global.getToken()}`,
											},
											/* JSON.stringify({
												idCliente: global.user.id,
												idStatusReserva: 1,
												idRestaraunte:
													restaurante.idRestaurante,
												dataReserva: date,
												numPessoas: people,
											}) */
											body: JSON.stringify({
												dataReserva: '11/10/2014',
												horaReserva: '18:00:00',
												numPessoas: 2,
												idCliente: 1,
												idRestaraunte: 1,
												idStatusReserva: 2,
											}),
										}
									)
										.then(
											(
												response: Response
											): Promise<JSON> => response.json()
										)
										.then((response: JSON): void => {
											console.log(response)
											setMessage(`${response.message}`)
										})
										.catch((error: Error): void => {
											console.log(error)
											setMessage(`${error.message}`)
										})
								}}
							>
								<Text
									style={[
										styles.subtitle,
										{ marginRight: 20, color: 'white' },
									]}
								>
									Reservar
								</Text>
							</Button>
						</Form.Group>
					</Form>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default AboutScreen
