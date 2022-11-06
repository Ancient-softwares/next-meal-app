import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

// telas
import HistoryScreen from './HistoryScreen'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import UserScreen from './UserScreen'

const Index = ({ navigation, route }: any): JSX.Element => {
	const Stack: any = createStackNavigator()

	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Main'
				component={UserScreen}
				options={{
					headerShown: false
				}}
			/>
			<Stack.Screen
				name='Register'
				component={RegisterScreen}
				options={{
					title: 'Cadastro',
					headerStyle: {
						backgroundColor: '#fff'
					},
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 26,
						color: '#963333'
					},
					headerTitleAlign: 'center'
				}}
			/>
			<Stack.Screen
				name='Login'
				component={LoginScreen}
				options={{
					title: 'Login',
					headerStyle: {
						backgroundColor: '#fff'
					},
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 26,
						color: '#963333'
					},
					headerTitleAlign: 'center'
				}}
			/>
			<Stack.Screen
				name='History'
				component={HistoryScreen}
				options={{
					title: 'Histórico',
					headerStyle: {
						backgroundColor: '#fff'
					},
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 26,
						color: '#963333'
					},
					headerTitleAlign: 'center',
					headerShown: true
				}}
			/>
		</Stack.Navigator>
	)
}

export default Index
