import React, {Component} from 'react';
import { View, StyleSheet } from 'react-native';
import QRCodeScanner from '../components/QRCodeScanner';

function QRScreen() {
    return (
        <View style={styles.background}>
            <QRCodeScanner  /> 
        </View>
    );
};

export default QRScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#3C413E',
    },
});