import 'react-native-gesture-handler';
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/Splash';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
       
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default createAppContainer(AppNavigator);

