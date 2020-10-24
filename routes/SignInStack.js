import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import HikeMenuScreen from '../screens/HikeMenuScreen';
import SetANewGoalScreen from '../screens/SetANewGoalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InHikeScreen from '../screens/InHikeScreen';
import GoalScreen from '../screens/GoalScreen'; 
import HikeInfoScreen from '../screens/HikeInfoScreen';


const Stack = createStackNavigator();

export default function SignInStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="HikeMenu" component={HikeMenuScreen} />
                <Stack.Screen name="SetANewGoal" component={SetANewGoalScreen} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
                <Stack.Screen name="InHike" component={InHikeScreen} />
                <Stack.Screen name="Goal" component={GoalScreen} />
                <Stack.Screen name="HikeInfo" component={HikeInfoScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
};
