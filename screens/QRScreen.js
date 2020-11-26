/*
* The QRScreen features a QR scanner that the user can use to scan QR codes on their hikes. This screen
* gives functionality to the geocaching/scavenger hunt component of the app.
*/
import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QRCodeScanner from '../components/QRCodeScanner';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

class QRScreen extends Component {
    
    state = {
        // Declare/initialize state
        myDetails: {
            DistanceHiked: 0,
            ElevationClimbed: 0,
            HikesCompleted: 0,
        },
        delay: 0,
        result: '',       
    }

    constructor(props){
        super(props);
        // Get user's hiking information from Profiles collection in FireStore
        var clientId = firebase.auth().currentUser.uid;
        this.getUser(clientId);
        this.subscriber = firestore().collection('Profiles')
        .doc(clientId).onSnapshot( doc => {
            this.setState({
                myDetails: {
                    DistanceHiked: doc.data().DistanceHiked,
                    ElevationClimbed: doc.data().ElevationClimbed,
                    HikesCompleted: doc.data().HikesCompleted,
                },
                delay: 100,
                result: 'No result',
            });
        })

        this.handleScan = this.handleScan.bind(this)
    }

    handleScan(data){
        this.setState({
          result: data,
        })
      }

    handleError(err){
        console.error(err)
    }

    getUser = async(cId) => {
        const userDocument = await firestore().collection('Profiles')
            .doc(cId).get();
      }

     // Used QR guide as reference https://www.npmjs.com/package/react-qr-scanner
    updateUser = async() => {
        let isMounted = true;
         var clientId = firebase.auth().currentUser.uid;
         const userDocument = await firestore().collection('Profiles')
             .doc(clientId).update({DistanceHiked: this.state.myDetails.DistanceHiked + 1000});
        return isMounted = false;
    }

    // Increments the number of hikes completed 
    updateHikesCompleted = async() => {
        let isMounted = true;
        var clientId = firebase.auth().currentUser.uid;
         const userDocument = await firestore().collection('Profiles')
             .doc(clientId).update({HikesCompleted: this.state.myDetails.HikesCompleted + 1});
        return isMounted = false;
    }
    render() {
        const previewStyle = {
            height: 240,
            width: 320,
        };
        return (
            <>
                <View style={styles.background}>
                    <QRCodeScanner
                        delay={this.state.delay}
                        style={previewStyle}
                        onError={this.handleError}
                        onScan={this.handleScan}
                    /> 
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.updateUser()}
                    >
                        <Text>Write to Profile</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text>{this.state.result}</Text>
                </View>
            </>
        );
    }
};
export default QRScreen;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#3C413E',
    },
});