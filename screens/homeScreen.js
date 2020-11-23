/**
 * This is the home screen. 
 * When clicking on Do a hike it should redirect user to hikeMenu.
 * When clicking on my profile it should redirect user to ProfileScreen 
 * In the Goals board a summary of all the users goals should be displayed in addition 
 * to how much they have completed so far. 
 * In the Awards board a summary of all the awards earned so far should be displayed. 
 */
import React, {Component, useState, useEffect} from 'react';
import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { block } from 'react-native-reanimated';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import { NavigationActions } from 'react-navigation';
import * as Progress from 'react-native-progress';
import {Surface, Shape} from '@react-native-community/art';


const defaultStoragebucket = storage();

class HomeScreen extends Component {
  state = {
    featuredHike: {
        Description: "",
        Distance: 0,
        Duration: 0,
        Elevation: 0,
        Path: [],
        TrailName: "",
        PhotoURL: "",
        Rating: "",
        Region: "",
        ShortDescription: "",
        StartLocation: [],
        Description: "",


    },

    userProfile: {
      DistanceHiked: 0,
      ElevationClimbed: 0,
      HikesCompleted: 0,
      DistanceGoal: 0,
      ElevationGoal: 0,
      HikeCountGoal: 0,
      DaysToComplete: 0,
    },

  }

  constructor(props){
    super(props);
    this.subscriber = firestore().collection('FeaturedHike')
    .doc('FeaturedHikeDetails').onSnapshot( doc => {
        this.setState({
            featuredHike: {
                TrailName: doc.data().TrailName,
                PhotoURL: doc.data().PhotoURL,
                Description: doc.data().Description,
                Distance: doc.data().Distance,
                Duration: doc.data().Duration,
                Elevation: doc.data().Elevation,
                Path: doc.data().Path,
                Rating: doc.data().Rating,
                Region: doc.data().Region,
                ShortDescription: doc.data().ShortDescription,
                StartLocation: doc.data().StartLocation,
            },    
        });
    })

    // User Profile
    var clientId = firebase.auth().currentUser.uid;
    this.getUser(clientId);
    this.subscriber2 = firestore().collection('Profiles')
    .doc(clientId).onSnapshot( doc => {
        this.setState({
            userProfile: {
                DistanceHiked: doc.data().DistanceHiked,
                ElevationClimbed: doc.data().ElevationClimbed,
                HikesCompleted: doc.data().HikesCompleted,
                DistanceGoal: doc.data().DistanceGoal,
                ElevationGoal: doc.data().ElevationGoal,
                HikeCountGoal: doc.data().HikeCountGoal,
                DaysToComplete: doc.data().DaysToComplete,
                DistanceProgress: doc.data().DistanceHiked / doc.data().DistanceGoal,
                ElevationProgress: doc.data().ElevationClimbed / doc.data().ElevationGoal,
                HikeCountProgress: doc.data().HikesCompleted / doc.data().HikeCountGoal,
            }
        });
    })

  }

  getUser = async(cId) => {
    let isMounted = true;
      const userDocument = await firestore().collection('Profiles')
          .doc(cId).get();
    isMounted = false;
}


// getUser = async(cId) => {
//   const userDocument = await firestore().collection('Profiles')
//       .doc(cId).get();
// }

  // getElevationAward = (elevationGained) => {
  //   switch (true)
  //   {
  //     case (elevationGained > 20000):
  //       return '../images/20-km-elevation-badge.png';
  //       break; 
  //     case (elevationGained > 10000):
  //       return '../images/10-km-elevation-badge.png';
  //       break;
  //     case (elevationGained > 5000):
  //       return '../images/5-km-elevation-badge.png';
  //       break;
  //     default:
  //       return '../images/no-elevation-badge.png';
  //   }
  // }

  // getHikeCountAward = () => {
  //   switch (true)
  //   {
  //     case (hikesCompleted > 100):
  //       return '../images/100-hikes-badge.png';
  //       break; 
  //     case (hikesCompleted > 50):
  //       return '../images/50-hikes-badge.png';
  //       break;
  //     case (hikesCompleted > 25):
  //       return '../images/25-hikes-badge.png';
  //       break;
  //     default:
  //       return '../images/no-hikes-badge.png';
  //   }
  // }

  // getDistanceAward = (kmCompleted) => {
  //   switch (true)
  //   {
  //     case (kmCompleted > 100000):
  //       return '../images/100-kilometres-badge.png';
  //       break; 
  //     case (kmCompleted > 50000):
  //       return '../images/50-kilometres-badge.png';
  //       break;
  //     case (kmCompleted > 25000):
  //       return '../images/25-kilometres-badge.png';
  //       break;
  //     default:
  //       return '../images/no-kms-badge.png';
  //   }
  // }

  render() {
    const  { navigation } = this.props;

      return (
        <ImageBackground 
        source={ require('../images/background.jpg') }
        resizeMode='cover' 
        style={styles.backgroundImage}
        imageStyle={{opacity: 0.2}}
        >
          <View style={styles.masterContainer}> 
            <TouchableOpacity 
              style={styles.featuredHikeContainer} 
              onPress={() => navigation.navigate('HikeInfo', {item: this.state.featuredHike})}
            >
              <Text style={styles.featuredTextStyle}>Featured Hike</Text>
              <View style={styles.featuredCenter}> 
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={this.state.featuredHike.PhotoURL ? {uri: this.state.featuredHike.PhotoURL } : null}/>
                </View>
                <View style={styles.hikeDescription}>
                  <Text style={styles.hikeText}>{this.state.featuredHike.ShortDescription}</Text>
                </View>
              </View>
              
            </TouchableOpacity>     
            
              <View style={styles.board}>
                <Text style={styles.boardTextStyle}>Goals</Text>
                <View style={styles.badgeContainer}>
                  <View styles={styles.individualBadgeContainer}>
                    <Progress.Circle 
                      style={styles.progressStyle} 
                      progress={this.state.userProfile.DistanceProgress}
                      size={60}
                      color="#407F33"
                      thickness={7}
                      showsText={true}
                      animated={false}
                      textStyle={[{fontSize: 17}, {fontWeight: 'bold'}]}
                      borderWidth={2}
                    />
                    <Text style={[styles.goalLabel, styles.goalLabelColour]}>Of Distance Goal</Text>
                  </View>
                  <View styles={styles.individualBadgeContainer}>
                    <Progress.Circle 
                      style={styles.progressStyle} 
                      progress={this.state.userProfile.ElevationProgress} 
                      size={60}
                      color="#C98F39"
                      thickness={7}
                      showsText={true}
                      animated={false}
                      textStyle={[{fontSize: 17}, {fontWeight: 'bold'}]}
                      borderWidth={2}
                    />
                    <Text style={[styles.goalLabel, styles.elevationLabelColour]}>Of Elevation Goal</Text>
                  </View>
                  <View styles={styles.individualBadgeContainer}>
                    <Progress.Circle 
                      style={styles.progressStyle} 
                      progress={this.state.userProfile.HikeCountProgress} 
                      size={60}
                      color="#6F6035"
                      thickness={7}
                      showsText={true}
                      animated={false}
                      textStyle={[{fontSize: 17}, {fontWeight: 'bold'}]}
                      borderWidth={2}
                      justifyContent={'center'}
                      //alignItems={'center'}
                      //textAlign={'center'}
                    />
                    <Text style={[styles.goalLabel, styles.hikesLabelColour]}>Of Hike Count Goal</Text>
                  </View>
                </View>
              </View>
              <View style={styles.board}>
                <Text style={styles.boardTextStyle}>Awards Earned</Text>
                <View style={styles.badgeContainer}>
                  <Image 
                    style={styles.badgeStyle} 
                    source={this.state.userProfile.DistanceHiked > 100000 ? require('../images/100-kilometres-badge.png'): 
                    this.state.userProfile.DistanceHiked > 50000 ? require('../images/50-kilometres-badge.png'): 
                    this.state.userProfile.DistanceHiked > 25000 ? require('../images/25-kilometres-badge.png'): 
                    require('../images/0-distance-badge.png')}
                  />
                  <Image 
                    style={styles.badgeStyle} 
                    source={this.state.userProfile.ElevationClimbed > 20000 ? require('../images/20-km-elevation-badge.png'): 
                    this.state.userProfile.ElevationClimbed > 10000 ? require('../images/10-km-elevation-badge.png'): 
                    this.state.userProfile.ElevationClimbed > 5000 ? require('../images/5-km-elevation-badge.png'): 
                    require('../images/0-elevation-badge.png')}
                  />
                  <Image 
                    style={styles.badgeStyle} 
                    source={this.state.userProfile.HikesCompleted > 100 ? require('../images/100-hikes-badge.png'): 
                    this.state.userProfile.HikesCompleted > 50 ? require('../images/50-hikes-badge.png'): 
                    this.state.userProfile.HikesCompleted > 25 ? require('../images/25-hikes-badge.png'): 
                    require('../images/0-distance-badge.png')}
                  />

                </View>
              </View>
          </View>
        </ImageBackground>
      );
  }
};
   
export default HomeScreen;

const styles = StyleSheet.create({
    backgroundImage: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center', 
      backgroundColor: "#3C413E"   
    },
    masterContainer: {
      flex: 1,
    },
    header:{
        backgroundColor: "#679267",
        height:200,
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
    image: {
        width: "100%",
        height: "100%",
        // marginTop: 30,
        // marginBottom: 70,
    },
    imageContainer: {
      width: "100%",
      height: 150,
      margin: 0,
    },
    board: {
      flex: 1,
        // width: 330,
        // height: "15%",
        backgroundColor: '#C9C8B9',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
    },
    boardTextStyle: {
        color: '#C9C8B9',
        backgroundColor: '#453D5F',
        fontSize: 18,
        paddingVertical: "2%",
        fontWeight: 'bold',
        paddingLeft: "5%",
      },
    featuredTextStyle: {
      color: '#C9C8B9',
      backgroundColor: '#453D5F',
      fontSize: 22,
      textAlign: 'center',
      paddingVertical: "2%",
      fontWeight: 'bold',
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
    hikeDescription: {
      margin: 5,
    },
    hikeText: {
      fontSize: 16,
    },
    badgeStyle: {
      width: "30%",
      height: "90%",
      resizeMode: 'contain',
    },
    badgeContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    progressStyle: {
      marginLeft: 35,
    },
    individualBadgeContainer: {
      flex: 1,
      resizeMode: 'contain',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 10,
      textAlign: 'center',
    },
    goalLabel: {
      marginHorizontal: 5,
    },
    goalLabelColour: {
      color: "#407F33",
      fontWeight: 'bold',
    },
    elevationLabelColour: {
      color: "#C98F39",
      fontWeight: 'bold',
    },
    hikesLabelColour: {
      color: "#6F6035",
      fontWeight: 'bold',
    }
});