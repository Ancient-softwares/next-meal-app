import Joi from 'joi'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { SafeAreaView, Text, TextInput, View } from 'react-native'
import styles from './style'

const API_URL: string = process.env.URL || 'http://127.0.0.1:8000'

function LoginScreen({ navigation }: { navigation: any }) {
	const [email, setEmail] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [message, setMessage] = React.useState<string>('')

	const schema = Joi.object({
		emailCliente: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),
		senhaCliente: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),
	})

	const handleSubmit = async (e: Event): Promise<void> => {
		e.preventDefault()

		const packets = {
			emailCliente: email,
			senhaCliente: password,
		}

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
					const json: any = JSON.parse(JSON.stringify(response))

					console.table(json)

					if (json.status === 200) {
						global.setToken(response.token)
						global.setIsLogged(true)
						global.getToken()

						global.setUser({
							id: json.idCliente,
							name: json.nomeCliente,
							email: json.emailCliente,
							phone: json.telefoneCliente,
							photo: json.fotoCliente,
							cep: json.cepCliente,
							number: json.numeroCliente,
							neighborhood: json.bairroCliente,
							city: json.cidadeCliente,
							state: json.estadoCliente,
						})

						console.log(global.getUser())

						window.alert('Login realizado com sucesso!')

						{
							;<Modal
								title='Login realizado com sucesso!'
								description='Você será redirecionado para a tela inicial.'
							/>
						}

						// navigation.navigate('Home')
					} else {
						setMessage(json.message)
					}
				})
				.catch((error) =>
					console.log('ERROR:: ' + JSON.stringify(error.response))
				)
		} else {
			setMessage('Preencha todos os campos corretamente')
		}
	}

	return (
		<SafeAreaView
			style={[
				styles.container,
				{ marginTop: 35, backgroundColor: '#fff' },
			]}
		>
			<Form onSubmit={handleSubmit} style={styles.container}>
				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						onChangeText={(text) => setEmail(text)}
						placeholder='Enter email'
						placeholderTextColor='gray'
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Senha</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						secureTextEntry={true}
						onChangeText={(text) => setPassword(text)}
						placeholder='Password'
						placeholderTextColor='gray'
					/>
				</Form.Group>
				<Button
					variant='outline-danger'
					type='submit'
					onClick={(event: Event): void => handleSubmit(event)}
				>
					Entrar
				</Button>

				<View style={{ marginVertical: '5%' }}>
					<Form.Group className='mb-3' controlId='formBasicCheckbox'>
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
	)
}

export default LoginScreen
