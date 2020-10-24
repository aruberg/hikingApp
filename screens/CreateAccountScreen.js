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

function createNewUser(email, password) {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            console.log('User account created & signed in!');
         })
    .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
        }

    console.error(error);
  });
}

function CreateAccountScreen({navigation})  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
        return (
            <>
                <ImageBackground 
                    source={ require('../images/background.jpg') }
                    resizeMode='cover' 
                    style={styles.backgroundImage}
                    imageStyle={{opacity: 0.2}}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.titleText}>Create Account</Text>
                        </View>
                        <View style={styles.logoContainer}>
                            <Image source={path} style={styles.image} />
                        </View>
                        <View style={styles.userInput}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="First name"
                                placeholderTextColor="#fff"
                                onChangeText={
                                    text => this.setState({firstName:text})
                                }
                            />       
                        </View>
                        <View style={styles.userInput}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Last name"
                                placeholderTextColor="#fff"
                                onChangeText={
                                    text => this.setState({lastName:text})
                                }
                            />       
                        </View>
                        <View style={styles.userInput}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Email"
                                placeholderTextColor="#fff"
                                onChangeText={
                                    text => setEmail(text)
                                }
                            />       
                        </View>
                        <View style={styles.userInput}>
                            <TextInput
                                style={styles.inputText}
                                placeholder="Password"
                                placeholderTextColor="#fff"
                                onChangeText={
                                    text => setPassword(text)
                                }
                            />       
                        </View>
                        <TouchableOpacity style={styles.signUpButton} onPress={() => createNewUser(email, password)}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                </ImageBackground>

            </>       
        );
    
}

export default CreateAccountScreen;

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
        color: "#C9C8B9"
    },

    signUpButton: {
        width: "70%",
        backgroundColor: '#C98F39',
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        marginBottom: 10
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