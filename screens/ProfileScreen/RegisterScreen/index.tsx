import axios, { AxiosResponse } from 'axios'
import { cpf } from 'cpf-cnpj-validator'
import Joi from 'joi'
import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { Dimensions, SafeAreaView, Text, TextInput, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import MaskInput from 'react-native-mask-input'
import '../../../constants/globals'
import styles from './style'

function RegisterScreen({ navigation }: any): JSX.Element {
	const [name, setName] = React.useState<string>('')
	const [cpff, setCpf] = React.useState<string>('')
	const [cel, setCellphone] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')
	const [email, setEmail] = React.useState<string>('')
	const [cep, setCep] = React.useState<string>('')
	const [rua, setRua] = React.useState<string>('')
	const [numero, setNumero] = React.useState<string>('')
	const [bairro, setBairro] = React.useState<string>('')
	const [cidade, setCidade] = React.useState<string>('')
	const [estado, setEstado] = React.useState<string>('')
	const [message, setMessage] = React.useState<string>('')
	const [page, setPage] = React.useState<number>(0)

	const schema: Joi.ObjectSchema<any> = Joi.object({
		nomeCliente: Joi.string().alphanum().min(3).max(30).required(),
		cpfCliente: Joi.string().alphanum().min(11).max(11).required(),
		celCliente: Joi.string().alphanum().min(10).max(10).required(),
		senhaCliente: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),
		cepCliente: Joi.string().alphanum().min(8).max(8).required(),
		emailCliente: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),
		ruaCliente: Joi.string().required().min(3).max(30),
		numCasaCliente: Joi.number().required(),
		bairroCliente: Joi.string().required().min(3).max(30),
		cidadeCliente: Joi.string().required().min(3).max(30),
		estadoCliente: Joi.string().required().min(2).max(2)
	})

	const FirstStep = (): JSX.Element => {
		return (
			<>
				<Form.Group className='mb-3' controlId='formBasicName'>
					<Form.Label>Nome</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						onChangeText={(name) => setName(name)}
						placeholder='Nome'
						placeholderTextColor={'gray'}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicCPF'>
					<Form.Label>CPF</Form.Label>
					<br></br>
					<MaskInput
						placeholderTextColor={'gray'}
						style={styles.formInput}
						value={cpff}
						onChangeText={(masked, unmasked) => {
							setCpf(masked)
						}}
						mask={[
							/\d/,
							/\d/,
							/\d/,
							'.',
							/\d/,
							/\d/,
							/\d/,
							'.',
							/\d/,
							/\d/,
							/\d/,
							'-',
							/\d/,
							/\d/
						]}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Senha</Form.Label>
					<br></br>
					<TextInput
						secureTextEntry={true}
						style={styles.formInput}
						onChangeText={(password) => setPassword(password)}
						placeholder='Senha'
						placeholderTextColor={'gray'}
					/>
				</Form.Group>
			</>
		)
	}

	const SecondStep = (): JSX.Element => {
		return (
			<>
				<Form.Group className='mb-3' controlId='formBasicCelular'>
					<Form.Label>Celular</Form.Label>
					<br></br>
					<MaskInput
						placeholderTextColor={'gray'}
						style={styles.formInput}
						value={cel}
						onChangeText={(masked, unmasked) => {
							setCellphone(masked)
						}}
						mask={[
							'(',
							/\d/,
							/\d/,
							')',
							' ',
							/\d/,
							' ',
							/\d/,
							/\d/,
							/\d/,
							/\d/,
							'-',
							/\d/,
							/\d/,
							/\d/,
							/\d/
						]}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicEmail'>
					<Form.Label>Email</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						onChangeText={(email) => setEmail(email)}
						placeholder='Email'
						placeholderTextColor={'gray'}
					/>
				</Form.Group>
			</>
		)
	}

	const ThirdStep = (): JSX.Element => {
		return (
			<>
				<Form.Group className='mb-3' controlId='formBasicCEP'>
					<Form.Label>CEP</Form.Label>
					<br></br>
					<MaskInput
						placeholderTextColor={'gray'}
						style={[
							styles.formInput,
							{
								width: Dimensions.get('window').width * 0.3
							}
						]}
						value={cep}
						onChangeText={(masked, unmasked) => {
							setCep(masked)
						}}
						mask={[
							/\d/,
							/\d/,
							/\d/,
							/\d/,
							/\d/,
							'-',
							/\d/,
							/\d/,
							/\d/
						]}
					/>
					<Button
						style={{
							marginLeft: 32,
							fontSize: 14
						}}
						variant='outline-danger'
						onClick={getAddress}
					>
						Buscar endereço
					</Button>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicState'>
					<Form.Label>Estado</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						value={estado}
						onChangeText={(estado) => setEstado(estado)}
						placeholder='Estado'
						placeholderTextColor={'gray'}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicCity'>
					<Form.Label>Cidade</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						value={cidade}
						onChangeText={(cidade) => setCidade(cidade)}
						placeholder='Cidade'
						placeholderTextColor={'gray'}
					/>
				</Form.Group>
			</>
		)
	}

	const FourthStep = (): JSX.Element => {
		return (
			<>
				<Form.Group className='mb-3' controlId='formBasicBairro'>
					<Form.Label>Bairro</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						value={bairro}
						onChangeText={(bairro) => setBairro(bairro)}
						placeholder='Bairro'
						placeholderTextColor={'gray'}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicRua'>
					<Form.Label>Rua</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						value={rua}
						onChangeText={(rua) => setRua(rua)}
						placeholder='Rua'
						placeholderTextColor={'gray'}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicNumber'>
					<Form.Label>Numero</Form.Label>
					<br></br>
					<TextInput
						style={styles.formInput}
						value={numero}
						onChangeText={(numero) => setNumero(numero)}
						placeholder='Numero'
						placeholderTextColor={'gray'}
					/>
				</Form.Group>
			</>
		)
	}

	const renderSection = (): JSX.Element => {
		switch (page) {
			case 0:
				return FirstStep()
			case 1:
				return SecondStep()
			case 2:
				return ThirdStep()
			case 3:
				return FourthStep()
			default:
				return FirstStep()
		}
	}

	const getAddress = async (): Promise<true | false> => {
		if (cep) {
			await axios({
				url: `https://viacep.com.br/ws/${cep}/json/`,
				method: 'get',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*'
				},
				data: JSON.stringify({ cep })
			})
				.then((response: AxiosResponse): void => {
					const address = JSON.parse(JSON.stringify(response.data))

					console.table(JSON.parse(JSON.stringify(response.data)))

					setBairro(JSON.stringify(address.bairro).replace(/"/g, ''))
					setCidade(
						JSON.stringify(address.localidade).replace(/"/g, '')
					)
					setEstado(JSON.stringify(address.uf).replace(/"/g, ''))
					setRua(JSON.stringify(address.logradouro).replace(/"/g, ''))
				})
				.catch((error: Error): void => console.error('ERROR::' + error))

			return true
		} else {
			return false
		}
	}

	const handleSubmit = async (event: Event): Promise<void> => {
		event.preventDefault()

		const packets = JSON.stringify({
			nomeCliente: name,
			cpfCliente: cpff,
			telefoneCliente: cel,
			senhaCliente: password,
			fotoCliente: 'user.png',
			cepCliente: cep,
			emailCliente: email,
			ruaCliente: rua,
			numCasa: numero,
			bairroCliente: bairro,
			cidadeCliente: cidade,
			estadoCliente: estado
		})

		if (schema.validate(packets) && cpf.isValid(cpff)) {
			await fetch(`${API_URL}/api/cadastroCliente`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: packets
			})
				.then((response: Response): Promise<JSON> => response.json())
				.then((json: any): void => {
					if (json.status === 201) {
						setMessage('Cadastro realizado com sucesso!')
						navigation.navigate('Login')
					} else {
						setMessage(json.message)
					}
				})
				.catch((error) => {
					console.log(error)
					console.log(JSON.parse(packets))
				})
		} else {
			if (!cpf.isValid(cpff)) {
				setMessage('CPF inválido!')
			} else {
				setMessage('Preencha todos os campos corretamente.')
			}
		}
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: '#fff',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				style={{
					marginTop: '30%'
				}}
			>
				<Form style={styles.container}>
					{renderSection()}

					<View
						style={{
							marginVertical: '5%'
						}}
					>
						<Form.Group
							className='mb-3'
							controlId='formBasicButton'
						>
							<View style={{ flexDirection: 'row' }}>
								<Button
									variant='primary'
									style={{
										backgroundColor: '#963333',
										borderColor: '#963333',
										width: '40%',
										height: 50,
										borderRadius: 10
									}}
									onClick={(event: any) => {
										if (page === 0) {
											setPage(1)
										} else if (page === 1) {
											setPage(2)
										} else if (page === 2) {
											setPage(3)
										} else if (page === 3) {
											handleSubmit(event)
										} else if (page === 4) {
											handleSubmit(event)
										}

										setMessage('')
									}}
								>
									<Text
										style={{
											color: '#fff',
											fontSize: 20
										}}
									>
										{page === 3 ? 'Finalizar' : 'Próximo'}
									</Text>
								</Button>
								{(page !== 0 && (
									<Button
										variant='primary'
										style={{
											backgroundColor: '#963333',
											borderColor: '#963333',
											width: '40%',
											height: 50,
											borderRadius: 10,
											marginLeft: '10%'
										}}
										onClick={() => {
											if (page === 0) {
												return
											} else if (page === 1) {
												setPage(0)
											} else if (page === 2) {
												setPage(1)
											} else if (page === 3) {
												setPage(2)
											} else if (page === 4) {
												setPage(3)
											}

											setMessage('')
										}}
									>
										<Text
											style={{
												color: '#fff',
												fontSize: 20
											}}
										>
											Voltar
										</Text>
									</Button>
								)) || <></>}
							</View>
						</Form.Group>

						<View style={{ marginVertical: '5%' }}>
							<Form.Group
								className='mb-3'
								controlId='formBasicLogin'
							>
								<Text
									style={{
										color: '#000000'
									}}
									onPress={() => navigation.navigate('Login')}
								>
									Já possui uma conta?
									<Text style={{ color: '#963333' }}>
										{' '}
										Entrar.
									</Text>
								</Text>
							</Form.Group>
						</View>

						<View
							style={{
								marginVertical: '5%'
							}}
						>
							<Form.Group
								className='mb-3'
								controlId='formBasicFeedback'
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

								<View style={styles.progressBar}>
									<View
										style={[
											styles.progressBarDiv,
											{
												width:
													page === 0
														? '25%'
														: page === 1

														? '50%'
														: page === 2
														? '75%'
														: '100%'
											}
										]}
									>
										<View
											style={{
												justifyContent: 'center',
												width: '100%',
												marginTop: 25
											}}
										>
											<Text
												style={{
													color: '#963333',
													fontSize: 16,
													fontWeight: 'bold',
													marginLeft:
														page === 0
															? '10%'
															: page === 1
															? '50%'
															: page === 2
															? '65%'
															: '77.5%',

													width: 150,
													marginTop: 12
												}}
											>
												{page === 0
													? 'Dados Pessoais'
													: page === 1
													? 'Contato'
													: page === 2
													? 'Endereço'
													: page === 3
													? 'Finalizar'
													: ''}
											</Text>
										</View>
									</View>
								</View>
							</Form.Group>
						</View>
					</View>
				</Form>
			</ScrollView>
		</SafeAreaView>
	)
}

export default RegisterScreen
