// import React from 'react'
// import { createStackNavigator } from '@react-navigation/stack';
// import {
//     SplashScreen,
//     LoginScreen,
//     HomeScreen,
//     ProfileScreen
// } from '../screens'

// const Stack = createStackNavigator();

// const MainNavigation = () => {

//     if (state.isLoading) {
//         return <SplashScreen />
//     }

//     return (
//         <Stack.Navigator>
//             {state.userToken == null ? (
//                 //  No token found, user isn't signed in
//                 <>
//                 {/* Display splash screen and then login screen */}
//                     <Stack.Screen 
//                     name="SplashScreen"
//                     component={SplashScreen}
//                     options={{headerShown: false}}          
//                     />
//                     <Stack.Screen
//                         name="Login"
//                         component={LoginScreen}
//                         options={{
//                             headerShown: false,
//                             // Pop animation for logging out
//                             animationTypeForReplace: state.isSignout ? 'pop' : 'push',
//                         }} 
//                     />
//                 </>
//             ) : (
//                 // User is signed in
//                 <>
//                     <Stack.Screen 
//                         name="Home"
//                         component={HomeScreen}
//                     />
//                     <Stack.Screen
//                         name="Profile"
//                         component={ProfileScreen}
//                     />
//                 </>
//             )}
//         </Stack.Navigator>
//     );
// };