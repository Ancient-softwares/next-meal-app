import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// telas
import RegisterScreen from '../RegisterScreen';
import LoginScreen from '../LoginScreen';
import Account from './Account';

function AccountScreen({navigation}) {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator>
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
}

export default AccountScreen