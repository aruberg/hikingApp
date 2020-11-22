
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
  TextInput,
  ImageBackground
} from 'react-native';
import { StackRouter } from 'react-navigation';
import hike1 from '../images/hike1.jpg';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import { back } from 'react-native/Libraries/Animated/src/Easing';
import {ProgressBar} from '@react-native-community/progress-bar-android';

export default class setANewGoal extends Component {
    constructor(props) {
        super(props);   
        this.state = ({
            Goals: [],
            newTaskName: '',
            loading: false,           
        });     
        this.ref = firebase.firestore().collection('Profiles');
    }
    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot((querySnapshot) => {
            const Goals = [];
            querySnapshot.forEach((doc) => {
                Goals.push({
                    Goals: doc.data().Goals,
                    Distance: doc.data().Goals[0],
                    Elevation: doc.data().Goals[1],
                    NumHikes: doc.data().Goals[2],
                    DaysToComplete: doc.data().Goals[3],
                });
            });
            this.setState({
                Goals: Goals.sort((a, b) => {
                    return (a.Goals < b.Goals);
                }),
                loading: false,
            });
        });
    }
    onPressAdd = () => {
        if(this.state === '') {
            alert('task name is blank');
            return;
        }
        this.ref.add({
            Goals: this.state.Goals,
            Distance: this.state.Goals[0],
            Elevation: this.state.Goals[1],
            NumHikes: this.state.Goals[2],
            DaysToComplete: this.state.Goals[3],

        }).then((data) => {
            console.log(`added data = ${data}`);
            this.setState({
                Goals: '',
                Distance:'',
                Elevation:'',
                NumHikes:'',
                DaysToComplete:'',
                loading: true
            });
        }).catch((error) => {
            console.log(`error adding Firestore document = ${error}`);
            this.setState({
                Goals: '',
                Distance:'',
                Elevation:'',
                NumHikes:'',
                DaysToComplete:'',
                loading: true
            });
        });
    }
    render() {
        return (
                  <View style = {styles.container}>
                     <ImageBackground 
                        source={ {uri: "https://www.srectrade.com/assets/img/public_site/homepage/stock-illustration-23256124-stock-market-chart.jpg" }}
                        resizeMode='cover' 
                        style={styles.backgroundImage}
                        imageStyle={{opacity: 0.15}}>      
                     

                 <View style = {{flexDirection: 'row'}, styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Distance: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "in Km "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    onChangeText={e => {
                     this.setState({
                       Distance: e,
                     });
                     }
                 }/>
                    </View> 

                    <View style = {{flexDirection: 'row'},styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Elevation: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "0.0 "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    onChangeText={e => {
                     this.setState({
                       Elevation: e,
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
                    onChangeText={e => {
                     this.setState({
                       NumHikes: e,
                     });
                     }
                 }/>
                    </View> 

                 <View style = {{flexDirection: 'row'},styles.inputContainer}>
                 <Text style = {styles.TextStyle} >Days to complete: </Text>
                 <TextInput style = {styles.inputs}
                    underlineColorAndroid = "transparent"
                    placeholder = "0 "
                    placeholderTextColor = "#453D5F"
                    autoCapitalize = "none"
                    onChangeText={e => {
                     this.setState({
                       DaysToComplete: e,
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
                 
                
               </ImageBackground>
              </View>
           )
        }
     }

const styles = StyleSheet.create({
    container: {
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
    width:300,
    height:45,
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
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:300,
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
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,

      },
      buttonTextStyle: {
        color: '#C9C8B9',
        paddingVertical:10,
        fontSize: 25,

      },
       TextStyle: {
        color: '#453D5F',
        paddingVertical:10,
        fontSize: 16,
        margin: 20,
      },
      backgroundImage: {
         width: "100%",
         flex: 1,
         backgroundColor: '#3C413E',
         justifyContent: 'center',
         alignItems: 'center',
     },

     })