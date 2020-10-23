import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import HikeMenu from '../screens/HikeMenu';
import SetANewGoalScreen from '../screens/SetANewGoalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InHikeScreen from '../screens/InHikeScreen';
import GoalScreen from '../screens/GoalScreen'; 


const Stack = createStackNavigator();

export default function SignInStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="HikeList" component={HikeMenu} />
                <Stack.Screen name="SetGoals" component={SetANewGoalScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="InHike" component={InHikeScreen} />
                <Stack.Screen name="Goal" component={GoalScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};
