import React from 'react';
import styles from './style';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import {
	Dimensions,
	Text,
	TextInput,
	Platform,
	View,
	SafeAreaView,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { cpf } from 'cpf-cnpj-validator';
import Joi from 'joi';
import MaskInput from 'react-native-mask-input';
import { launchImageLibrary } from 'react-native-image-picker';

const API_URL = process.env.URL || 'http://127.0.0.1:8000';

function RegisterScreen({ navigation }: any): JSX.Element {
	const [name, setName] = React.useState<string>('');
	const [cpff, setCpf] = React.useState<string>('');
	const [cel, setCellphone] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [foto, setFoto] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [cep, setCep] = React.useState<string>('');
	const [rua, setRua] = React.useState<string>('');
	const [numero, setNumero] = React.useState<string>('');
	const [bairro, setBairro] = React.useState<string>('');
	const [cidade, setCidade] = React.useState<string>('');
	const [estado, setEstado] = React.useState<string>('');
	const [message, setMessage] = React.useState<string>('');

	function createFormData(photo: any, body: any) {
		const data: FormData = new FormData();

		data.append('photo', {
			name: photo.fileName,
			type: photo.type,
			uri:
				Platform.OS === 'ios'
					? photo.uri.replace('file://', '')
					: photo.uri,
		});

		Object.keys(body).forEach((key: any) => {
			data.append(key, body[key]);
		});

		return data;
	}

	/* const uploadImage = async () => {
		await fetch(`${API_URL}/api/upload`, {
			method: 'POST',
			body: createFormData(foto, {
				name,
				cpff,
				cel,
				password,
				email,
				cep,
				rua,
				numero,
				bairro,
				cidade,
				estado,
			}),
		})
			.then((response: Response) => response.json())
			.then((response) => {
				console.log('upload succes', response);
				alert('Upload success!');
				navigation.navigate('Login');
			})
			.catch((error) => {
				console.log('upload error', error);
				alert('Upload failed!');
			});
	};
 */

	const handleChoosePhoto = async (): Promise<void> => {
		await launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
			if (response) {
				setFoto(response.assets[0].uri.toString());

				console.log(response);
				console.log(response.assets[0].uri);
				console.log(foto);
			}
		});
	};

	const schema: Joi.ObjectSchema<any> = Joi.object({
		nomeCliente: Joi.string().alphanum().min(3).max(30).required(),
		cpfCliente: Joi.string().alphanum().min(11).max(11).required(),
		celCliente: Joi.string().alphanum().min(10).max(10).required(),
		senhaCliente: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
			.required(),
		fotoCliente: Joi.string().required().uri(),
		cepCliente: Joi.string().alphanum().min(8).max(8).required(),
		emailCliente: Joi.string()
			.email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
			.required(),
		ruaCliente: Joi.string().required().min(3).max(30),
		numCasaCliente: Joi.number().required(),
		bairroCliente: Joi.string().required().min(3).max(30),
		cidadeCliente: Joi.string().required().min(3).max(30),
		estadoCliente: Joi.string().required().min(2).max(2),
	});

	const getAddress = async (): Promise<true | false> => {
		if (cep) {
			await axios({
				method: 'get',
				url: `https://viacep.com.br/ws/${cep}/json/`,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				},
				data: JSON.stringify({ cep }),
			})
				.then((response) => {
					const address = JSON.parse(JSON.stringify(response.data));

					console.table(JSON.parse(JSON.stringify(response.data)));

					setBairro(JSON.stringify(address.bairro).replace(/"/g, ''));
					setCidade(
						JSON.stringify(address.localidade).replace(/"/g, '')
					);
					setEstado(JSON.stringify(address.uf).replace(/"/g, ''));
					setRua(
						JSON.stringify(address.logradouro).replace(/"/g, '')
					);
				})
				.catch((error) => console.error('ERROR::' + error));

			return true;
		} else {
			return false;
		}
	};

	const handleSubmit = async (event: Event): Promise<void> => {
		event.preventDefault();

		const packets = {
			nomeCliente: name,
			cpfCliente: cpff,
			celCliente: cel,
			senhaCliente: password,
			fotoCliente: '../../../assets/logo.png',
			cepCliente: cep,
			emailCliente: email,
			ruaCliente: rua,
			numCasa: numero,
			bairroCliente: bairro,
			cidadeCliente: cidade,
			estadoCliente: estado,
		};

		if (schema.validate(packets) && cpf.isValid(cpff)) {
			/* await fetch(`${API_URL}/api/cadastroCliente`, {
				method: 'POST',
				mode: 'no-cors',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.parse(JSON.stringify(packets)),
			})
				.then((response: Response) => response.json())
				.then((response: Response) => {
					console.info('Upload success!', response);
					navigation.navigate('Login');
				})
				.catch((error: Error) => {
					console.log(
						`Upload failed! ${error}\n${foto}\n${error.message}\n${
							error.stack
						}\n${error.name}\n${error.toString()}`
					);

					console.table(packets);
				});
		} else {
			setMessage('Preencha todos os campos corretamente.');
		} */

			await axios({
				method: 'post',
				url: `${API_URL}/api/cadastroCliente`,
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				data: JSON.stringify({
					nomeCliente: name,
					cpfCliente: cpff,
					celCliente: cel,
					senhaCliente: password,
					fotoCliente: '../../../assets/logo.png',
					cepCliente: cep,
					emailCliente: email,
					ruaCliente: rua,
					numCasa: numero,
					bairroCliente: bairro,
					cidadeCliente: cidade,
					estadoCliente: estado,
				}),
			})
				.then((response: any): void => {
					setMessage('');

					console.table(JSON.parse(JSON.stringify(response.data)));
					navigation.navigate('Login');
				})
				.catch((error: any): void =>
					console.log('ERROR:: ', error.response.data)
				);
		} else {
			setMessage('Preencha todos os campos corretamente.');
		}
	};

	return (
		<SafeAreaView style={[styles.container, { marginTop: 35 }]}>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Form onSubmit={handleSubmit} style={styles.container}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Email</Form.Label>
						<br></br>
						<TextInput
							style={styles.formInput}
							onChangeText={(email) => setEmail(email)}
							placeholder="Email"
							placeholderTextColor={'gray'}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicName">
						<Form.Label>Nome</Form.Label>
						<br></br>
						<TextInput
							style={styles.formInput}
							onChangeText={(name) => setName(name)}
							placeholder="Nome"
							placeholderTextColor={'gray'}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicCelular">
						<Form.Label>Celular</Form.Label>
						<br></br>
						<MaskInput
							placeholderTextColor={'gray'}
							style={styles.formInput}
							value={cel}
							onChangeText={(masked, unmasked) => {
								setCellphone(masked);
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
								/\d/,
							]}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicCPF">
						<Form.Label>CPF</Form.Label>
						<br></br>
						<MaskInput
							placeholderTextColor={'gray'}
							style={styles.formInput}
							value={cpff}
							onChangeText={(masked, unmasked) => {
								setCpf(masked);
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
								/\d/,
							]}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicCEP">
						<Form.Label>CEP</Form.Label>
						<br></br>
						<MaskInput
							placeholderTextColor={'gray'}
							style={[
								styles.formInput,
								{
									width: Dimensions.get('window').width * 0.3,
								},
							]}
							value={cep}
							onChangeText={(masked, unmasked) => {
								setCep(masked);
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
								/\d/,
							]}
						/>
						<Button
							style={{
								marginLeft: 32,
							}}
							variant="outline-danger"
							onClick={getAddress}
						>
							Encontrar endereço
						</Button>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Senha</Form.Label>
						<br></br>
						<TextInput
							secureTextEntry={true}
							style={styles.formInput}
							onChangeText={(password) => setPassword(password)}
							placeholder="Senha"
							placeholderTextColor={'gray'}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicState">
						<Form.Label>Estado</Form.Label>
						<br></br>
						<TextInput
							style={styles.formInput}
							value={estado}
							onChangeText={(estado) => setEstado(estado)}
							placeholder="Estado"
							placeholderTextColor={'gray'}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicCity">
						<Form.Label>Cidade</Form.Label>
						<br></br>
						<TextInput
							style={styles.formInput}
							value={cidade}
							onChangeText={(cidade) => setCidade(cidade)}
							placeholder="Cidade"
							placeholderTextColor={'gray'}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicBairro">
						<Form.Label>Bairro</Form.Label>
						<br></br>
						<TextInput
							style={styles.formInput}
							value={bairro}
							onChangeText={(bairro) => setBairro(bairro)}
							placeholder="Bairro"
							placeholderTextColor={'gray'}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicRua">
						<Form.Label>Rua</Form.Label>
						<br></br>
						<TextInput
							style={styles.formInput}
							value={rua}
							onChangeText={(rua) => setRua(rua)}
							placeholder="Rua"
							placeholderTextColor={'gray'}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicNumber">
						<Form.Label>Numero</Form.Label>
						<br></br>
						<TextInput
							style={styles.formInput}
							value={numero}
							onChangeText={(numero) => setNumero(numero)}
							placeholder="Numero"
							placeholderTextColor={'gray'}
						/>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPhoto">
						<Form.Label>Foto de perfil</Form.Label>
						<br></br>
						<Button
							variant="outline-info"
							onClick={handleChoosePhoto}
						>
							Escolher foto
						</Button>
					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicCheckbox">
						<Form.Check
							id="termsCheckbox"
							type="checkbox"
							label="Concordo com os termos de uso"
						/>
						<Form.Check
							id="privacityCheckbox"
							type="checkbox"
							label="Concordo com a política de privacidade"
						/>
					</Form.Group>
					
					<Button variant="outline-danger" type="submit" onClick={() => navigation.navigate('Login')}>
						Registrar-se
					</Button>

					<View style={{ marginVertical: '5%' }}>
						<Form.Group className="mb-3" controlId="formBasicLogin">
							<Text
								style={{
									color: '#000000',
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
							marginVertical: '5%',
						}}
					>
						<Form.Group
							className="mb-3"
							controlId="formBasicFeedback"
						>
							<Text
								style={{
									color: '#963333',
									fontSize: 16,
									fontWeight: 'bold',
								}}
							>
								{message}
							</Text>
						</Form.Group>
					</View>
				</Form>
			</ScrollView>
		</SafeAreaView>
	);
}

export default RegisterScreen;
