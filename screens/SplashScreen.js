import React, {Component} from 'react';
import FadeInView from '../components/FadeInView';
import { 
    View,
    Image, 
    Text, 
    StyleSheet, 
    Animated 
} from 'react-native';
import logo from '../images/logo.png';

class SplashScreen extends Component {
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