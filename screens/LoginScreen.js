
import React, {Component, Button, useState, useEffect } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { 
    View, 
    Image, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ImageBackground,
} from 'react-native';

import logo from '../images/logo.png';
import background from '../images/background.jpg';
import auth from '@react-native-firebase/auth';
import { 
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';


function LoginScreen({navigation}) {

    // _signIn = async () => {
    //     try {
    //         await GoogleSignin.hasPlayServices();
    //         const userInfo = await GoogleSignin.signIn();
    //         setUser(userInfo);
    //         setError(null);
    //         setLoggedIn(true);          
    //     } catch (error) {
    //       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //         // user cancelled the login flow
    //         alert('Cancel');
    //       } else if (error.code === statusCodes.IN_PROGRESS) {
    //         alert('Signin in progress');
    //         // operation (f.e. sign in) is in progress already
    //       } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //         alert('PLAY_SERVICES_NOT_AVAILABLE');
    //         // play services not available or outdated
    //       } else {
    //         // some other error happened
    //       }
    //     }
    //   }

    //render() {
        return (
            <>
                <View style={styles.container}>
                    <ImageBackground 
                        source={ require('../images/background.jpg') }
                        resizeMode='cover' 
                        style={styles.backgroundImage}>
                    </ImageBackground>
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.image} />
                    </View>
                    <View style={styles.userInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Username"
                            placeholderTextColor="#fff"
                            onChangeText={
                                text => this.setState({username:text})
                            }
                        />       
                    </View>
                    <View style={styles.userInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Password"
                            placeholderTextColor="#fff"
                            onChangeText={
                                text => this.setState({password:text})
                            }
                        />       
                    </View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>
                    <View style={styles.googleContainer}>
                        {/* <GoogleSigninButton
                            style={{width: 192, height: 48}}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}
                        /> */}
                    </View>
                    <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.signUpText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </>       
        );
    //}
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3C413E",
        alignItems: 'center',
        justifyContent: 'center'       
    },

    logoContainer: {
        marginBottom: 20
    },

    image: {
        resizeMode: "contain"
    },

    userInput: {
        width: "70%",
        backgroundColor: "#6F6035",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },

    inputText: {
        height: 50,
        color: "#C9C8B9"
    },

    forgotPassword: {
        color: "#C9C8B9",
        fontSize: 11,
        marginTop: 10,
        marginBottom: 10
    },

    loginButton: {
        width: "70%",
        backgroundColor: '#C98F39',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 10
    },

    signUpButton: {
        width: "70%",
        borderRadius: 25,
        borderColor: '#C98F39',
        borderWidth: 2,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10
    },

    loginText: {
        color: "#C9C8B9" 
    },

    signUpText: {
        color: '#C98F39'
        
    },

    googleContainer: {
        marginTop: 30,
        marginBottom: 20,
    },

    backgroundImage: {
        width: '100%',
    },
});