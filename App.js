import 'react-native-gesture-handler';
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GoalScreen from './screens/GoalScreen';
import HomeScreen from './screens/HomeScreen';
import InHikeScreen from './screens/InHikeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import SetANewGoalScreen from './screens/SetANewGoalScreen';
import SplashScreen from './screens/SplashScreen';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen 
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}} 
          />
          {/* <Stack.Screen
            name="Login"
            component={LoginScreen}
            options= {{headerShown: false}}
          />          */}
          {/* <Stack.Screen 
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}} 
          /> */}
          {/* <Stack.Screen 
            name="InHike"
            component={InHikeScreen}
            options={{headerShown: false}} 
          /> */}
          {/* <Stack.Screen 
            name="SetGoal"
            component={SetANewGoalScreen}
            options={{headerShown: false}} 
          /> */}
          {/* <Stack.Screen 
            name="Goal"
            component={GoalScreen}
            options={{headerShown: false}} 
          /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;

