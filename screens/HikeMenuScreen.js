/**
 * This Screen should display a type of menu with all the trails available. 
 * It should pull from the database and populate sections accordingly. 
 * It may still need some work on the design and pictures.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList
} from 'react-native';

export default class HikeMenuScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        {id:1, color:"#679267", icon: "https://thumbs.dreamstime.com/z/hike-canada-hiking-man-canadian-mountains-popular-recreation-activity-north-america-there-lot-picturesque-150773459.jpg" , name: "Hike 1", tags:['Distance: ', 'Rating: ', 'Location: ', 'Elevation: ']},
        {id:2, color:"#C98F39", icon:"https://coresites-cdn-adm.imgix.net/mpora_new/wp-content/uploads/2017/06/GettyImages-528503230.jpg", name: "Hike 2", tags:['Distance: ', 'Rating: ', 'Location: ', 'Elevation: ']},
        {id:3, color:"#679267", icon:"https://adventuresoflilnicki.com/wp-content/uploads/2020/03/Mirador-Las-Torres-Torres-del-Paine-National-Park-Chile-2.jpg", name: "Hike 3", tags:['Distance: ', 'Rating: ', 'Location: ', 'Elevation: ']},
        {id:4, color:"#C98F39", icon:"https://canadamosaic.tso.ca/wp-content/uploads/2016/08/Kamloops.png", name: "Hike 4", tags:['Distance: ', 'Rating: ', 'Location: ', 'Elevation: ']},  
      ],
    };
  }

  cardClickEventListener = (item) => {
    Alert.alert(item.name);
  }

  tagClickEventListener = (tagName) => {
    Alert.alert(tagName);
  }

  renderTags = (item) =>{
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity key={key} style={styles.btnColor} onPress={() => {this.tagClickEventListener(tag)}}>
          <Text>{tag}</Text>
        </TouchableOpacity> 
      );
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>
          <View style={styles.inputContainer}>
            <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/search/androidL/100/000000'}}/>
            <TextInput style={styles.inputs}
              ref={'txtSearch'}
              placeholder="Search"
              underlineColorAndroid='transparent'
              onChangeText={(name_address) => this.setState({name_address})}/>
          </View>

        </View>

        <FlatList 
          style={styles.notificationList}
          data={this.state.data}
          keyExtractor= {(item) => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={[styles.card, {borderColor:item.color}]} onPress={() => {this.cardClickEventListener(item)}}>
                <View style={styles.cardContent}>
                  <Image style={[styles.image, styles.imageContent]} source={{uri: item.icon}}/>
                  <Text style={styles.name}>{item.name}</Text>
                </View>
                <View style={[styles.cardContent, styles.tagsContent]}>
                  {this.renderTags(item)}
                </View>
              </TouchableOpacity>
            )
          }}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C413E',
  },
  formContent:{
    flexDirection: 'row',
    marginTop:30,
  },
  inputContainer: {
    borderColor: '#C98F39',
    backgroundColor: '#FFFFFF',
    borderRadius:30,
    borderWidth: 3,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    margin:10,
  },
  icon:{
    width:30,
    height:30,
  },
  iconBtnSearch:{
    alignSelf:'center'
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  card: {
    height:null,
    paddingTop:10,
    paddingBottom:10,
    marginTop:5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth:40,
    marginBottom:20,
  },
  cardContent:{
    flexDirection:'row',
    marginLeft:10, 
  },
  imageContent:{
    marginTop:-40,
  },
  tagsContent:{
    marginTop:10,
    flexWrap:'wrap'
  },
  image:{
    width:60,
    height:60,
    borderRadius:30,
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    marginLeft:10,
    alignSelf: 'center'
  },
  btnColor: {
    padding:10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#BECEB4",
    marginTop:5,
  },

  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:"100%",
    borderRadius:30,
    backgroundColor: "#C98F39",
  },
});  