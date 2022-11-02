import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
// telas
import AboutScreen from './About'
import Restaurants from './Restaurants'

const Index = ({ navigation }: any): JSX.Element => {
	const Stack: any = createStackNavigator()

	return (
		<Stack.Navigator initialRouteName='Restaurants'>
			<Stack.Screen
				name='Restaurants'
				component={Restaurants}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='About'
				component={AboutScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	)
}

export default Index
