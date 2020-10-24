import React, { useState, useEffect, createContext } from 'react'
import auth from '@react-native-firebase/auth'
import SignInStack from './SignInStack'
import SignOutStack from './SignOutStack'
import SplashScreen from '../screens/SplashScreen'
import TabNavigator from './TabNavigator'
import { 
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


export const AuthContext = createContext(null);

export default function AuthNavigator() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);

    // Handle user state changes
    function onAuthStateChanged(result) {
        setUser(result)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)
        
        // unsubsribe to unmount
        return authSubscriber
    }, [])

    if (initializing) {
        return null
    }

    return user ? (
        <AuthContext.Provider value={user}>
            <TabNavigator />
        </AuthContext.Provider>
    ) : (
        <SignOutStack />
    )
}