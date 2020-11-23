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
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as Progress from 'react-native-progress';
import {Surface, Shape} from '@react-native-community/art';

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
            DistanceGoal: 25000,
            ElevationGoal: 5000,
            HikeCountGoal: 25,
            DaysToComplete: 30,
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
                    DistanceGoal: doc.data().DistanceGoal,
                    ElevationGoal: doc.data().ElevationGoal,
                    HikeCountGoal: doc.data().HikeCountGoal,
                    DaysToComplete: doc.data().DaysToComplete,
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
                <TouchableOpacity style={styles.signOutButton} onPress={() => signOutUser()}>
                  <Text>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>

              {/* Statistics */}
              <View style={styles.featuredCenter}> 
                <View style={styles.imageContainer}>
                  <View style={styles.statsView}>
                    <Icon name="hiking" size={40} color={'#6F6035'} />
                    <Text style={styles.statTextLabel}>Distance Hiked</Text>
                    <Text style={styles.statisticsTextStyle}>{(this.state.user.DistanceHiked)/1000} km</Text>
                  </View>
                  <View style={styles.statsView}>
                    <Icon name="mountain" size={40} color={'#6F6035'} />
                    <Text style={styles.statTextLabel}>Elevation Climbed</Text>
                    <Text style={styles.statisticsTextStyle}>{this.state.user.ElevationClimbed} m</Text>
                  </View>
                  <View style={styles.statsView}>
                    <Icon name="map-signs" size={40} color={'#6F6035'} />
                    <Text style={styles.statTextLabel}>Hikes Completed</Text>
                    <Text style={styles.statisticsTextStyle}>{this.state.user.HikesCompleted} Trails</Text>
                  </View>     
                </View>
              </View>

              {/* Goals */}
              <TouchableOpacity 
              style={styles.board} 
              onPress={() => navigation.navigate('Goals')}
              >              
                <Text style={styles.boardTextStyle}>Goals</Text>
                <View style={styles.badgeContainer}>
                  <View style={styles.individualBadgeContainer}>
                    <Icon name="route" size={40} color={'#6F6035'} />
                    <Text>Distance Goal</Text>
                    <Text style={styles.statisticsTextStyle}>{this.state.user.DistanceGoal/1000} km</Text>
                  </View>
                  <View style={styles.individualBadgeContainer}>
                    <Icon name="chart-area" size={40} color={'#6F6035'} />
                    <Text>Elevation Goal</Text>
                    <Text style={styles.statisticsTextStyle}>{this.state.user.ElevationGoal} m</Text>
                  </View>
                  <View style={styles.individualBadgeContainer}>
                    <Icon name="globe-americas" size={40} color={'#6F6035'} />
                    <Text>Total Hikes Goal</Text>
                    <Text style={styles.statisticsTextStyle}>{this.state.user.HikeCountGoal} Trails</Text>
                  </View>
                </View>
              </TouchableOpacity>
               
              {/* Awards */}
              <View style={styles.board}>
                <Text style={styles.boardTextStyle}>Awards Earned</Text>
                <View style={styles.badgeContainer}>
                    <Image 
                      style={styles.badgeStyle} 
                      source={this.state.user.DistanceHiked > 100000 ? require('../images/100-kilometres-badge.png'): 
                      this.state.user.DistanceHiked > 50000 ? require('../images/50-kilometres-badge.png'): 
                      this.state.user.DistanceHiked > 25000 ? require('../images/25-kilometres-badge.png'): 
                      require('../images/0-distance-badge.png')}
                    />
                    <Image 
                      style={styles.badgeStyle} 
                      source={this.state.user.ElevationClimbed > 20000 ? require('../images/20-km-elevation-badge.png'): 
                      this.state.user.ElevationClimbed > 10000 ? require('../images/10-km-elevation-badge.png'): 
                      this.state.user.ElevationClimbed > 5000 ? require('../images/5-km-elevation-badge.png'): 
                      require('../images/0-elevation-badge.png')}
                    />
                    <Image 
                      style={styles.badgeStyle} 
                      source={this.state.user.HikesCompleted > 100 ? require('../images/100-hikes-badge.png'): 
                      this.state.user.HikesCompleted > 50 ? require('../images/50-hikes-badge.png'): 
                      this.state.user.HikesCompleted > 25 ? require('../images/25-hikes-badge.png'): 
                      require('../images/0-distance-badge.png')}
                    />
                  </View>
                </View>
       


                          
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('SetANewGoal')}>
                          <Text>Hikes Completed </Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Goal')}>
                          <Text>Goals</Text>
                      </TouchableOpacity>


          
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
    marginHorizontal: '2%',
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
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: "10%",
    alignItems: 'center',
    
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
      fontSize:26,
      color: "black",
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
  featuredTextStyle: {
    color: '#C9C8B9',
    backgroundColor: '#453D5F',
    fontSize: 22,
    textAlign: 'center',
    paddingVertical: "2%",
    fontWeight: 'bold',
    marginTop: 10,
  },
  featuredHikeContainer: {
    flex: 2,
    backgroundColor: '#C9C8B9',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    marginTop: "2%",     
  },
  featuredCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flexDirection: 'row',
    width: "98%",
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    margin: 0,
    marginBottom: 10,
    backgroundColor: '#C9C8B9',
  },
  statsView: {
    width: "33.3%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: '#3C413E'
  },
  statTextLabel: {
    textDecorationLine: 'underline',
  },
  badgeContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    //flex: 1,
      // width: 330,
      height: 150,
      backgroundColor: '#C9C8B9',
      margin: "2%",
  },
  boardTextStyle: {
      color: '#C9C8B9',
      backgroundColor: '#453D5F',
      fontSize: 18,
      paddingVertical: "2%",
      fontWeight: 'bold',
      paddingLeft: "5%",
    },
    badgeStyle: {
      width: "33%",
      height: "90%",
      resizeMode: 'contain',
    },
    individualBadgeContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: "33.3%",

      height: "100%",
      borderStyle: "solid",
      borderWidth: 3.25,
      borderColor: '#3C413E'
    },
});
