/**
 * This Screen should display the information about a particular users goals accordingly. 
 * It should pull from the database and populate sections. 
 * 
 * Improvements: 
 * Fix error lol Nov 23 
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
  TextInput,
  Image,
  ImageBackground
} from 'react-native';
import { StackRouter } from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import { back } from 'react-native/Libraries/Animated/src/Easing';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import Icon from 'react-native-vector-icons/FontAwesome5';


  class GoalScreen extends Component {

    state = {
        myGoals: {
          DistanceHiked:0,
          ElevationClimbed: 0,
          HikesCompleted: 0,
          DistanceGoal:0,
          ElevationGoal: 0,
          HikeCountGoal: 0,
          DaysToComplete: 0,
        }
    }

    constructor(props){
      super(props);
      this.getUser();
      var clientId = firebase.auth().currentUser.uid;
      this.getUser(clientId);
      this.ref = firebase.firestore().collection('Profiles').doc(clientId);
      this.subscriber = firestore().collection('Profiles')
      .doc(clientId).onSnapshot( doc => {
          this.setState({
              myGoals: {
                DistanceHiked: parseInt(doc.data().DistanceHiked),
                ElevationClimbed: parseInt(doc.data().ElevationClimbed),
                HikesCompleted: parseInt(doc.data().HikesCompleted),
                DistanceGoal: parseInt(doc.data().DistanceGoal),
                ElevationGoal: parseInt(doc.data().ElevationGoal),
                HikeCountGoal: parseInt(doc.data().HikeCountGoal),
                DaysToComplete: parseInt(doc.data().DaysToComplete),
              }
          });
      })
  }

  getUser = async() => {
    const userDocument = await firestore().collection('Profiles')
        .doc('ProfileTemplate').get();
    console.log(userDocument);
  }

  onPressAdd = () => {

    if(this.state === '') {
        alert('task name is blank');
        return;
    }
    let validToWrite = false;

    let myRegex = /[0-9]+/;
    
    if (myRegex.test(this.state.DistanceGoal) && myRegex.test(this.state.ElevationGoal) && myRegex.test(this.state.HikeCountGoal)  )
    {
      if (this.state.DistanceGoal <= 0)
        this.state.DistanceGoal = 1;
    
      if (this.state.ElevationGoal <= 0)
        this.state.ElevationGoal = 1;

      if (this.state.HikeCountGoal <= 0)
        this.state.HikeCountGoal = 1;

      let isMounted = true;
      this.ref.update({

        DistanceGoal: this.state.DistanceGoal,
        ElevationGoal: this.state.ElevationGoal,
        HikeCountGoal: this.state.HikeCountGoal,
        //DaysToComplete: this.state.DaysToComplete,
      });


    }

    else
      alert("Please enter a numeric value in all fields")

    return isMounted = false;

}


render() {
 
    return (
      <>
        <View style={styles.container}>
        <ImageBackground 
          source={ {uri: "https://www.srectrade.com/assets/img/public_site/homepage/stock-illustration-23256124-stock-market-chart.jpg" }}
          resizeMode='cover' 
          style={styles.backgroundImage}
          imageStyle={{opacity: 0.15}}
        >            
          <View style={styles.box}>
            <View style={styles.info}>
              <Text  style={styles.name}>Goals</Text>
              
              <View style={styles.row}>
                <View style={styles.iconContainer}>                   
                    {/* <Image style={styles.icon} source={{uri: "https://cdn2.iconfinder.com/data/icons/road-and-navigation/180/02-512.png"}} /> */}
                    <Icon name="route" size={40} color={'#324648'} />
                    <Text style={styles.goalName}>Distance</Text>
                    {/* <ProgressBar style={styles.progressBar}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={(parseInt(this.state.myGoals.DistanceGoal))/ 100}
                    /> */}
                    <Text style={styles.goalValue}>{(parseInt(this.state.myGoals.DistanceGoal)) /1000} km</Text>
                </View>
                <View style={styles.iconContainer}>
                <Icon name="chart-area" size={40} color={'#324648'} />
                    <Text style={styles.goalName}>Elevation</Text>
                    {/* <ProgressBar style={styles.progressBar}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={(parseInt(this.state.myGoals.ElevationGoal))/ 100}
                    /> */}
                      <Text style={styles.goalValue}>{(parseInt(this.state.myGoals.ElevationGoal))} m</Text>
                </View>
                
                {/* <View style={styles.iconContainer}>
                    <Image style={styles.icon} source={{uri: "https://image.flaticon.com/icons/png/512/55/55281.png"}} />
                    <Text>Days</Text>
                    <ProgressBar style={styles.progressBar}
                    styleAttr="Horizontal"
                    indeterminate={false}
                    progress={(parseInt(this.state.myGoals.DaysToComplete))/ 100}
                    />
                    <Text>{(parseInt(this.state.myGoals.DaysToComplete))} </Text>
                </View> */}
                <View style={styles.iconContainer}>
                    <Icon name="globe-americas" size={40} color={'#324648'} />
                    <Text style={styles.goalName}>My Hikes</Text>
                    <Text style={styles.goalValue}>{parseInt(this.state.myGoals.HikeCountGoal)}</Text>
                    
                </View>
                
                
              </View>
            </View>
          </View>
          <View style = {styles.box2}>
            <View style={styles.inputSection}>
              <View style = {{flexDirection: 'row'}, styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Distance: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "in kilometers "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    keyboardType = "numeric"
                    onChangeText={e => {
                        this.setState({
                          DistanceGoal: (parseInt(e) * 1000)
                         });
                      }
                 }/>
              </View> 

              <View style = {{flexDirection: 'row'},styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Elevation: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "in meters "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    keyboardType = "numeric"
                    onChangeText={e => {
                     this.setState({
                       ElevationGoal: (parseInt(e))
                     });
                     }
                 }/>
              </View> 

              <View style = {{flexDirection: 'row'},styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Number of Hikes: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "0 "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    keyboardType = "numeric"
                    onChangeText={e => {
                     this.setState({
                       HikeCountGoal: parseInt(e),
                     });
                     }
                 }/>
              </View> 
                 
                 <TouchableOpacity
                    style = {styles.buttonContainer, styles.submitButton}
                    onPress={this.onPressAdd}
                    >
                    <Text style = {styles.buttonTextStyle}> Save </Text>
                 </TouchableOpacity>        
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
    flex: 1,
    backgroundColor: '#BECEB4',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2,
    margin: '6%',
  },
  box2: {
    flex: 2,
    flexDirection: 'column',
    shadowColor: 'black',
    shadowOpacity: .2,
    marginHorizontal: '6%',
    width: "100%",
    marginTop:20,
    shadowOffset: {
      height:1,
      width:-2

    },
    elevation:2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  info: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize:25,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop:10,
    width: "100%",
  },
  iconContainer: {
    flex: 1,
    alignItems:'center',
    width: "33%",
  },
  goalName: {
    textDecorationLine: 'underline',
    fontSize: 20,
  },
  goalValue: {
    fontSize: 18,
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
inputContainer:{
  borderBottomColor: '#453D5F',
  backgroundColor: '#BECEB4',
  borderRadius:30,
  borderBottomWidth: 1,
  width:"90%",
  height: 65,
  marginBottom:20,
  flexDirection: 'row',
  alignItems:'center',

  shadowColor: "#808080",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
},
inputs:{
  height:45,
  marginLeft:16,
  borderBottomColor: '#FFFFFF',
  flex:1,
  fontSize: 20,
},
buttonContainer: {
  height:45,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom:20,
  width:"100%",
  borderRadius:30,
  backgroundColor:'transparent'
},
submitButton: {
    backgroundColor: '#C98F39',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#C98F39',
    height: 60,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    // marginLeft: 70,
    // marginRight: 10,
    marginTop: 20,
  },
  inputSection: {
    flex: 1, 
    flexDirection: 'column', 
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: '#C9C8B9',
    paddingVertical:10,
    fontSize: 25,
  },
   TextStyle: {
    color: '#453D5F',
    paddingVertical:10,
    fontSize: 20,
    margin: 20,
  },
}); 