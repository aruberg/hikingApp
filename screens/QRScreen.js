import React, {Component} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import QRCodeScanner from '../components/QRCodeScanner';
import firestore from '@react-native-firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

class QRScreen extends Component {
    state = {
        myDetails: {
            DistanceHiked: 0,
            ElevationClimbed: 0,
            HikesCompleted: 0,
        }
    }

    constructor(props){
        super(props);
        this.getUser();
        this.subscriber = firestore().collection('Profiles')
        .doc('ProfileTemplate').onSnapshot( doc => {
            this.setState({
                myDetails: {
                    DistanceHiked: doc.data().DistanceHiked,
                    ElevationClimbed: doc.data().ElevationClimbed,
                    HikesCompleted: doc.data().HikesCompleted,
                }
            });
        })
    }

     getUser = async() => {
         const userDocument = await firestore().collection('Profiles')
             .doc('ProfileTemplate').get();
         console.log(userDocument);
     }

    updateUser = async() => {
        let isMounted = true;
         const userDocument = await firestore().collection('Profiles')
             .doc('ProfileTemplate').update({DistanceHiked: this.state.myDetails.DistanceHiked + 1000});
        return isMounted = false;
    }

    render() {
        return (
            <>
                <View style={styles.background}>
                    <QRCodeScanner  /> 
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => this.updateUser()}
                    >
                        <Text>Write to Profile</Text>
                    </TouchableOpacity>
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