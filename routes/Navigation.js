import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Authentication from '../components/AuthContext';

import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const Navigation = () => {

    if (state.isLoading) {
        return <SplashScreen />
    }

    return (
        <Stack.Navigator>
            {state.userToken == null ? (
                //  No token found, user isn't signed in
                <>
                {/* Display splash screen and then login screen */}
                    <Stack.Screen 
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{headerShown: false}}          
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false,
                            // Pop animation for logging out
                            animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                        }} 
                    />
                </>
            ) : (
                // User is signed in
                <>
                    <Stack.Screen 
                        name="Home"
                        component={HomeScreen}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};