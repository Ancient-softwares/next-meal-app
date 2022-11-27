import {
	Entypo,
	Feather,
	FontAwesome,
	FontAwesome5,
	Ionicons,
	MaterialCommunityIcons,
	MaterialIcons
} from '@expo/vector-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'
import {
	Image,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker'
import '../../../constants/globals'
import styles from './style'

declare global {
	namespace JSX {
		interface IntrinisicElements {
			div: { div: string }
		}
	}
}

const wait = (timeout: number) => {
	return new Promise((resolve) => setTimeout(resolve, timeout))
}

const Account = ({ navigation }: any): JSX.Element => {
	const [isLogged, setIsLogged] = React.useState<boolean>(false)
	const [refreshPage, setRefresh] = React.useState<boolean>(false)
	const [uniqueValue, setUniqueValue] = React.useState<number>(1)
	const [photo, setPhoto] = React.useState<any>(null)

	React.useEffect(() => {
		navigation.addListener('focus', () => {
			setUniqueValue(uniqueValue + 1)
		})
	}, [navigation, uniqueValue])

	const verifyUser = (): void => {
		if (global.user !== null) {
			global.isLogged = true
		} else {
			global.isLogged = false
		}

		forceRemount()
	}

	const forceRemount = (): void => {
		setUniqueValue(uniqueValue + 1)
	}

	const createFormData = (photo, body = {}) => {
		try {
			const data = new FormData()
			const file = {
				uri: photo.uri,
				type: photo.type,
				name: photo.fileName
			}

			data.append('file', {
				name: global.user.name + '.jpg',
				type: 'image/jpg',
				uri: 'img/fotosCliente'
			})

			Object.keys(body).forEach((key) => {
				data.append(key, body[key])
			})

			return data
		} catch (err) {
			console.log(err)
		}
	}

	const handleChoosePhoto = async (): Promise<void> => {
		await launchImageLibrary({ mediaType: 'photo' }, (response: any) => {
			try {
				if (response) {
					// setar a foto do perfil
					// setPhoto(response.assets[0].uri.toString()) passar pro bang do perfil

					console.table(response)
					handleUploadUri(response)
					// console.log(photo)
				} else {
					console.log('error')
				}
			} catch (err) {
				console.log(err)
			}
		})
	}

	const handleUploadPhoto = async (): Promise<void> => {
		console.log('we here')

		await fetch(`${global.getApiUrl()}/api/uploadImage`, {
			method: 'POST',
			headers: new Headers({
				Authorization: `Bearer ${global.user.token}`,
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data'
			}),
			body: createFormData(photo)
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('response', response)
			})
			.catch((error) => {
				console.log('error', error)
			})
	}

	const handleUploadUri = async (uri: string): Promise<void> => {
		await fetch(`${global.getApiUrl()}/api/uploadUri`, {
			method: 'POST',
			headers: new Headers({
				Authorization: `Bearer ${global.user.token}`,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({
				image: uri.toString().toLowerCase()
			})
		})
			.then((response) => response.json())
			.then((response) => {
				console.log('response', response)
			})
			.catch((error) => {
				console.log('error', error)
			})
	}

	const base64ToBlob = (base64: string, mime: string): Blob => {
		mime = mime || ''
		const sliceSize = 1024
		const byteChars = window.atob(base64)
		const byteArrays = []

		for (let offset = 0; offset < byteChars.length; offset += sliceSize) {
			const slice = byteChars.slice(offset, offset + sliceSize)
			const byteNumbers = new Array(slice.length)
			for (let i = 0; i < slice.length; i++) {
				byteNumbers[i] = slice.charCodeAt(i)
			}
			const byteArray = new Uint8Array(byteNumbers)
			byteArrays.push(byteArray)
		}
		return new Blob(byteArrays, { type: mime })
	}

	return (
		<>
			<SafeAreaView style={styles.container} key={uniqueValue}>
				<ScrollView
					showsVerticalScrollIndicator={false}
					showsHorizontalScrollIndicator={false}
					style={{
						height: '100%',
						width: '100%'
					}}
					refreshControl={
						<RefreshControl
							refreshing={refreshPage}
							onRefresh={verifyUser}
							enabled={true}
						/>
					}
				>
					<ListGroup as='ul'>
						{!global.isLogged ? (
							<>
								<MaterialIcons
									style={styles.accountIcon}
									name='account-circle'
									size={64}
									color='#963333'
								/>
								<Text style={styles.title}>
									Olá, visitante!
								</Text>
								<Text style={styles.text}>
									Crie ou acesse sua conta
								</Text>
								<View
									style={{
										flex: 1,
										flexDirection: 'row'
									}}
								>
									<Button
										variant='outline-danger'
										style={{
											width: '8em',
											marginTop: 5,
											marginRight: 5
										}}
										onClick={() =>
											navigation.navigate('Login')
										}
									>
										Entrar
									</Button>
									<Button
										variant='outline-danger'
										style={{
											width: '8em',
											marginTop: 5,
											marginLeft: 5
										}}
										onClick={() => {
											navigation.navigate('Register')
										}}
									>
										Cadastrar-se
									</Button>
								</View>
							</>
						) : (
							<>
								<Image
									source={require('../../../assets/user-logged.png')}
									style={{
										width: 64,
										height: 64,
										marginTop: 10,
										marginBottom: 10,
										alignSelf: 'flex-start'
									}}
									onPress={() => {
										handleChoosePhoto()
									}}
								/>

								<Text style={styles.title}>
									Olá, {global.user.name}!
								</Text>
								<Button
									variant='outline-danger'
									style={{
										width: '8em',
										marginTop: 15,
										marginBottom: 15,
										marginRight: 5
									}}
									onClick={() =>
										navigation.navigate('Register', {
											gottaUpdate: true
										})
									}
								>
									Editar perfil
								</Button>
							</>
						)}

						<Text
							style={[
								styles.subtitle,
								{
									marginVertical: '2.5%'
								}
							]}
						>
							Meu app, NextMeal
						</Text>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 5,
								marginBottom: '0.75%'
							}}
						>
							<Ionicons
								name='notifications-outline'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>
									Minhas notificações
								</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 5,
								marginBottom: '0.75%'
							}}
						>
							<FontAwesome
								name='calendar-check-o'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>Minhas reservas</div>
							</div>
						</ListGroup.Item>
						{!global.isLogged ? (
							<></>
						) : (
							<TouchableOpacity
								style={{
									marginTop: 5,
									marginBottom: '0.75%'
								}}
								onPress={() => {
									navigation.navigate('History')
								}}
							>
								<ListGroup.Item
									as='li'
									className='d-flex justify-content-between align-items-start'
									style={{
										border: 'none'
									}}
								>
									<FontAwesome5
										color='black'
										name='history'
										size={22}
									/>
									<div className='ms-2 me-auto'>
										<div className='fw-bold'>Histórico</div>
									</div>
								</ListGroup.Item>
							</TouchableOpacity>
						)}
					</ListGroup>
					<Text
						style={[
							styles.subtitle,
							{
								marginVertical: '2.5%'
							}
						]}
					>
						Configurações gerais
					</Text>
					<ListGroup as='ul'>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 5,
								marginBottom: '0.75%'
							}}
						>
							<Ionicons
								name='notifications-off-outline'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>
									Política de privacidade
								</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 5,
								marginBottom: '0.75%'
							}}
						>
							<Entypo
								name='text-document'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>Termos de uso</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 5,
								marginBottom: '0.75%'
							}}
						>
							<Feather name='info' size={24} color='black' />
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>Sobre nós</div>
							</div>
						</ListGroup.Item>
						<ListGroup.Item
							as='li'
							className='d-flex justify-content-between align-items-start'
							style={{
								border: 'none',
								marginTop: 5,
								marginBottom: '0.75%'
							}}
						>
							<MaterialCommunityIcons
								name='file-document-edit-outline'
								size={24}
								color='black'
							/>
							<div className='ms-2 me-auto'>
								<div className='fw-bold'>Ajuda e suporte</div>
							</div>
						</ListGroup.Item>
					</ListGroup>

					{!global.isLogged ? (
						<></>
					) : (
						<>
							<ListGroup as='ul'>
								<ListGroup.Item
									as='li'
									className='d-flex justify-content-between align-items-start'
									style={{
										border: 'none',
										marginBottom: 10
									}}
								>
									<TouchableOpacity
										onPress={() => {
											global.logout()

											forceRemount()
										}}
									>
										<View style={{ flexDirection: 'row' }}>
											<MaterialCommunityIcons
												name='logout'
												size={24}
												color='#963333'
											/>
											<div className='ms-2 me-auto'>
												<div className='fw-bold'>
													<Text
														style={{
															color: '#963333',
															fontSize: 16,
															fontWeight: 'bold'
														}}
													>
														Sair
													</Text>
												</div>
											</div>
										</View>
									</TouchableOpacity>
								</ListGroup.Item>
							</ListGroup>
						</>
					)}
					{photo ? (
						<>
							<Image
								source={{ uri: photo }}
								style={{ width: 300, height: 300 }}
							/>
						</>
					) : (
						<></>
					)}
				</ScrollView>
			</SafeAreaView>
		</>
	)
}

export default Account
