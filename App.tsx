import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import * as React from "react"

// telas
import Home from "./screens/HomeScreen"
import Maps from "./screens/MapsScreen"
import Profile from "./screens/ProfileScreen"
import About from "./screens/RestaurantScreen/About"
import Restaurants from "./screens/RestaurantScreen/Restaurants"

const color: string = "#963333"

const Tab: any = createBottomTabNavigator()

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
						headerShown: false
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
						headerShown: false
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
						headerShown: false
					}}
				/>
				<Tab.Screen
					name="About1"
					component={About}
					options={{
						headerShown: false,
						tabBarButton: (): React.ReactNode => null,
						TabBarVisible: false
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
						headerShown: false
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
