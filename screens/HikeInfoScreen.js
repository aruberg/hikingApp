/*
* The HikeInfoScreen displays detailed information about the selected hike. It provides a description, 
* of the trail, general information and a QR hint. At the bottom of the screen is a button which takes the user
* to a dynamic map of the hike and QR scanner for the QR code.
*/
import React, { Component, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

  function HikeInfoScreen({route, navigation}) {
    const {item} = route.params;
    console.log(item)
   
    return (
      <ImageBackground 
        source={ require('../images/background.jpg') }
        resizeMode='cover' 
        style={styles.backgroundImage}
        imageStyle={{opacity: 0.2}}
      >
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.card}>
              <View style={styles.cardHeaderTitle}>
                <Text style={styles.trailTitle}>{item.TrailName}</Text>
              </View>
              <View style={styles.cardPhotoContainer}>
                  <View style={styles.mainImageContainer}>
                    <Image style={styles.mainImage} source={{uri:item.PhotoURL}}/>
                  </View>
              </View>
            </View>

            {/* Description Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Description</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardText}>{item.Description}</Text>
              </View>
            </View>

            {/* General Info Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>General Info</Text>
              </View>
              <View style={styles.cardContent}>
                {/* Distance */}
                <View style={styles.hikingStatsContainer}>
                  <Icon name="map-marker" size={20} color={'#6F6035'} />
                  <Text style={styles.metricTextTitle}>Distance</Text> 
                  <Text style={styles.metricText}>{item.Distance / 1000} km</Text>
                </View>
                {/* Duration */}
                <View style={styles.hikingStatsContainer}>
                  <Icon name="clock-o" size={20} color={'#6F6035'}/>
                  <Text style={styles.metricTextTitle}>Duration</Text>
                  <Text style={styles.metricText}>{Number(item.Duration/60).toPrecision(2)} hrs</Text>
                </View>
                {/* Elevation */}
                <View style={styles.hikingStatsContainer}>
                  <Icon name="line-chart" size={20} color={'#6F6035'}/>
                  <Text style={styles.metricTextTitle}>Elevation </Text>
                  <Text style={styles.metricText}>{item.Elevation} m</Text>
                </View>
                {/* Rating */}
                <View style={styles.hikingStatsContainer}>
                  <Icon name="check" size={20} color={'#6F6035'} />
                  <Text style={styles.metricTextTitle}>Rating</Text> 
                  <Text style={styles.metricText}>{item.Rating}</Text>
                </View>
                {/* Region */}
                <View style={styles.hikingStatsContainer}>
                  <Icon name="map-o" size={20} color={'#6F6035'} />
                  <Text style={styles.metricTextTitle}>Region</Text>
                  <Text style={styles.metricText}>{item.Region}</Text>
                </View>           
              </View>                
            </View>

            {/* QR Hint Card */}
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>QR Hint</Text>
              </View>
              <View style={styles.cardQR}>
                <Text style={styles.cardText}>{item.QRHint}</Text>
                <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('InHike', item)}>
                  <Text style={styles.shareButtonText}>Hike it!</Text>  
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  };

  export default HikeInfoScreen;
  
const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  mainImage:{
    flex: 1,
    height: 200,
    width:"100%",
    resizeMode: 'cover',
  },
  mainImageContainer: {
    width: "100%",
    backgroundColor: "black",
    alignItems: 'center',
  },
  contentColors:{
    flexDirection:'row', 
  },
  name:{
    fontSize:22,
    color:"#453D5F",
    fontWeight:'bold',
  },
  description:{
    fontSize:18,
    color:"#696969",
  },
  shareButton: {
    marginTop:"7%",
    marginBottom: "5%",
    height:45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:10,
    backgroundColor: "#6F6035",
    width: "100%",
  },
  shareButtonText:{
    color: "#C9C8B9",
    fontSize:20,
  },
  trailTitle: {
    textAlign: 'center',
    color:"#C9C8B9",
    fontSize:22,
    fontWeight:'bold'
  },
  backgroundImage: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: "#3C413E"   
},
hikingStatsContainer:{
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
},
metricText: {
  fontWeight: '700',
  color: '#3C413E',
},
metricTextTitle: {
  textDecorationLine: 'underline',
},

  /******** card **************/
  card:{
    marginVertical: "1.5%",
    backgroundColor:"#C9C8B9",
    marginHorizontal: "1.5%",
  },
  cardContent: {
    flex: 1,
    paddingVertical: "3%",
    paddingHorizontal: "3%",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingHorizontal: 16,
    backgroundColor: '#453D5F',
  },
  cardHeaderTitle:{
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: "2%",
    paddingBottom: "2%",
    paddingHorizontal: 16,
    backgroundColor: '#453D5F',
  },
  cardTitle:{
    color:"#C9C8B9",
    fontSize:18,
    fontWeight:'bold'
  },
  cardText:{
    color: 'black',
  },
  cardQR:{
    flex: 1,
    paddingVertical: "3%",
    paddingHorizontal: "3%",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPhotoContainer:{
    flex: 1,
  } 
}); 