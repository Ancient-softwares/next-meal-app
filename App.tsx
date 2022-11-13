import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import * as React from 'react'

// telas
import Home from './screens/HomeScreen'
import Maps from './screens/MapsScreen'
import Profile from './screens/ProfileScreen'
import About from './screens/RestaurantScreen/About'
import Category from './screens/RestaurantScreen/Category'
import Menu from './screens/RestaurantScreen/Menu'
import Ratings from './screens/RestaurantScreen/Ratings'
import Restaurants from './screens/RestaurantScreen/Restaurants'

const color: string = '#963333'

const Tab: any = createBottomTabNavigator()

const App = (): JSX.Element => {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen
					name='Home'
					component={Home}
					options={{
						tabBarIcon: ({ color }: any): React.ReactNode => (
							<TabBarIcon name='home' size={32} color={color} />
						),
						headerShown: false
					}}
				/>
				<Tab.Screen
					name='Maps'
					component={Maps}
					options={{
						tabBarIcon: ({ color }: any): React.ReactNode => (
							<FontAwesome
								name='map-marker'
								size={32}
								color={color}
							/>
						),
						headerShown: false
					}}
				/>
				<Tab.Screen
					name='Restaurants'
					component={Restaurants}
					options={{
						tabBarIcon: ({ color }: any): React.ReactNode => (
							<Ionicons
								name='restaurant'
								size={32}
								color={color}
							/>
						),
						headerShown: false
					}}
				/>
				<Tab.Screen
					name='About'
					component={About}
					options={{
						headerShown: false,
						tabBarButton: (): React.ReactNode => null,
						TabBarVisible: false
					}}
				/>
				<Tab.Screen
					name='Profile'
					component={Profile}
					options={{
						tabBarIcon: ({ color }: any): React.ReactNode => (
							<MaterialIcons
								name='account-circle'
								size={32}
								color={color}
							/>
						),
						headerShown: false
					}}
				/>
				<Tab.Screen
					name='Category'
					component={Category}
					options={{
						headerShown: false,
						tabBarButton: (): React.ReactNode => null,
						TabBarVisible: false
					}}
				/>
				<Tab.Screen
					name='Ratings'
					component={Ratings}
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
						headerTintColor: '#000',
						tabBarButton: (): React.ReactNode => null,
						TabBarVisible: false
					}}
				/>
				<Tab.Screen
					name='Menu'
					component={Menu}
					options={{
						headerShown: true,
						headerTitle: 'Cardápio',
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
						headerTintColor: '#000',
						tabBarButton: (): React.ReactNode => null,
						TabBarVisible: false
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	)
}

const TabBarIcon = (props: React.PropsWithChildren): JSX.Element => {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}

export default App
