import React, {Component} from 'react';
import { 
    View, 
    Image, 
    Text, 
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import logo from '../images/logo.png';

class LoginScreen extends Component {
    render() {
        return (
            <>
                <View style={styles.container}>
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
                                text => this.setState({username:text})
                            }
                        />       
                    </View>
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.forgotPassword}>Forgot Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.signUpButton}>
                        <Text style={styles.signUpText}>Create Account</Text>
                    </TouchableOpacity>
                </View>
            </>       
        );
    }
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
        
    }
});