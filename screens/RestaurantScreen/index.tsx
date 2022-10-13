import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// telas
import AboutScreen from './About';
import Restaurants from './Restaurants';

const Index = ({ navigation }: any): JSX.Element => {
	const Stack: any = createStackNavigator();

	return (
		<Stack.Navigator initialRouteName="Restaurants">
			<Stack.Screen
				name="Restaurants"
				component={Restaurants}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="About"
				component={AboutScreen}
				options={{ headerShown: true }}
			/>
		</Stack.Navigator>
	);
};

export default Index;
