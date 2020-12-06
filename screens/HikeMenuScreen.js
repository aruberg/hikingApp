/*
* The HikeMenuScreen displays a selection of trails from the database that the user can choose to hike.
* It display important information about each hike such as the distance, time, elevation and difficulty
* rating. Users can search for a specific hike using the search bar at the top of the screen.
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
      // Filter trails and update FilteredDataSource
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
      // Update FilteredDataSource with trails
      setFilteredDataSource(trails);
      setSearch(searchText);
    }
  };

  useEffect(() => {
    const trailsCollection = firestore()
      .collection('Trails')
      .onSnapshot(querySnapshot => {
        const trails = [];
        // query each document in the trails collection
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
      {/* Search bar */}
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
      {/* Flatlist */}
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