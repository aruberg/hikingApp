import 'react-native-gesture-handler';
import * as React from 'react';
import { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';

import GoalScreen from './screens/GoalScreen';
import HomeScreen from './screens/HomeScreen';
import InHikeScreen from './screens/InHikeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import SetANewGoalScreen from './screens/SetANewGoalScreen';
import SplashScreen from './screens/SplashScreen';

import AuthNavigator from './routes/AuthNavigator';

const App = () => {
  return <AuthNavigator />
}

export default App
// //const AuthContext = React.createContext();
// const Stack = createStackNavigator();

// export default function App({ navigation }) {



//   //Add Authentication piece following guide here: https://rnfirebase.io/auth/usage
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

// /*
//   if (!user) {
//       return (
//         <View>
//           <Text>Login</Text>
//         </View>
//       );
//     }
// */
//   return (
//     //<AuthContext.Provider value={authContext}>
//     <NavigationContainer>
//         <Stack.Navigator initialRouteName="Splash">
//             <Stack.Screen
//               name="Splash"
//               component={SplashScreen}
//               options={{headerShown: false}}
//             />

//             <Stack.Screen
//               name="Login"
//               component={LoginScreen}
//               options={{ headerShown: false }}
//             />

//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//           />

//           <Stack.Screen
//             name="Goal"
//             component={GoalScreen}
//           />

//           <Stack.Screen
//             name="SetNewGoal"
//             component={SetANewGoalScreen}
//           />
//         </Stack.Navigator>
//     </NavigationContainer>
//     //</AuthContext.Provider>
//   );
// }
