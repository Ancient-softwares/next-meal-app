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
	LogBox,
	RefreshControl,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
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
	const [isLogged, setIsLogged] = React.useState(false)
	const [refreshPage, setRefresh] = React.useState(false)
	const [uniqueValue, setUniqueValue] = React.useState(1)

	React.useEffect(() => {
		const focusHandler = navigation.addListener('focus', () => {
			console.log('Refreshed')
		})

		verifyUser()

		return focusHandler
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
		// setRefresh(true)
	}

	const onRefresh = React.useCallback(() => {
		setRefresh(true)
		wait(2000).then(() => setRefresh(false))
	}, [])

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
								<MaterialIcons
									style={styles.accountIcon}
									name='account-circle'
									size={64}
									color='#963333'
								/>

								<Text style={styles.title}>
									Olá, {global.user.name}!
								</Text>
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
										onPress={() => global.logout()}
									>
										<View style={{ flexDirection: 'row' }}>
											<MaterialCommunityIcons
												name='logout'
												size={24}
												color='black'
											/>
											<div className='ms-2 me-auto'>
												<div className='fw-bold'>
													Sair
												</div>
											</div>
										</View>
									</TouchableOpacity>
								</ListGroup.Item>
							</ListGroup>
						</>
					)}
				</ScrollView>
			</SafeAreaView>
		</>
	)
}

export default Account
