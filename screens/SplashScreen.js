import React, {Component} from 'react';
import FadeInView from '../components/FadeInView';
import { 
    View,
    Image, 
    Text,
    StyleSheet, 
    Animated 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from '../images/logo.png';
import firebase from 'react-native-firebase'; //Needed to for authentication check

class SplashScreen extends Component {
    //Guide to check auth state on load included here:
    //https://medium.com/better-programming/react-native-firebase-authentication-7652e1d2c8a2
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            this.props.navigation.navigate(user ? 'Home' : 'Login')})
    }

    render() {
        return (
            <View style={styles.container}>
                <FadeInView>
                    <Image source={logo} style={styles.image} />
                </FadeInView>            
            </View>
        )
    }
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3C413E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        resizeMode: "contain",
    },
});