import React, {Component} from 'react';
import FadeInView from '../components/FadeInView';
import { 
    View,
    Image, 
    Text,
    StyleSheet, 
    Animated,
    ImageBackground, 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from '../images/logo.png';
import background from '../images/background.jpg';
import auth, { firebase } from '@react-native-firebase/auth';//Needed to for authentication check

function SplashScreen({navigation}) {
        
    setTimeout(
            () => {
                navigation.navigate("Login");
            },

            3 * 1000
        );
    

    return (
        <ImageBackground 
            source={ require('../images/background.jpg') }
            resizeMode='cover' 
            style={styles.backgroundImage}
            imageStyle={{opacity: 0.2}}>
            <FadeInView>
                <Image source={logo} style={styles.image} />
            </FadeInView>            
        </ImageBackground>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        flex: 1,
        backgroundColor: '#3C413E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        resizeMode: "contain",
    },
});