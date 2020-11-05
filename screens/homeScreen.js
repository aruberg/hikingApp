/**
 * This is the home screen. 
 * When clicking on Do a hike it should redirect user to hikeMenu.
 * When clicking on my profile it should redirect user to ProfileScreen 
 * In the Goals board a summary of all the users goals should be displayed in addition 
 * to how much they have completed so far. 
 * In the Awards board a summary of all the awards earned so far should be displayed. 
 */
import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { block } from 'react-native-reanimated';
import hikePhoto from '../images/hikePhoto.jpg';

function HomeScreen({navigation}) {
    global.currentScreenIndex = 'HomeScreen';
    return (
      <ImageBackground 
      source={ require('../images/background.jpg') }
      resizeMode='cover' 
      style={styles.backgroundImage}
      imageStyle={{opacity: 0.2}}
      >
        <View> 
          <View style={styles.featuredHike}>
            <Text style={styles.boardTextStyle}>Featured Hike</Text>
            <View style={styles.featuredCenter}>
              <Image source={hikePhoto} style={styles.featuredImage} />
            </View>
            
          </View>     
          
            <View style={styles.board}>
              <Text style={styles.boardTextStyle}>Goals</Text>
            </View>
            <View style={styles.board}>
              <Text style={styles.boardTextStyle}>Awards</Text>
            </View>
        </View>
      </ImageBackground>
    );
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
        resizeMode: "contain",
        marginTop: 30,
        marginBottom: 70,

    },
    board: {
        width: 330,
        height: 100,
        backgroundColor: '#679267',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        borderRadius: 20,


    },
    boardTextStyle: {
        color: '#C9C8B9',
        paddingVertical: 10,
        paddingLeft: 20,
        fontSize: 16,
      },

    featuredHike: {
      width: 330,
      height: 170,
      backgroundColor: '#679267',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 20,
      borderRadius: 20,
    },

    featuredImage: {
      width: 300,
      height: 110,
    },

    featuredCenter: {
      alignItems: "center",
      justifyContent: "center",
    },
});