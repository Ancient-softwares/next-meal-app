import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// telas
import HomeScreen from './screens/HomeScreen';
import MapsScreen from './screens/MapsScreen';
import BookScreen from './screens/BookScreen';
import AccountScreen from './screens/AccountScreen';

const color = '#963333'

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{ 
            tabBarIcon: ({ color }) => <TabBarIcon name="home" size={32} color={color} />,
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Maps" 
          component={MapsScreen} 
          options={{ 
            tabBarIcon: ({ color }) => <FontAwesome name="map-marker" size={32} color={color}/>,
            headerShown: false,
          }} 
          />
        <Tab.Screen 
          name="Reserves" 
          component={BookScreen} 
          options={{ 
            tabBarIcon: ({ color }) => <Ionicons name="restaurant" size={32} color={color} />,
            headerShown: false,
          }} 
          />

        <Tab.Screen 
          name="Account" 
          component={AccountScreen} 
          options={{ 
            tabBarIcon: ({ color }) => <MaterialIcons name='account-circle' size={32} color={color} />,
            headerShown: false,
          }} 
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

