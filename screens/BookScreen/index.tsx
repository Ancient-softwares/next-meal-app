import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// telas
import About from './About';
import Restaurants from './Restaurants';

const AccountScreen = ({navigation}: any): JSX.Element => {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator initialRouteName='Restaurants'>
        <Stack.Screen name="Restaurants" component={Restaurants} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={About} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
}

export default AccountScreen