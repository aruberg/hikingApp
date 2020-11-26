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

// On button click, create new user in Firestore
// function createNewUser(email, password, first, last) {
//     auth()
//         .createUserWithEmailAndPassword(email, password)
//         .then(() => {
//             var clientId = firebase.auth().currentUser.uid;
//             console.log(clientId);
//             // Add user to Firestore and populate fields
//             firebase.firestore().collection('Profiles').doc(clientId).set({
//                 FirstName: first,
//                 LastName: last,
//                 DistanceHiked: 0,
//                 ElevationClimbed: 0,
//                 HikesCompleted: 0,
//                 DaysToComplete: 30,
//                 DistanceGoal: 25000,
//                 ElevationGoal: 5000,
//                 HikeCountGoal: 25, 
//             })
//          })
//     .catch(error => {
//         if (error.code === 'auth/email-already-in-use') {
//             console.log('That email address is already in use!');
//         }

//         if (error.code === 'auth/invalid-email') {
//             console.log('That email address is invalid!');
//         }

//     console.error(error);
//   });
// }


function ForgotPasswordScreen({navigation})  {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Reset password functions
    passwordReset(() => {
        return firebase.auth().sendPasswordResetEmail(email)
    })

    handlePasswordReset = async (values, actions) => {
        const { email } = values;
      
        try {
          await this.props.firebase.passwordReset(email);
          console.log('Password reset email sent successfully');
          navigation.navigate('Login');
        } catch (error) {
          actions.setFieldError('general', error.message);
        }
      };
      
    
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
                                text => setEmail(text)
                            }
                        />       
                    </View>    
                    {/* Send Email button */}
                    <TouchableOpacity 
                        style={styles.signUpButton} 
                        onSubmit={(values, actions) => {
                            this.handlePasswordReset(values, actions)
                        }}
                    >
                        <Text style={styles.signUpText}>Send Email</Text>
                    </TouchableOpacity>
            </ImageBackground>
            

        </>       
    );
    
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