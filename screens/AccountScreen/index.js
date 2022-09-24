import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// telas
import RegisterScreen from '../RegisterScreen';
import LoginScreen from '../LoginScreen';
import Account from './Account';
import Teste from '../RegisterScreen/test';

function AccountScreen({navigation}) {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator>
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
}

export default AccountScreen