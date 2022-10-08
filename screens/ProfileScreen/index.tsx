import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// telas
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';

const Index = ({ navigation }: any): JSX.Element => {
	const Stack: any = createStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="UserScreen"
				component={UserScreen}
				options={{
					headerShown: false,
				}}
			/>
			<Stack.Screen
				name="Register"
				component={RegisterScreen}
				options={{
					title: 'Cadastro',
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 26,
						color: '#963333',
					},
					headerTitleAlign: 'center',
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Login',
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTitleStyle: {
						fontWeight: 'bold',
						fontSize: 26,
						color: '#963333',
					},
					headerTitleAlign: 'center',
				}}
			/>
		</Stack.Navigator>
	);
};

export default Index;
