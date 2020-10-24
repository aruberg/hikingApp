import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import CreateAccountScreen from '../screens/CreateAccountScreen'

const Stack = createStackNavigator()

export default function SignOutStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={CreateAccountScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};