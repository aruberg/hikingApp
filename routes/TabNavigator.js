import 'react-native-gesture-handler';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native';
import path from '../images/path.png';

import HomeScreen from '../screens/HomeScreen';
import HikeMenuScreen from '../screens/HikeMenuScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InHikeScreen from '../screens/InHikeScreen';
import GoalScreen from '../screens/GoalScreen'; 
import HikeInfoScreen from '../screens/HikeInfoScreen';
import QRScreen from '../screens/QRScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#3C413E',
                    borderBottomColor: '#C98F39',
                    borderBottomWidth: 1,
                },
                headerTitleStyle: {
                    color: '#C9C8B9',
                },
                headerLeft: () => <Image source={path} style={styles.image} />
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
            <Stack.Screen name="HikeInfo" component={HikeInfoScreen} options={{ title: 'Trail Information' }} /> 
            <Stack.Screen name="InHike" component={InHikeScreen} options={{ title: 'Location' }}/>
            <Stack.Screen name="QRScanner" component={QRScreen} options={{ title: 'QR Scanner' }}/>         
        </Stack.Navigator>
    )
}

function ProfileStack() {
    return (
        <Stack.Navigator 
            initialRouteName="Profile"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#3C413E',
                    borderBottomColor: '#C98F39',
                    borderBottomWidth: 1,
                },
                headerTitleStyle: {
                    color: '#C9C8B9',
                },
                headerLeft: () => <Image source={path} style={styles.image} />
            }}
        >
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }}/>
            <Stack.Screen name="Goals" component={GoalScreen} options={{ title: 'Goals' }}/> 
        </Stack.Navigator>
    )
}

function HikeStack() {
    return (
        <Stack.Navigator 
            initialRouteName="Hike"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#3C413E',
                    borderBottomColor: '#C98F39',
                    borderBottomWidth: 1,
                },
                headerTitleStyle: {
                    color: '#C9C8B9',
                },
                headerLeft: () => <Image source={path} style={styles.image} />
            }}
        >
            <Stack.Screen name="HikeMenu" component={HikeMenuScreen} options={{ title: 'Find Trails' }} />
            <Stack.Screen name="HikeInfo" component={HikeInfoScreen} options={{ title: 'Trail Information' }}/> 
            <Stack.Screen name="InHike" component={InHikeScreen} options={{ title: 'Location' }}/> 
        </Stack.Navigator>
    )
}

function TabNavigator() {
    return (
      <NavigationContainer>
        <Tab.Navigator 
            initialRouteName="Home"
            tabBarOptions= {{
                activeBackgroundColor: '#6F6035',
                activeTintColor: '#C9C8B9',
                inactiveTintColor:'#3C413E',
                style: {
                    backgroundColor: '#C98F39',
                    borderTopColor: '#C98F39',
                    // borderTopWidth: 1,
                },
            }}                      
        >        
          <Tab.Screen 
            name="HomeStack" 
            component={HomeStack}
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Icon
                        name="home"
                        color={color}
                        size={size}
                    />
                ),
            }} 
          />
          <Tab.Screen 
            name="ProfileStack" 
            component={ProfileStack} 
            options={{
                tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <Icon
                        name="user"
                        color={color}
                        size={size}
                    />
                ),
            }} 
          />
          <Tab.Screen 
            name="HikeStack" 
            component={HikeStack}
            options={{
                tabBarLabel: 'Hikes',
                tabBarIcon: ({ color, size }) => (
                    <Icon
                        name="map-signs"
                        color={color}
                        size={size}
                    />
                ),
            }}  
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }

  export default TabNavigator;

  const styles = StyleSheet.create({
    image: {
        resizeMode: "center",       
    },
});