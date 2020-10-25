/**
 * This is the Screen users will see when they are perfoming a hike. 
 * The map should be the trail chosen and it should indicate where the QR code is 
 * The button when clicked it should open the camera to be able to scan the QR code. 
 * 
 * Improvements: 
 * Add a exit hike button 
 * Set 24h timer HERE after QR has been scan
 */
import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity,Alert } from 'react-native';
import logo from '../images/logo.png';
import mapGeneric from '../images/mapGeneric.jpg';
import ShowMap from '../components/ShowMap';

function InHikeScreen({navigation}) {

    return (
        <>
        <View style={{height: "65%", width: "100%", backgroundColor:"#3C413E"}}>
            <ShowMap >
            </ShowMap>
        </View>
        <View style={styles.container}>    
            <TouchableOpacity
            style={styles.buttonContainerCircle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('QRScanner')}
            >
            <Text style={styles.buttonTextStyle}>QR Scan!</Text>
            </TouchableOpacity>
        </View>
        </>
        
        );
            
    }

export default InHikeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3C413E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainerCircle: {
        backgroundColor: '#C98F39',
        borderWidth: 5,
        color: '#6F6035',
        borderColor: 'black',
        height: 200,
        width: 200,
        alignItems: 'center',
        borderRadius: 100,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        paddingBottom: 10,

      },
      buttonTextStyle: {
        color: '#C9C8B9',
        paddingVertical: 75,
        fontSize: 30,
      },
      image: {
        resizeMode: "contain",
        width: 200,
        height: 250,
        marginTop: -70,
        marginBottom: 0,

    },
    mapImage: {
        resizeMode: "contain",
        width: 300,
        height: 300,
        marginTop: -60,
        marginBottom: 0,
        borderWidth: 5,
        borderColor: '#C9C8B9',

    },
    board: {
        width: 250,
        height: 100,
        backgroundColor: '#86608e',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,


    },
    boardTextStyle: {
        color: '#C9C8B9',
        paddingVertical: 10,
        paddingLeft: 20,
        fontSize: 16,
      },

    mapContainer: {

    },

});