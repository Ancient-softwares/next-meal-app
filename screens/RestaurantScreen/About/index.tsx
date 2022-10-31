import Joi, { ObjectSchema } from "joi"
import React from "react"
import { Button, Form, Stack } from "react-bootstrap"
import {
	Dimensions,
	Modal,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	View
} from "react-native"
import styles from "./style"

const AboutScreen = ({
	navigation,
	route
}: {
	navigation: any
	route: any
}): JSX.Element => {
	const exampleImage: string = require("../../../assets/example.jpeg")
	const [modalVisible, setModalVisible] = React.useState(false)
	const [date, setDate] = React.useState<Date>(new Date())
	const [hour, setHour] = React.useState<Date>(new Date())
	const [people, setPeople] = React.useState<number>()
	let restaurante: any = route.params

	const ModalRender = ({
		title,
		message
	}: {
		title: string
		message: string
	}) => {
		return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible)
				}}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>{title}</Text>
						<Text style={styles.modalText}>{message}</Text>
						<Pressable
							style={[styles.button, styles.buttonClose]}
							onPress={() => setModalVisible(!modalVisible)}
						>
							<Text style={styles.textStyle}>Fechar</Text>
						</Pressable>
					</View>
				</View>
			</Modal>
		)
	}

	const schema: ObjectSchema<any> = Joi.object({
		date: Joi.date().required().min("now"),
		people: Joi.number().required().min(1).max(10).integer(),
		hour: Joi.date().required().min("now")
	})

	const showInfo = async () => {
		console.table(restaurante)
	}

	React.useEffect(() => {
		showInfo()

		console.log(global.getToken())
		console.table(global.getUser())
		console.log(global.user.id)
	}, [])

	const bearerTokenTest: React.FormEventHandler<HTMLFormElement> = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault()

		try {
			await fetch(`${global.API_URL}/api/reserva`, {
				method: "POST",
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
				await fetch(`http://127.0.0.1:8000/api/reserva`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Bearer ${global.getToken()}`
					},
					body: JSON.stringify({
						dataReserva: date.toString(),
						horaReserva: hour.toString() + ":00",
						numPessoas: people,
						idCliente: (global.user.id = 1),
						idRestaurante: restaurante.idRestaurante,
						idStatusReserva: 1
					})
				})
					.then((response) => response.json())
					.then((json) => {
						console.log(json)

						if (json.status === 200) {
							ModalRender({
								title: "Sucesso",
								message: json.message
							})

							window.alert(json.message)
						} else {
							ModalRender({
								title: "Erro",
								message: json.message
							})

							window.alert(json.message)
						}
					})
					.catch((error) => {
						console.error(error)
					})
			} catch (error) {
				console.log(error)
			}
		}
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.tecoVermeio}></View>
			<ScrollView>
				<View
					style={{
						flex: 1,
						alignItems: "flex-start",
						justifyContent: "flex-start",
						marginTop: "5%"
					}}
				>
					<Stack
						direction="horizontal"
						gap={2}
						style={{ marginLeft: 96 }}
					>
						<div style={styles.PositionImgRestaurant}>
							<img
								src={exampleImage}
								className="rounded-circle"
								style={{
									width: 100,
									height: 100,
									marginLeft: 5,
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
								{restaurante.rating[""]}: Classificação: {""}
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
						alignItems: "center",
						justifyContent: "center",
						marginBottom: "15%",
						backgroundColor: "#ffeeee",
						padding: 55
					}}
				>
					<Form onSubmit={handleSubmit} style={styles.formsStyle}>
						<Form.Group controlId="formBasicDate">
							<Form.Label>Data</Form.Label>
							<Form.Control
								type="date"
								placeholder="Data da reserva"
								onChange={(e: any) => setDate(e.target.value)}
								style={{
									width: Dimensions.get("window").width * 0.75
								}}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicHour">
							<Form.Label>Hora</Form.Label>
							<Form.Control
								type="time"
								placeholder="Hora da reserva"
								onChange={(e: any) => setHour(e.target.value)}
							/>
						</Form.Group>

						<Form.Group controlId="formBasicPeople">
							<Form.Label>Pessoas</Form.Label>
							<Form.Control
								type="number"
								placeholder="Número de pessoas"
								onChange={(e: any) =>
									setPeople(Number.parseInt(e.target.value))
								}
							/>
						</Form.Group>

						<Form.Group
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center"
							}}
							controlId="formBasicSubmit"
						>
							<Button
								variant="primary"
								type="submit"
								style={{
									width: Dimensions.get("window").width * 0.75
								}}
							>
								<Text style={styles.subtitle}>Reservar</Text>
							</Button>
						</Form.Group>
					</Form>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

export default AboutScreen
