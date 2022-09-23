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
            tabBarIcon: ({ focused }) => <MaterialIcons name='account-circle' size={24} color={color} />,
            headerShown: false,
          }}
        />
        <Tab.Screen 
          name="Maps" 
          component={MapsScreen} 
          options={{ 
            tabBarIcon: ({ focused }) => <MaterialIcons name='account-circle' size={24} color={color} />,
            headerShown: false,
          }} 
          />
        <Tab.Screen 
          name="Books" 
          component={BookScreen} 
          options={{ 
            tabBarIcon: ({ focused }) => <MaterialIcons name='account-circle' size={24} color={color} />,
            headerShown: false,
          }} 
          />

        <Tab.Screen 
          name="Account" 
          component={AccountScreen} 
          options={{ 
            tabBarIcon: ({ focused }) => <MaterialIcons name='account-circle' size={24} color={color} />,
            headerShown: false,
          }} 
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export function bottomTabs() {
  <BottomTabBar.Navigator>
    <BottomTabBar.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{
        TabBarIcon: ({ color }) => <MaterialIcons name='account-circle' size={24} color={color} /> 
      }}
    />
  </BottomTabBar.Navigator>
} 

function TabBarIcon(props) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

