import 'react-native-gesture-handler';
import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import HikeMenuScreen from '../screens/HikeMenuScreen';
import SetANewGoalScreen from '../screens/SetANewGoalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InHikeScreen from '../screens/InHikeScreen';
import GoalScreen from '../screens/GoalScreen'; 
import HikeInfoScreen from '../screens/HikeInfoScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator initialRouteName="Home" headerMode="none">
            <Stack.Screen name="Home" component={HomeScreen} />        
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator initialRouteName="Profile" headerMode="none">
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Goal" component={GoalScreen} /> 
            <Stack.Screen name="SetANewGoal" component={SetANewGoalScreen} /> 
        </Stack.Navigator>
    )
}

function HikeStack() {
    return (
        <Stack.Navigator initialRouteName="Hike" headerMode="none">
            <Stack.Screen name="HikeMenu" component={HikeMenuScreen} />
            <Stack.Screen name="HikeInfo" component={HikeInfoScreen} /> 
            <Stack.Screen name="InHike" component={InHikeScreen} /> 
        </Stack.Navigator>
    )
}

function TabNavigator() {
    return (
      <NavigationContainer>
        <Tab.Navigator 
            initialRouteName="Home" 
            screenOptions={{
                tabBarOptions: {
                    style: {
                        backgroundColor: '#C98F39',
                    }
                }
            }}
                
                
        >        
          <Tab.Screen name="HomeStack" component={HomeStack} />
          <Tab.Screen name="ProfileStack" component={ProfileStack} />
          <Tab.Screen name="HikeMenuStack" component={HikeStack} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  export default TabNavigator;
