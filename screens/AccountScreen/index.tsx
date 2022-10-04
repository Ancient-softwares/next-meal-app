import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// telas
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import UserScreen from './UserScreen';

function AccountScreen({navigation}: any) {
    const Stack = createStackNavigator();
    
    return (
        <Stack.Navigator>
        <Stack.Screen name="UserScreen" component={UserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    );
}

export default AccountScreen