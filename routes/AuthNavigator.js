import React, { useState, useEffect, createContext } from 'react'
import auth from '@react-native-firebase/auth'
import SignInStack from './SignInStack'
import SignOutStack from './SignOutStack'
import SplashScreen from '../screens/SplashScreen'
import { 
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

export const AuthContext = createContext(null);

export default function AuthNavigator() {
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setLoggedIn] = useState(false);


    // Handle user state changes
    function onAuthStateChanged(result) {
        setUser(result)
        if (initializing) setInitializing(false)
    }

    useEffect(() => {
        const authSubscriber = auth().onAuthStateChanged(onAuthStateChanged)
        
        GoogleSignin.configure({
            //scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
            webClientId:
              '37900722239-6mprm2e5rnppth7oec0topblds4337vs.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
          });

        // Unsubscribe on unmount
        return authSubscriber
    }, [])

    if (initializing) {
        return null
    }

    return user ? (
        <AuthContext.Provider value={user}>
            <SignInStack />
        </AuthContext.Provider>
    ) : (
        <SignOutStack />
    )
}