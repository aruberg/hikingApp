/**
 * This Screen should display the information about each trail accordingly. 
 * It should pull from the database and populate sections accordingly. 
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
  ScrollView
} from 'react-native';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import logo from '../images/logo.png';

// export default class ProductView extends Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     modalVisible:false,
  //     userSelected:[],
  //     product: {
  //       name:"HIKE NAME ",
  //       description:"Description of hike",
  //       created:"",
  //       images:[
  //         "https://coresites-cdn-adm.imgix.net/mpora_new/wp-content/uploads/2017/06/GettyImages-528503230.jpg", 
  //         "https://adventuresoflilnicki.com/wp-content/uploads/2020/03/Mirador-Las-Torres-Torres-del-Paine-National-Park-Chile-2.jpg",
  //         "https://canadamosaic.tso.ca/wp-content/uploads/2016/08/Kamloops.png",
  //       ],
  //       generalInfo:[
  //         "Elevation",
  //         "Location",
  //         "Distance",
  //         "Rating", 

  //       ]
  //     }
  //   };
  // }

  function HikeInfoScreen({route, navigation}) {
    const {item} = route.params;
    console.log(item)

    // render() {
    //   var mainImage = (this.state.selectedImage) ? this.state.selectedImage: this.state.product.images[0]; 
      return (
        <View style={styles.container}>
             <Image source={logo} style={styles.image} />
          <ScrollView style={styles.content}>
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                {/* <Text style={styles.name}>{this.state.product.name}</Text> */}
                <Text style={styles.trailTitle}>{item.TrailName}</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.header}>
                  <View style={styles.mainImageContainer}>
                    <Image style={styles.mainImage} source={{uri:item.PhotoURL}}/>
                  </View>
                </View>
              </View>
            </View>
  
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Description</Text>
              </View>
              <View style={styles.cardContent}>
                <Text>{item.Description}</Text>
              </View>
            </View>
  
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>General Info</Text>
              </View>
              <View style={styles.cardContent}>
                {/* <Text style={styles.description}>{this.state.product.description}</Text> */}
                {/* <Text>Start Location: {String.valueOf(item.StartLocation)}</Text> */}
                <Text>Distance: {item.Distance}</Text>
                <Text>Duration: {item.Duration}</Text>
                <Text>Rating: {item.Rating}</Text>
                <Text>Region: {item.Region}</Text>
              </View>
              
            </View>
  
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <TouchableOpacity style={styles.shareButton} onPress={() => navigation.navigate('InHike', item)}>
                  <Text style={styles.shareButtonText}>Hike it!</Text>  
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      );
    };
  
    export default HikeInfoScreen;
  

  // __setImageSelected = (image) => {
  //   this.setState({selectedImage:image});
  // }

  // __renderImages = () => {
  //   return(
  //     <View style={styles.smallImagesContainer}>
  //       {this.state.product.images.map((prop, key) => {
  //         return (
  //           <TouchableOpacity key={key} onPress={() => {this.__setImageSelected(prop)}}>
  //             <Image style={styles.smallImage} source={{uri:prop}}/>
  //           </TouchableOpacity>
  //         );
  //       })}
  //     </View>
  //   )
  // }

  // __renderGeneralInfo = () => {
  //   return(
  //     <View style={styles.contentColors}>
  //       {this.state.product.generalInfo.map((prop, key) => {
      
  //           // elevation, distance, location, etc 
         
  //       })}
  //     </View>
  //   )
  // }

  

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#3C413E",
  },
  content:{
    marginLeft:10,
    marginRight:10,
    marginTop:20,
  },
  header:{
    flexDirection:'row',
  },
  mainImage:{
    // width:200,
    height:200,
    width: "100%",
  
  },

  mainImageContainer: {
    width: "100%",
    backgroundColor: "black",
    alignItems: 'center',
  },

  
  // smallImagesContainer:{
  //   flexDirection:'column',
  //   marginLeft:30
  // },
  // smallImage:{
  //   width:60,
  //   height:60,
  //   marginTop:5, 
  // },
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
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#C98F39",
  },
  shareButtonText:{
    color: "#3C413E",
    fontSize:20,
  },
  image: {
    resizeMode: "contain",
    marginTop: 10,
    marginHorizontal: 100
},
  trailTitle: {
    textAlign: 'center',
    color:"#453D5F",
    fontSize:24,
    fontWeight:'bold'
  },

  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"#BECEB4",
    marginHorizontal: 5,
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardTitle:{
    color:"#453D5F",
    fontSize:18,
    fontWeight:'bold'
  }
  
}); 