import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
// telas
import AboutScreen from './About'
import MenuScreen from './Menu'
import RatingsScreen from './Ratings'
import RestaurantsScreen from './Restaurants'

const Index = ({ navigation, route }: any): JSX.Element => {
	const Stack: any = createStackNavigator()

	return (
		<Stack.Navigator initialRouteName='Restaurants'>
			<Stack.Screen
				name='Restaurants'
				component={RestaurantsScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='About'
				component={AboutScreen}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='Ratings'
				component={RatingsScreen}
				options={{
					headerShown: true,
					headerTitle: 'Avaliações',
					headerStyle: {
						backgroundColor: '#fff',
						elevation: 0,
						shadowOpacity: 0,
						borderBottomWidth: 0
					},
					headerTitleStyle: {
						fontFamily: 'Poppins_600SemiBold',
						fontSize: 18,
						color: '#000'
					},
					headerTintColor: '#000'
				}}
			/>
			<Stack.Screen
				name='Menu'
				component={MenuScreen}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	)
}

export default Index
