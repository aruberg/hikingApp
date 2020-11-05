/**
 * This Screen should display a type of menu with all the trails available. 
 * It should pull from the database and populate sections accordingly. 
 * It may still need some work on the design and pictures.
 */
import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  TextInput,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage, {firebase} from '@react-native-firebase/storage';
import { back } from 'react-native/Libraries/Animated/src/Easing';

// export default class HikeMenuScreen extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [
//         {id:1, color:"#679267", icon: "https://thumbs.dreamstime.com/z/hike-canada-hiking-man-canadian-mountains-popular-recreation-activity-north-america-there-lot-picturesque-150773459.jpg" , name: "Hike 1", tags:['Distance: ', 'Rating: ', 'Location: ', 'Elevation: ']},
//         {id:2, color:"#C98F39", icon:"https://coresites-cdn-adm.imgix.net/mpora_new/wp-content/uploads/2017/06/GettyImages-528503230.jpg", name: "Hike 2", tags:['Distance: ', 'Rating: ', 'Location: ', 'Elevation: ']},
//         {id:3, color:"#679267", icon:"https://adventuresoflilnicki.com/wp-content/uploads/2020/03/Mirador-Las-Torres-Torres-del-Paine-National-Park-Chile-2.jpg", name: "Hike 3", tags:['Distance: ', 'Rating: ', 'Location: ', 'Elevation: ']},
//         {id:4, color:"#C98F39", icon:"https://canadamosaic.tso.ca/wp-content/uploads/2016/08/Kamloops.png", name: "Hike 4", tags:['Distance: ', 'Rating: ', 'Location: ', 'Elevation: ']},  
//       ],
//     };
//   }

const defaultStoragebucket = storage();


function HikeMenuScreen({navigation}) {
  const [loading, setLoading] = useState(true); // Set Loading to true on component mount
  const [trails, setTrails] = useState([]); // Initial empty array of trails
  const [data, setData] = useState([]);

  useEffect(() => {
    const trailsCollection = firestore()
      .collection('Trails')
      .onSnapshot(querySnapshot => {
        const trails = [];

        querySnapshot.forEach(documentSnapshot => {
          trails.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setTrails(trails);
        setLoading(false);
      });

    
    // return () => trails();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ImageBackground 
    source={ require('../images/background.jpg') }
    resizeMode='cover' 
    style={styles.backgroundImage}
    imageStyle={{opacity: 0.2}}
    >
      <FlatList
      style={styles.notificationList}
        data={trails}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={[styles.card, {borderColor:item.color}]} onPress={() => navigation.navigate('HikeInfo', {item})}>
              <View style={styles.cardHeader}>
                <Text style={[styles.name, styles.cardContent]}>{item.TrailName}</Text>
              </View>     
              <View style={styles.cardContent}>
                <View style={styles.leftCardContent}>
                  <Image style={[styles.image, styles.imageContent]} source={{uri: item.PhotoURL}}/>
                </View>
                <View style={[styles.rightCardContent, styles.tagsContent]}>
                  <Text style={styles.btnColor}>Distance: {item.Distance/1000}km</Text>
                  <Text style={styles.btnColor}>Time: {Number(item.Duration/60).toPrecision(2)} hr</Text>
                  <Text style={styles.btnColor}>Elevation: {item.Elevation}m</Text>
                  <Text style={styles.btnColor}>{item.Rating}</Text>

                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </ImageBackground>
  );
};

export default HikeMenuScreen;

function loadHikeDetail() {

}

  //   <View style={styles.container}>
  //   <View style={styles.formContent}>
  //     <View style={styles.inputContainer}>
  //       <Image style={[styles.icon, styles.inputIcon]} source={{uri: 'https://png.icons8.com/search/androidL/100/000000'}}/>
  //       <TextInput style={styles.inputs}
  //         useRef={'txtSearch'}
  //         placeholder="Search"
  //         underlineColorAndroid='transparent'
  //         onChangeText={(name_address) => this.setState({name_address})}/>
  //     </View>

  //   </View>

  //   <FlatList 
  //     style={styles.notificationList}
  //     data={trails}
  //     keyExtractor= {(item) => {
  //       return item.id;
  //     }}
  //     renderItem={({item}) => {
  //       return (
  //         <TouchableOpacity style={[styles.card, {borderColor:item.color}]} onPress={() => {this.cardClickEventListener(item)}}>
  //           <View style={styles.cardContent}>
  //             <Image style={[styles.image, styles.imageContent]} source={{uri: item.icon}}/>
  //             <Text style={styles.name}>{item.name}</Text>
  //           </View>
  //           <View style={[styles.cardContent, styles.tagsContent]}>
  //             {/* {this.renderTags(item)} */}
  //           </View>
  //         </TouchableOpacity>
  //       )
  //     }}/>
  // </View>

// cardClickEventListener = (item) => {
//   Alert.alert(item.TrailName);
// }

// tagClickEventListener = (tagName) => {
//   Alert.alert(tagName);
// }

// renderTags = (item) =>{
//   return item.tags.map((tag, key) => {
//     return (
//       <TouchableOpacity key={key} style={styles.btnColor} onPress={() => {this.tagClickEventListener(tag)}}>
//         <Text>{tag}</Text>
//       </TouchableOpacity> 
//     );
//   })
// }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3C413E',
  },
  backgroundImage: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: "#3C413E"   
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
    justifyContent: 'center',
  },
  notificationList:{
    marginTop:20,
    padding:10,
  },
  card: {
    height: 250,
    marginTop: 30,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginBottom: 20,
  },
  cardHeader: {
    alignSelf: 'center',
    width: "100%",
    height: "22%",
    backgroundColor: '#C98F39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent:{
    flexDirection:'row',
  },
  leftCardContent: {
    width: "60%",
    height: 195,
    backgroundColor: "black",
  },
  rightCardContent: {
    backgroundColor: 'black',
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    backgroundColor: '#C98F39',
    textAlign: 'center',
    flexWrap: "wrap",
  },
  // imageContent:{
  //   marginTop:0,
  //   alignItems: 'center',
  // },
  // tagsContent:{
  //   marginTop:10,
  //   flexWrap:'wrap',
  //   backgroundColor: 'black',
  // },
  image:{
    width: "100%",
    height: "100%",
    overflow: 'hidden',
  },

  btnColor: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius:40,
    marginHorizontal:3,
    backgroundColor: "#BECEB4",
    marginTop:6,
    width: "95%",
    textAlign: 'center',
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