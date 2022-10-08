import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';

// telas
import Home from './screens/HomeScreen';
import Maps from './screens/MapsScreen';
import Restaurants from './screens/RestaurantScreen/Restaurants';
import Profile from './screens/ProfileScreen';

const color: string = '#963333';

const Tab: any = createBottomTabNavigator();

const App = (): JSX.Element => {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name="Home"
					component={Home}
					options={{
						tabBarIcon: ({ color }: any): React.ReactNode => (
							<TabBarIcon name="home" size={32} color={color} />
						),
						headerShown: false,
					}}
				/>
				<Tab.Screen
					name="Maps"
					component={Maps}
					options={{
						tabBarIcon: ({ color }: any): React.ReactNode => (
							<FontAwesome
								name="map-marker"
								size={32}
								color={color}
							/>
						),
						headerShown: false,
					}}
				/>
				<Tab.Screen
					name="Restaurants"
					component={Restaurants}
					options={{
						tabBarIcon: ({ color }: any): React.ReactNode => (
							<Ionicons
								name="restaurant"
								size={32}
								color={color}
							/>
						),
						headerShown: false,
					}}
				/>

				<Tab.Screen
					name="Profile"
					component={Profile}
					options={{
						tabBarIcon: ({ color }: any): React.ReactNode => (
							<MaterialIcons
								name="account-circle"
								size={32}
								color={color}
							/>
						),
						headerShown: false,
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
};

const TabBarIcon = (props: React.PropsWithChildren): JSX.Element => {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
};

export default App;
