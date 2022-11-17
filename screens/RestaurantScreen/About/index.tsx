import Joi, { ObjectSchema } from 'joi'
import React from 'react'
import { Button, Form, Stack } from 'react-bootstrap'
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native'
import styles from './style'

const AboutScreen = ({ navigation, route }: any): JSX.Element => {
	const exampleImage: string = require('../../../assets/example.jpeg')
	const [date, setDate] = React.useState<Date>(new Date())
	const [hour, setHour] = React.useState<Date>(new Date())
	const [people, setPeople] = React.useState<number>()
	const restaurante: any = route.params
	const [message, setMessage] = React.useState<string>('')
	const [uniqueValue, setUniqueValue] = React.useState(1)

	React.useEffect((): void => {
		navigation.addListener('focus', () => {
			refreshScreen()
			forceRemount()
			global.idRestaurante = restaurante.idRestaurante
			console.log(global.idRestaurante)
		})
	}, [navigation, restaurante.idRestaurante])

	const forceRemount = (): void => {
		setUniqueValue(uniqueValue + 1)
	}

	const refreshScreen = (): void => {
		setMessage('')
		setDate(new Date())
		setHour(new Date())
		setPeople(0)
	}

	const schema: ObjectSchema<any> = Joi.object({
		date: Joi.date().required().min('now'),
		people: Joi.number().required().min(1).max(10).integer(),
		hour: Joi.date().required().min('now')
	})

	const bearerTokenTest: React.FormEventHandler<HTMLFormElement> = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault()

		try {
			await fetch(`${global.API_URL}/api/reserva`, {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${global.getToken()}`
				},
				body: JSON.stringify({
					idCliente: global.user.id
				})
			})
				.then((response) => response.json())
				.then((json) => {
					console.log(json)
				})
				.catch((error) => {
					console.error(error)
				})
				.finally(() => {
					setDate(new Date())
					setHour(new Date())
					setPeople(0)
				})
		} catch (error) {
			console.log(error)
		}
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault()

		const packets = {
			date: date,
			hour: hour,
			people: people
		}

		if (schema.validate(packets)) {
			try {
				await fetch(`${global.getApiUrl()}/api/reserva`, {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
						Authorization: `Bearer ${global.getToken()}`
					},
					body: JSON.stringify({
						dataReserva: date.toString(),
						horaReserva: hour.toString() + ':00',
						numPessoas: people,
						idCliente: global.user.id,
						idRestaurante: restaurante.idRestaurante,
						idStatusReserva: 1
					})
				})
					.then((response) => response.json())
					.then((json) => {
						console.log(json)

						if (json.status === 200) {
							setMessage(json.message)
						} else {
							setMessage(json.message)
						}
					})
					.catch((error) => {
						setMessage(error.message)
					})
			} catch (error: unknown) {
				setMessage(
					'Você precisa estar logado para agendar uma reserva!'
				)
			}
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.tecoVermeio}></View>
			<ScrollView
				style={{ marginLeft: '-10%' }}
				showsVerticalScrollIndicator={false}
			>
				<View
					style={{
						flex: 1,
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						marginTop: '5%'
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
									marginLeft: 25,
									marginRight: 10
								}}
							/>
						</div>
						<div>
							<Text style={styles.subtitle}>
								{restaurante.nomeRestaurante}
							</Text>
							<br />
							<Text style={styles.description}>
								Classificação:{' '}
								{Number.parseFloat(restaurante.notaAvaliacao)}
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
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						marginHorizontal: '10%',
						marginBottom: '5%',
						marginTop: '-15.5%'
					}}
				>
					<Text style={styles.subtitle}>Descrição</Text>

					<Text
						style={[
							styles.description,
							{
								textAlign: 'justify',
								marginTop: '5%'
							}
						]}
					>
						{restaurante.descricaoRestaurante}
					</Text>
				</View>

				<View
					style={{
						flex: 1,
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						marginHorizontal: '10%',
						marginTop: '6.5%'
					}}
				>
					<Text style={styles.subtitle}>Contato</Text>
					<Text
						style={[
							styles.description,
							{
								textAlign: 'justify',
								marginTop: '5%'
							}
						]}
					>
						Telefone: {restaurante.telRestaurante}
					</Text>
					<Text
						style={[
							styles.description,
							{
								textAlign: 'justify',
								marginTop: '5%'
							}
						]}
					>
						Email: {restaurante.emailRestaurante}
					</Text>
					<Text
						style={[
							styles.description,
							{
								textAlign: 'justify',
								marginTop: '5%'
							}
						]}
					>
						Endereço: {restaurante.ruaRestaurante} -{' '}
						{restaurante.bairroRestaurante}
					</Text>
					<Text
						style={[
							styles.description,
							{
								textAlign: 'justify',
								marginTop: '5%'
							}
						]}
					>
						Cidade: {restaurante.cidadeRestaurante} /{' '}
						{restaurante.estadoRestaurante}
					</Text>
				</View>

				<View
					style={{
						flex: 1,
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						marginHorizontal: '10%',
						marginVertical: '5%'
					}}
				>
					<Text style={styles.subtitle}>Horários do restaurante</Text>

					<Text
						style={[
							styles.description,
							{
								textAlign: 'justify',
								marginTop: '3.5%'
							}
						]}
					>
						Segunda-feira: {restaurante.horarioAberturaRestaurante}{' '}
						- {restaurante.horarioFechamentoRestaurante}
						<br />
						<br />
						Terça-feira: {
							restaurante.horarioAberturaRestaurante
						} - {restaurante.horarioFechamentoRestaurante}
						<br />
						<br />
						Quarta-feira: {
							restaurante.horarioAberturaRestaurante
						} - {restaurante.horarioFechamentoRestaurante}
						<br />
						<br />
						Quinta-feira: {
							restaurante.horarioAberturaRestaurante
						} - {restaurante.horarioFechamentoRestaurante}
						<br />
						<br />
						Sexta-feira: {
							restaurante.horarioAberturaRestaurante
						} - {restaurante.horarioFechamentoRestaurante}
						<br />
						<br />
						Sábado: {restaurante.horarioAberturaRestaurante} -{' '}
						{restaurante.horarioFechamentoRestaurante}
						<br />
						<br />
						Domingo: {restaurante.horarioAberturaRestaurante} -{' '}
						{restaurante.horarioFechamentoRestaurante}
						<br />
						<br />
					</Text>
				</View>

				<View
					style={{
						flex: 1,
						marginTop: '15%',
						marginHorizontal: '10%'
					}}
				>
					<Text style={styles.subtitle}>Cardápio</Text>
					<Button
						variant='danger'
						type='submit'
						style={{
							marginTop: '5%',
							marginBottom: '5%',
							marginLeft: '5%',
							width: Dimensions.get('window').width * 0.4,
							borderRadius: 10
						}}
						onClick={() => {
							navigation.navigate('Menu', {
								idRestaurante: global.idRestaurante
							})
						}}
					>
						<Text style={{ color: '#fff' }}>Ver cardápio</Text>
					</Button>
				</View>

				<View
					style={{
						flex: 1,
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						marginHorizontal: '10%',
						marginTop: '-15%'
					}}
				>
					<View
						style={{
							flex: 1,
							alignItems: 'flex-start',
							justifyContent: 'flex-start'
						}}
					>
						<Text
							style={[
								styles.subtitle,
								{
									textAlign: 'justify'
								}
							]}
						>
							Agendar reserva
						</Text>

						<Form onSubmit={handleSubmit} style={styles.formsStyle}>
							<Form.Group controlId='formBasicDate'>
								<Form.Label>Data</Form.Label>
								<Form.Control
									type='date'
									placeholder='Data da reserva'
									onChange={(e: any) =>
										setDate(e.target.value)
									}
									style={{
										width:
											Dimensions.get('window').width *
											0.75
									}}
								/>
							</Form.Group>

							<Form.Group controlId='formBasicHour'>
								<Form.Label>Hora</Form.Label>
								<Form.Control
									type='time'
									placeholder='Hora da reserva'
									onChange={(e: any) =>
										setHour(e.target.value)
									}
								/>
							</Form.Group>

							<Form.Group controlId='formBasicPeople'>
								<Form.Label>Pessoas</Form.Label>
								<Form.Control
									type='number'
									placeholder='Número de pessoas'
									onChange={(e: any) =>
										setPeople(
											Number.parseInt(e.target.value)
										)
									}
								/>
							</Form.Group>

							<Form.Group
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									marginTop: 20
								}}
								controlId='formBasicSubmit'
							>
								<Button
									variant='danger'
									type='submit'
									style={{
										marginTop: '5%',
										marginBottom: '5%',
										marginLeft: '5%',
										width:
											Dimensions.get('window').width *
											0.4,
										borderRadius: 10
									}}
								>
									<Text style={{ color: '#fff' }}>
										Reservar
									</Text>
								</Button>
							</Form.Group>

							<View
								style={{
									marginVertical: '5%'
								}}
							>
								<Form.Group
									className='mb-3'
									controlId='formBasicFeedback'
								>
									<View style={styles.container}>
										{message ===
										'Reserva realizada com sucesso' ? (
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
								</Form.Group>
							</View>

							<View
								style={{
									marginTop: '10%',
									marginLeft: '-2.5%'
								}}
							>
								<Text style={styles.subtitle}>
									Avaliações e comentários
								</Text>
								<Button
									variant='danger'
									style={{
										marginTop: '5%',
										marginBottom: '5%',
										marginLeft: '5%',
										width:
											Dimensions.get('window').width *
											0.4,
										borderRadius: 10
									}}
									onClick={() =>
										navigation.navigate('Ratings', {
											idRestaurante: global.idRestaurante
										})
									}
								>
									<Text style={{ color: '#fff' }}>
										Ver avaliações
									</Text>
								</Button>
							</View>
						</Form>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default AboutScreen
