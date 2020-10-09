import 'react-native-gesture-handler';
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScreenStackHeaderCenterView } from 'react-native-screens';
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;

