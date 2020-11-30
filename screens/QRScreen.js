/*
* The QRScreen features a QR scanner that the user can use to scan QR codes on their hikes. This screen
* gives functionality to the geocaching/scavenger hunt component of the app.
*/
import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

class QRScreen extends Component {
    
    state = {
        // Declare/initialize state
        myDetails: {
            DistanceHiked: 0,
            ElevationClimbed: 0,
            HikesCompleted: 0,
        },
        delay: 0,      
    }

    constructor(props){
        super(props);
        this._isMounted = false
        this.onSuccess = this.onSuccess.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
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
            });
        });
    }

    componentWillUnmount() {
        this._isMounted = false
        this.subscriber();
    }

    // Used QR guide as reference https://www.npmjs.com/package/react-qr-scanner
    updateProfile = async(distanceAdded, elevationAdded) => {
        let isMounted = true;
        console.log(distanceAdded)
        console.log(elevationAdded)
            var clientId = firebase.auth().currentUser.uid;
            const userDocument = await firestore().collection('Profiles')
                .doc(clientId).update({
                    DistanceHiked: this.state.myDetails.DistanceHiked + distanceAdded,
                    ElevationClimbed: this.state.myDetails.ElevationClimbed + elevationAdded,
                    HikesCompleted: this.state.myDetails.HikesCompleted + 1  
                });
        return isMounted = false;
    }

    onSuccess(data){
        var trailData = JSON.parse(data.data);
        this.updateProfile(trailData.Distance, trailData.Elevation)
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
                        onRead={this.onSuccess}
                        flashMode={RNCamera.Constants.FlashMode.torch}
                        showMarker={true}
                        delay={this.state.delay}
                        style={previewStyle}
                    /> 
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