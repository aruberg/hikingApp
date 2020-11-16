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
import hikePhoto from '../images/hikePhoto.jpg';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import { NavigationActions } from 'react-navigation';

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
        StartLocation: [],
        Description: "",


    },

  }

  constructor(props){
    super(props);
    // var clientId = firebase.auth().currentUser.uid;
    // this.getUser(clientId);
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
                StartLocation: doc.data().StartLocation,
            },    
        });
    })

  }




// getUser = async(cId) => {
//   const userDocument = await firestore().collection('Profiles')
//       .doc(cId).get();
// }

  getElevationAward = (elevationGained) => {
    switch (true)
    {
      case (elevationGained > 20000):
        return '../images/100-hikes-badge.png.png';
        break; 
      case (elevationGained > 10000):
        return '../images/50-hikes-badge.png.png';
        break;
      case (elevationGained > 5000):
        return '../images/25-hikes-badge.png.png';
        break;
      default:
        return '';
    }
  }

  getHikeCountAward = () => {
    switch (true)
    {
      case (hikesCompleted > 100):
        return '../images/100-hikes-badge.png.png';
        break; 
      case (hikesCompleted > 50):
        return '../images/50-hikes-badge.png.png';
        break;
      case (hikesCompleted > 25):
        return '../images/25-hikes-badge.png.png';
        break;
      default:
        return '';
    }
  }

  getDistanceAward = (kmCompleted) => {
    switch (true)
    {
      case (kmCompleted > 100000):
        return '../images/100-hikes-badge.png.png';
        break; 
      case (kmCompleted > 50000):
        return '../images/50-hikes-badge.png.png';
        break;
      case (kmCompleted > 25000):
        return '../images/25-hikes-badge.png.png';
        break;
      default:
        return '';
    }
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
          <View style={styles.masterContainer}> 
            <TouchableOpacity 
              style={styles.featuredHikeContainer} 
              onPress={() => navigation.navigate('HikeInfo', {item: this.state.featuredHike})}
            >
              <Text style={styles.boardTextStyle}>Featured Hike</Text>
              <View style={styles.featuredCenter}> 
                <View style={styles.imageContainer}>
                  <Image style={styles.image} source={this.state.featuredHike.PhotoURL ? {uri: this.state.featuredHike.PhotoURL } : null}/>
                </View>
                <View style={styles.hikeDescription}>
                  <Text style={styles.hikeDescription}>{this.state.featuredHike.Description}</Text>
                </View>
     
              </View>
              
            </TouchableOpacity>     
            
              <View style={styles.board}>
                <Text style={styles.boardTextStyle}>Goals</Text>
              </View>
              <View style={styles.board}>
                <Text style={styles.boardTextStyle}>Awards</Text>
                <View style={styles.badgeContainer}>
                  <Image style={styles.badgeStyle} source={ require('../images/25-hikes-badge.png.png') }/>
                  <Image style={styles.badgeStyle} source={ require('../images/50-kilometres-badge.png') }/>
                  <Image style={styles.badgeStyle} source={ require('../images/100-hikes-badge.png.png') }/>
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
      buttonTextStyle: {
        color: '#C9C8B9',
        paddingVertical: 10,
        fontSize: 16,
      },
      image: {
        width: "100%",
        height: "100%",
        // marginTop: 30,
        // marginBottom: 70,
    },
    imageContainer: {
      width: "100%",
      height: "50%",
      margin: 0,
    },
    board: {
      flex: 1,
        // width: 330,
        // height: "15%",
        backgroundColor: '#679267',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        borderRadius: 20,

    },
    boardTextStyle: {
        color: '#C9C8B9',
        // paddingVertical: 10,
        fontSize: 20,
        textAlign: 'center',
      },

    featuredHikeContainer: {
      flex: 3,
      // width: "95%",
      // height: "50%",
      backgroundColor: '#679267',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20,
      marginTop: "2%",
      borderRadius: 20,
      
    },

    featuredCenter: {
      alignItems: "center",
      justifyContent: "center",
    },

    hikeDescription: {
      color: '#C9C8B9',
      fontSize: 16,
      marginTop: 5,
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
});