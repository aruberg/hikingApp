import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import logo from './images/logo.png';

class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Image source={logo} />
            </View>
        )
    }
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C98F39',
        justifyContent: 'center',
        alignItems: 'center',
    },
});