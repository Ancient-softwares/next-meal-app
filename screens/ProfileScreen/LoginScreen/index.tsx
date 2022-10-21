import React from 'react';
import styles from './style';
import { Form, Button } from 'react-bootstrap';
import { TextInput, Text, View, SafeAreaView } from 'react-native';
import Joi from 'joi';

const API_URL: string = process.env.URL || 'http://127.0.0.1:8000';

function LoginScreen({ navigation }: { navigation: any }) {
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [message, setMessage] = React.useState<string>('');
	const [token, setToken] = React.useState<string>('');

	const schema = Joi.object({
		emailCliente: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),
		senhaCliente: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),
	});

	const handleSubmit = async (e: Event): Promise<void> => {
		e.preventDefault();

		const packets = {
			emailCliente: email,
			senhaCliente: password,
		};

		if (schema.validate(packets)) {
			await fetch(`${API_URL}/api/loginCliente`, {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					emailCliente: email,
					senhaCliente: password,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					const json: any = JSON.parse(JSON.stringify(response));
					console.table(json);

					setToken(response.token);
					console.log(token, response.token);

					navigation.navigate('Main', { token: response.token });
				})
				.catch((error) =>
					console.log('ERROR:: ' + JSON.stringify(error.response))
				);
		} else {
			setMessage('Preencha todos os campos corretamente');
		}
	};

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ marginTop: 35, backgroundColor: '#fff' },
			]}
		>
			<Form onSubmit={handleSubmit} style={styles.container}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						onChangeText={(text) => setEmail(text)}
						placeholder="Enter email"
						placeholderTextColor="gray"
					/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Senha</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						secureTextEntry={true}
						onChangeText={(text) => setPassword(text)}
						placeholder="Password"
						placeholderTextColor="gray"
					/>
				</Form.Group>
				<Button variant="outline-danger" type="submit" onClick={() => navigation.navigate('Home')}>
					Entrar
				</Button>

				<View style={{ marginVertical: '5%' }}>
					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Text
							style={{
								color: '#000000',
							}}
							onPress={() => navigation.navigate('Register')}
						>
							Não possui uma conta?
							<Text style={{ color: '#963333' }}>
								{' '}
								Cadastre-se
							</Text>
						</Text>
					</Form.Group>
				</View>
			</Form>
		</SafeAreaView>
	);
}

export default LoginScreen;
