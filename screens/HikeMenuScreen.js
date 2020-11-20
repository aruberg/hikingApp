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
// function searchFilterFunction(text, trails) {    
//   const newTrails = trails.filter(item => {      
//     const itemData = `${item.TrailName}`;
    
//      const textData = text.toUpperCase();
      
//      return itemData.indexOf(textData) > -1;    
//   });
  
//   setFilterTrails(newTrails);  
// };

const defaultStoragebucket = storage();

function HikeMenuScreen({navigation}) {
  const [loading, setLoading] = useState(true); // Set Loading to true on component mount
  const [trails, setTrails] = useState([]); // Initial empty array of trails
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState('');

  // Referenced https://aboutreact.com/react-native-search-bar-filter-on-listview/

  // Search bar functionality
  const searchFilterFunction = (searchText) => {
    // Check if searched text is not blank
    if (searchText) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = trails.filter(
        function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.TrailName
              ? item.TrailName.toUpperCase()
              : ''.toUpperCase();
          const textData = searchText.toUpperCase();
          return itemData.indexOf(textData) > -1;
        }
      );
      setFilteredDataSource(newData);
      setSearch(searchText);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(trails);
      setSearch(searchText);
    }
  };

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

        setFilteredDataSource(trails);
        setTrails(trails);
        setLoading(false);
      });

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
      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
            useRef={'txtSearch'}
            placeholder="Find a trail"
            value={search}
            underlineColorAndroid='transparent'
            onChangeText={(text) => searchFilterFunction(text)}
          />
        </View>
      </View>
      <FlatList
        style={styles.notificationList}
        data={filteredDataSource}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('HikeInfo', {item})}>
              <View style={styles.cardHeader}>
                <Text style={[styles.name, styles.cardContent]}>{item.TrailName}</Text>
              </View>     
              <View style={styles.cardContent}>
                <View style={styles.leftCardContent}>
                  <Image style={styles.image} source={{uri: item.PhotoURL}}/>
                </View>
                <View style={styles.rightCardContent}>
                  <Text style={styles.btnColor}>Distance: {item.Distance/1000} km</Text>
                  <Text style={styles.btnColor}>Time: {Number(item.Duration/60).toPrecision(2)} hrs</Text>
                  <Text style={styles.btnColor}>Elevation: {item.Elevation} m</Text>
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

const styles = StyleSheet.create({
  backgroundImage: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: "#3C413E"   
  },
  formContent:{
    flexDirection: 'row',
  },
  inputContainer: {
    borderColor: '#C9C8B9',
    backgroundColor: '#C9C8B9',
    borderRadius:15,
    borderWidth: 3,
    height:45,
    flexDirection: 'row',
    alignItems:'center',
    flex:1,
    marginLeft:10,
    marginRight: 10,
    marginTop: 20,
  },
  inputs:{
    height:45,
    marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex:1,
  },
  icon:{
    width:30,
    height:30,
  },
  notificationList:{
    paddingLeft:10,
    paddingRight: 10,
  },
  card: {
    height: 250,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    marginBottom: 10,
  },
  cardHeader: {
    alignSelf: 'center',
    width: "100%",
    height: "22%",
    backgroundColor: '#453D5F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent:{
    flexDirection:'row',
  },
  leftCardContent: {
    width: "60%",
    height: 195,
  },
  rightCardContent: {
    backgroundColor: '#C9C8B9',
    width: "40%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  name:{
    fontSize:20,
    fontWeight: 'bold',
    backgroundColor: '#453D5F',
    textAlign: 'center',
    flexWrap: "wrap",
    color: "#C9C8B9",
  },
  image:{
    width: "100%",
    height: "100%",
    overflow: 'hidden',
  },

  btnColor: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius:40,
    backgroundColor: "#6F6035",
    marginTop:6,
    width: "95%",
    textAlign: 'center',
    color: '#C9C8B9',
  },
});  