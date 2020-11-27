/*
* The ForgotPasswordScreen allows the user to reset their password. This screen populates after
* clicking the ForgotPassword button.
*/
import React, {Component, Button, useState, useEffect } from 'react';
import { 
    View, 
    Image, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ImageBackground,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import path from '../images/path.png';
import background from '../images/background.jpg';
import auth from '@react-native-firebase/auth';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';


class ForgotPasswordScreen extends Component {

    constructor(props){
        super(props);
        this.state = {email: ""};
    }

 
  render() {
    return (
        <>
            <ImageBackground 
                source={ require('../images/background.jpg') }
                resizeMode='cover' 
                style={styles.backgroundImage}
                imageStyle={{opacity: 0.2}}>
                    {/* Create Account title */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Forgot Password?</Text>
                    </View>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image source={path} style={styles.image} />
                    </View>
                    {/* Email */}
                    <View style={styles.userInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Enter email"
                            placeholderTextColor="#fff"
                            onChangeText={
                                text => this.state.email
                            }
                        />       
                    </View>    
                    {/* Send Email button */}
                    <TouchableOpacity 
                        style={styles.signUpButton} 
                        onPress={() => firebase.auth().sendPasswordResetEmail(this.state.email)}
                    >
                        <Text style={styles.signUpText}>Send Email</Text>
                    </TouchableOpacity>
            </ImageBackground>
            

        </>       
    );
  }
    
}

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        flex: 1,
        backgroundColor: "#3C413E",
        alignItems: 'center',
        justifyContent: 'center'       
    },
    logoContainer: {
        marginBottom: 15,
    },
    titleContainer: {
        marginBottom: 5,
    },
    image: {
        resizeMode: "contain"
    },
    forgotPassword: {
        color: "#C9C8B9",
        fontSize: 11,
        marginTop: 10,
        marginBottom: 10
    },
    inputText: {
        height: 50,
        color: "#C9C8B9",
    },
    signUpButton: {
        width: "70%",
        backgroundColor: '#C98F39',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2%",
        marginBottom: "3%",
    },
    signUpText: {
        color: "#C9C8B9" 
    },
    userInput: {
        width: "70%",
        backgroundColor: "#6F6035",
        borderRadius: 25,
        height: 50,
        marginBottom: 15,
        justifyContent: "center",
        padding: 20
    }, 
    titleText: {
        fontFamily: "Britannic Bold",
        fontSize: 40,
        fontWeight: "bold",
        color: "#C9C8B9"
    },
});