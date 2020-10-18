import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

export default class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>Nickname </Text>
              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Hikes Completed </Text>  
              </TouchableOpacity>              
              <TouchableOpacity style={styles.buttonContainer}>
                <Text>Goals</Text> 
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.bodyContent}>
        <View style={styles.board}>
            <Text style={styles.boardTextStyle}>Km hiked:  </Text>
            <Text style={styles.boardTextStyle}>Awards:  </Text>
            </View>
            </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#679267",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  body:{
    marginTop:40,
    
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
    
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
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
  board: {
    width: 370,
    height: 200,
    backgroundColor: '#679267',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 160,
    marginBottom: 20,
    borderRadius: 20,
    borderWidth: 3, 
    borderColor: '#3C413E',

},
boardTextStyle: {
    fontSize:25,
    marginTop: 30,
    color: "#D6D6C7",
    fontWeight: "600",
    alignSelf: 'center',
   
},
});
