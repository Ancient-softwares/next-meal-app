import React from 'react';
import { Button, Carousel, Form, Stack } from 'react-bootstrap';
import { View, Text, SafeAreaView } from 'react-native';
import styles from './style';
import Joi, { ObjectSchema } from 'joi';
import axios, { AxiosError, AxiosResponse } from 'axios';

const AboutScreen = ({ navigation, route }: any): JSX.Element => {
	const exampleImage: string = require('../../../assets/example.jpeg');
	const API_URL = process.env.URL || 'http://127.0.0.1:8000';

	const [date, setDate] = React.useState();
	const [time, setTime] = React.useState();
	const [people, setPeople] = React.useState();
	const [message, setMessage] = React.useState<string>();

	const schema: ObjectSchema<any> = Joi.object({
		date: Joi.date().required().min('now'),
		time: Joi.date().required().min('now'),
		people: Joi.number().required().min(1).max(10).integer(),
	});

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();

		const packets = {
			dataReserva: date,
			horaReserva: time,
			numPessoas: people,
		};

		if (schema.validate(packets)) {
			await axios({
				method: 'post',
				url: `${API_URL}/api/reserva`,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				data: JSON.stringify({
					dataReserva: date,
					horaReserva: time,
					numPessoas: people,
				}),
			})
				.then((response: AxiosResponse<JSON>): void => {
					console.log('RES::' + JSON.stringify(response));

					setMessage('Reserva realizada com sucesso!');
				})
				.catch((error: AxiosError<any>): void => {
					setMessage(
						'Erro ao realizar reserva. O restaurante não está com disponibilidade para aceitar sua reserva ou você preencheu os dados incorretamente!'
					);
				});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.carousel}>
				<Carousel fade>
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100"
							src={exampleImage}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>Destaques</h3>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100"
							src={exampleImage}
							alt="Second slide"
						/>

						<Carousel.Caption>
							<h3>Destaques</h3>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={3000}>
						<img
							className="d-block w-100"
							src={exampleImage}
							alt="Third slide"
						/>

						<Carousel.Caption>
							<h3>Third slide label</h3>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</View>

			<View
				style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					marginTop: '15%',
				}}
			>
				<Stack direction="horizontal" gap={2}>
					<div className="bg-light">
						<img
							src={exampleImage}
							className="rounded-circle"
							style={{
								width: 40,
								height: 40,
								marginLeft: 10,
								marginRight: 10,
							}}
						/>
					</div>
					<div className="bg-light">
						<Text style={styles.subtitle}>João's Bar</Text>
						<br />
						<Text style={styles.description}>
							Rua Veiga Filho, 44, Higienópolis, São Paulo
						</Text>
					</div>
				</Stack>
			</View>

			<View
				style={{
					flex: 1,
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					marginBottom: '15%',
				}}
			>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId="formBasicDate">
						<Form.Label>Data</Form.Label>
						<Form.Control
							type="date"
							placeholder="Data"
							onChange={(e: any) => setDate(e.target.value)}
						/>
					</Form.Group>

					<Form.Group controlId="formBasicHour">
						<Form.Label>Hora</Form.Label>
						<Form.Control type="time" placeholder="Hora" />
					</Form.Group>

					<Form.Group controlId="formBasicPeople">
						<Form.Label>Pessoas</Form.Label>
						<Form.Control type="number" placeholder="Pessoas" />
					</Form.Group>

					<Form.Group controlId="formBasicSubmit">
						<Button
							style={{ marginTop: 20 }}
							variant="outline-danger"
							type="submit"
						>
							<Text
								style={[styles.subtitle, { marginRight: 20 }]}
							>
								Reservar
							</Text>
						</Button>
					</Form.Group>
				</Form>
			</View>
		</SafeAreaView>
	);
};

export default AboutScreen;
