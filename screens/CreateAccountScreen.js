/*
* The CreateAccountScreen allows the user to create an account with TrailPro. The user enters their  
* first name, last name, email address and a password to create an account. The account is stored in
* Google Firebase and a profile document is created in FireStore with the information entered by the user.
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

// On button click, create new user in Firestore
function createNewUser(email, password, first, last) {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
            var clientId = firebase.auth().currentUser.uid;
            console.log(clientId);
            // Add user to Firestore and populate fields
            firebase.firestore().collection('Profiles').doc(clientId).set({
                FirstName: first,
                LastName: last,
                DistanceHiked: 1,
                ElevationClimbed: 1,
                HikesCompleted: 0,
                DaysToComplete: 30,
                DistanceGoal: 25000,
                ElevationGoal: 5000,
                HikeCountGoal: 25, 
            })
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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    return (
        <>
            <ImageBackground 
                source={ require('../images/background.jpg') }
                resizeMode='cover' 
                style={styles.backgroundImage}
                imageStyle={{opacity: 0.2}}>
                    {/* Create Account title */}
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Create Account</Text>
                    </View>
                    {/* Logo */}
                    <View style={styles.logoContainer}>
                        <Image source={path} style={styles.image} />
                    </View>
                    {/* First name */}
                    <View style={styles.userInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="First name"
                            placeholderTextColor="#fff"
                            autoCapitalize='words'
                            onChangeText={
                                text => setFirstName(text)
                            }
                        />       
                    </View>
                    {/* Last name */}
                    <View style={styles.userInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Last name"
                            placeholderTextColor="#fff"
                            autoCapitalize='words'
                            onChangeText={
                                text => setLastName(text)
                            }
                        />       
                    </View>
                    {/* Email */}
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
                    {/* Password */}
                    <View style={styles.userInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Password"
                            placeholderTextColor="#fff"
                            secureTextEntry={true}
                            onChangeText={
                                text => setPassword(text)
                            }
                        />       
                    </View>
                    {/* Confirm password */}
                    <View style={styles.userInput}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Confirm Password"
                            placeholderTextColor="#fff"
                            secureTextEntry={true}
                            onChangeText={
                                text => setConfirmPassword(text)
                            }
                        />       
                    </View>
                    {/* Sign up button */}
                    <TouchableOpacity 
                        style={styles.signUpButton} 
                        onPress={() => 
                            {
                                //let passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{​​6,}​​)");
                                //emailRegex = "/^[a-zA-Z_]"


                                // Error checking
                                if (password.length < 6)
                                    alert("Password must be at least 6 characters");
                                
                                // if first name field is empty
                                else if (firstName == "")
                                {
                                    alert("Please enter your first name")
                                }
                                
                                // if last name field is empty
                                else if (lastName == "")
                                {
                                    alert("Please enter your last name")
                                }

                                // If email is correct
                                else if (!(/[@]/.test(email) && /[.]/.test(email) && /[^$(){}#!&*]/.test(email)))
                                {
                                    alert("Please enter a valid email address")
                                }

                                // If password passes the complexity test
                                else if (!(/[A-Z]/.test(password) && /[0-9]/.test(password) && /^[A-Za-z0-9]{6,}$/.test(password)))
                                {
                                    alert("Weak password: please enter a password that includes a number and a symbol")
                                }
                                
                                // create new account
                                else
                                {
                                    password == confirmPassword ? createNewUser(email, password, firstName, lastName) : alert("Password does not match")
                                }

                            }
                                    
                        }
                    >
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
        color: "#C9C8B9",
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