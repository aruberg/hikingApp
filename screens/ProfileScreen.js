import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore, { firebase } from '@react-native-firebase/firestore';

function signOutUser() {
  auth()
      .signOut()
      .then(() => {
          console.log('User signed out!');
       })
  };

class Profile extends Component{
    state = {
        user: {
            DistanceHiked: 0,
            ElevationClimbed: 0,
            First: "",
            HikesCompleted: 0,
            Last: "",
            Nickname: "",
        }
    }


    constructor(props){
        super(props);
        var clientId = firebase.auth().currentUser.uid;
        this.getUser(clientId);
        this.subscriber = firestore().collection('Profiles')
        .doc(clientId).onSnapshot( doc => {
            this.setState({
                user: {
                    DistanceHiked: doc.data().DistanceHiked,
                    ElevationClimbed: doc.data().ElevationClimbed,
                    FirstName: doc.data().FirstName,
                    HikesCompleted: doc.data().HikesCompleted,
                    LastName: doc.data().LastName,
                }
            });
        })

    }

    getUser = async(cId) => {
        const userDocument = await firestore().collection('Profiles')
            .doc(cId).get();
    }

    render() {
        const  { navigation } = this.props;
        return (
          <ImageBackground 
          source={ require('../images/background.jpg') }
          resizeMode='cover' 
          style={styles.backgroundImage}
          imageStyle={{opacity: 0.2}}
          >
            {/* Header */}
            <View style={styles.header}>
              <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
              <View style={styles.userName}>  
                <Text style={styles.name}>{this.state.user.FirstName} {this.state.user.LastName}</Text>
              </View>
            </View>
              {/* Body */}
            <View style={styles.boardContent}>
                <View style={styles.statisticsBoard}>
                    <Text>Statistics</Text>
                    <Text style={styles.statisticsTextStyle}>Trails Hiked: {this.state.user.HikesCompleted}</Text>
                    <Text style={styles.statisticsTextStyle}>Distance Hiked: {(this.state.user.DistanceHiked)/1000} km</Text>
                    <Text style={styles.statisticsTextStyle}>Elevation Climbed: {this.state.user.ElevationClimbed} m</Text> 
                </View>
                <View>                 
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('SetANewGoal')}>
                          <Text>Hikes Completed </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Goal')}>
                          <Text>Goals</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.signOutButton} onPress={() => signOutUser()}>
                          <Text>Sign Out</Text>
                      </TouchableOpacity>
                </View>
                
            </View>

          </ImageBackground>
          
        );
    }
}

export default Profile;

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center', 
    backgroundColor: "#3C413E",  
  },
  header:{
    flexDirection: 'row',
    backgroundColor: "#453D5F",
    height: "22%",
    alignItems: 'center',
    paddingHorizontal: "4%",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#C9C8B9",
    marginRight: "4%",
  },
  userName: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: "10%",
  },
  body:{
    backgroundColor: 'red',
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    
  },
  boardContent: {
    alignItems: 'center',
  },
  name:{
    fontSize:28,
    color: "#C9C8B9",
    fontWeight: "600",
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#C98F39",
  },
  statisticsBoard: {
    width: "100%",
    height: 100,
    backgroundColor: '#679267',
  },
  statisticsTextStyle: {
      fontSize:18,
      color: "#D6D6C7",
      fontWeight: "600",
    
  },
  signOutButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width: "100%",
    borderRadius:10,
    backgroundColor: "#C98F39",
  },
});
