/**
 * This Screen should display the information about a particular users goals accordingly. 
 * It should pull from the database and populate sections. 
 * 
 * Potential improvements: 
 * Set a new goal Button 
 */
import React, { Component, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Button,
  Image,
  ImageBackground
} from 'react-native';
import { StackRouter } from 'react-navigation';
import hike1 from '../images/hike1.jpg';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import { back } from 'react-native/Libraries/Animated/src/Easing';
import {ProgressBar} from '@react-native-community/progress-bar-android';


  class GoalScreen extends Component {
    state = {
        myGoals: {
            DistanceHiked: 0,
            ElevationClimbed: 0,
            HikesCompleted: 0,
            Goals: [],
            Distance: 0,
            Elevation: 0,
            DaysToComplete: 0,
        }
    }

    constructor(props){
      super(props);
      this.getUser();
      this.subscriber = firestore().collection('Profiles')
      .doc('ProfileTemplate').onSnapshot( doc => {
          this.setState({
              myGoals: {
                  DistanceHiked: doc.data().DistanceHiked,
                  ElevationClimbed: doc.data().ElevationClimbed,
                  HikesCompleted: doc.data().HikesCompleted,
                  Goals: doc.data().Goals,
                  Distance: doc.data().Goals[0],
                  Elevation: doc.data().Goals[1],
                  NumHikes: doc.data().Goals[2],
                  DaysToComplete: doc.data().Goals[3],
              }
          });
      })
  }

  getUser = async() => {
    const userDocument = await firestore().collection('Profiles')
        .doc('ProfileTemplate').get();
    console.log(userDocument);
  }


render() {
 
    return (
      <>

        <View style={styles.container}>
        <ImageBackground 
            source={ {uri: "https://www.srectrade.com/assets/img/public_site/homepage/stock-illustration-23256124-stock-market-chart.jpg" }}
            resizeMode='cover' 
            style={styles.backgroundImage}
            imageStyle={{opacity: 0.15}}>            

              <View style={styles.box}>
                <View style={styles.info}>
                  <Text  style={styles.name}>Goal 1</Text>
                  
                  <View style={styles.row}>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={{uri: "https://cdn2.iconfinder.com/data/icons/road-and-navigation/180/02-512.png"}} />
                        <Text>Distance</Text>
                        <ProgressBar style={styles.progressBar}
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={(parseInt(this.state.myGoals.Distance))/ 100}
                        />
                        <Text>{(parseInt(this.state.myGoals.Distance))} Km</Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={{uri: "https://cdn0.iconfinder.com/data/icons/travel-37/94/mountain-512.png"}} />
                        <Text>Elevation</Text>
                        <ProgressBar style={styles.progressBar}
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={(parseInt(this.state.myGoals.Elevation))/ 100}
                        />
                         <Text>{(parseInt(this.state.myGoals.Elevation))} </Text>
                    </View>
                    
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={{uri: "https://image.flaticon.com/icons/png/512/55/55281.png"}} />
                        <Text>Days</Text>
                        <ProgressBar style={styles.progressBar}
                        styleAttr="Horizontal"
                        indeterminate={false}
                        progress={(parseInt(this.state.myGoals.DaysToComplete))/ 100}
                        />
                        <Text>{(parseInt(this.state.myGoals.DaysToComplete))} </Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <Image style={styles.icon} source={{uri: "https://static.thenounproject.com/png/204712-200.png"}} />
                        <Text>Hikes:</Text>
                        <Text>{parseInt(this.state.myGoals.NumHikes)}</Text>
                        
                    </View>
                    
                    
                  </View>
                </View>
              </View>
              </ImageBackground>
</View>


        

 
      </>

     )
  }
}
export default GoalScreen; 

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#3C413E',
    marginTop: 0,
  },
  list: {
    paddingHorizontal: 17,
    backgroundColor:"#3C413E",
  },
  separator: {
    marginTop: 30,
  },
  example: {
    marginVertical: 24,
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    marginHorizontal: 60, 
    paddingHorizontal: 16,
    backgroundColor:"#BECEB4"
  },
  cardHeader: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },

  /******** card components **************/
  title:{
    fontSize:18,
    flex:1,
  },
  /********* trial ****************/
  icon:{
    width:30,
    height:30,
  },
  image: {
    width: 100,
    height:100
  },
  box: {
    backgroundColor: '#BECEB4',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    marginHorizontal: 20, 
    height: 140,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  info: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize:20,
    marginTop:10,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop:10
  },
  iconContainer: {
    flex: 1,
    alignItems:'center'
  },
  iconFonts: {
    color: 'gray',
  },
  red: {
    color: '#FF4500',
  },
  backgroundImage: {
    width: "100%",
    flex: 1,
    backgroundColor: '#3C413E',
    justifyContent: 'center',
    alignItems: 'center',
},
}); 