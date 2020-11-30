/**
 * This is the Screen users will see when they are perfoming a hike. 
 * The map should be the trail chosen and it should indicate where the QR code is 
 * The button when clicked it should open the camera to be able to scan the QR code. 
 * 
 * Improvements: 
 * Add a exit hike button 
 * Set 24h timer HERE after QR has been scan
 */
import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity,Alert, Svg } from 'react-native';
import ShowMap from '../components/ShowMap';
import MapboxGL from "@react-native-mapbox-gl/maps";
import Icon from 'react-native-vector-icons/FontAwesome';
import {lineString as makeLineString} from '@turf/helpers';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

//MapboxGL.setAccessToken('pk.eyJ1Ijoia2FtbG9vcHNoaWtpbmdhcHAiLCJhIjoiY2tnOXB6eHZrMDNiazJ4cGJsemRzbDIzayJ9.KxdkKCtiVF9F9MDptsdRZg',);
// const accessToken = 'pk.eyJ1Ijoia2FtbG9vcHNoaWtpbmdhcHAiLCJhIjoiY2tnOXB6eHZrMDNiazJ4cGJsemRzbDIzayJ9.KxdkKCtiVF9F9MDptsdRZg';


const accessToken = 'pk.eyJ1Ijoia2FtbG9vcHNoaWtpbmdhcHAiLCJhIjoiY2tnOXB6eHZrMDNiazJ4cGJsemRzbDIzayJ9.KxdkKCtiVF9F9MDptsdRZg';
MapboxGL.setAccessToken(accessToken);
const directionsClient = MapboxDirectionsFactory({accessToken});

class InHikeScreen extends Component {

    state = {
        geopointsArray: [],
        route: [],
        qrHint: "",
    }

    constructor(props){
        super(props);
        var item = props.route.params;
        this.updateCoordinates(item);
        this.fetchRoute();
    }

    fetchRoute = async () => {
        var coordinateObjects = [];
        for (let i=0; i<this.state.geopointsArray.length; i++)
        {
            coordinateObjects.push({coordinates: this.state.geopointsArray[i]});
            
        }

        const reqOptions = {
          waypoints: coordinateObjects,
          profile: 'walking',
          geometries: 'geojson',
        };

        //const res = await directionsClient.getDirections(reqOptions).send();
        //const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
        //this.state.route = newRoute;
    };
        

    updateCoordinates(item) {
        let isMounted = true;
        var coordinatesArray = [];
        for (let i=0; i < item.Path.length; i++)
        {
           coordinatesArray.push([item.Path[i]['longitude'], item.Path[i]['latitude']]);
        }
        this.state = {geopointsArray: coordinatesArray, qrHint: item.QRHint}
        
        return isMounted = false;
    }

    renderLegend() {
        var colours = ['rgb(47, 228, 209)', 'rgb(47, 155, 228)', 'rgb(47, 65, 228)', 'rgb(119, 47, 228)', 'rgb(209, 47, 228)', 'rgb(228, 47, 155)', 'rgb(228, 47, 65)', 'rgb(228, 119, 47)', 'rgb(228, 209, 47)', 'rgb(155, 228, 47)', 'rgb(65, 228, 47)', 'rgb(47, 228, 119)'];
        var indexNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
        var qrIndex = Math.floor(this.state.geopointsArray.length / 2);
        colours[qrIndex] = 'white';
        indexNumbers[qrIndex] = "QR";
        
        return (
            this.state.geopointsArray.map((point, index) => (

               
                <View style={{
                    height: 30, 
                    width: 30, 
                    backgroundColor: colours[index], 
                    borderColor: '#3C413E', 
                    borderWidth: 3,
                    flex: 1,
                    }} 
                    key={`${index}-legend`}
                    id={`${index}-ledend`}
                
                > 
                    <Text style={styles.colorIndexNumbers}>{indexNumbers[index]}</Text>
                </View>
                )
            )
        )
    }

    // Renders coordinates
    renderAnnotation() {
        //var colours = ['rgba(201, 143, 57, 0.6)', 'rgba(201, 143, 57, 0.7)', 'rgba(201, 143, 57, 0.8)', 'rgba(201, 143, 57, 0.9)', 'rgb(201, 143, 57)', 'rgb(218, 142, 36)', 'rgb(174, 114, 29)', 'rgb(130, 85, 22)', 'rgb(87, 57, 14)', 'rgb(43, 28, 7)'];
        //var colours = ['rgb(189, 124, 59)', 'rgb(189, 189, 59)', 'rgb(124, 189, 59)', 'rgb(59, 189, 59)', 'rgb(59, 189, 124)', 'rgb(59, 189, 189)', 'rgb(59, 124, 189)', 'rgb(59, 59, 189)', 'rgb(124, 59, 189)', 'rgb(189, 59, 189)', 'rgb(189, 59, 124)'];
        var colours = ['rgb(47, 228, 209)', 'rgb(47, 155, 228)', 'rgb(47, 65, 228)', 'rgb(119, 47, 228)', 'rgb(209, 47, 228)', 'rgb(228, 47, 155)', 'rgb(228, 47, 65)', 'rgb(228, 119, 47)', 'rgb(228, 209, 47)', 'rgb(155, 228, 47)', 'rgb(65, 228, 47)', 'rgb(47, 228, 119)'];
        var indexNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];
        var qrIndex = Math.floor(this.state.geopointsArray.length / 2);
        colours[qrIndex] = 'white';
        indexNumbers[qrIndex] = "QR";

        return (           
            this.state.geopointsArray.map((point, index) => (
               
                <MapboxGL.PointAnnotation
                    key={`${index}-PointAnnotation`}
                    id={`${index}-PointAnnotation`}
                    coordinate={point}
                > 
                    <View style={{
                        height: 30, 
                        width: 30, 
                        backgroundColor: colours[index], 
                        borderRadius: 50, 
                        borderColor: '#3C413E', 
                        borderWidth: 3
                        }} 
                    > 
                        <Text style={styles.colorIndexNumbers}>{indexNumbers[index]}</Text>
                    </View>
                    
 
                </MapboxGL.PointAnnotation>
  ))
        ); 
    }

    render() {
        const  { navigation } = this.props;
    return (
        <>
        <View style={{height: "80%", width: "100%", backgroundColor:"#3C413E"}}>
            <View style={{ height: "100%", width: "100%", backgroundColor:"#3C413E"}}>
                <View style={styles.rowExpansion}>
                    {this.renderLegend()}
                </View>
                <MapboxGL.MapView
                    styleURL={MapboxGL.StyleURL.Street}
                    zoomLevel={14}
                    centerCoordinate={this.state.geopointsArray[0]}
                    style={{flex: 1}}>
                    <MapboxGL.Camera
                        zoomLevel={14}
                        centerCoordinate={this.state.geopointsArray[0]}
                        animationMode={'flyTo'}
                        animationDuration={0}
                    >
                    </MapboxGL.Camera>
                    {this.renderAnnotation()}
                    {
                        this.state.route && (
                            <MapboxGL.ShapeSource id='shapeSource' shape={this.state.route.geometry}>
                                <MapboxGL.LineLayer id='lineLayer' style={{lineWidth: 5, lineJoin: 'bevel', lineColor: '#ff0000'}} />
                            </MapboxGL.ShapeSource>
                        )
                    }
                </MapboxGL.MapView>
            </View>
        </View>
         {/* QR Hint Card */}
         <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>QR Hint</Text>
                </View>
                <View style={styles.cardQR}>
                    <Text style={styles.cardText}>{this.state.qrHint}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>    
                <TouchableOpacity
                    style={styles.buttonContainerCircle}
                    activeOpacity={0.5}
                    onPress={() => navigation.navigate('QRScanner')}
                >
                    <Text style={styles.buttonTextStyle}>QR Scan</Text>
                    <Icon name="qrcode" size={75} color={'#C9C8B9'}/>
                </TouchableOpacity>
            </View>
        </View>
        </>

        );
            
    }
};
export default InHikeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#3C413E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainerCircle: {
        backgroundColor: '#453D5F',
        color: '#6F6035',
        // height: "100%",
        // width: "100%",
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: "10%"
      },
      buttonTextStyle: {
        color: '#C9C8B9',
        //paddingVertical: 30,
        fontSize: 20,
      },
      image: {
        resizeMode: "contain",
        width: 200,
        height: 250,
        marginTop: -70,
        marginBottom: 0,

    },
    mapImage: {
        resizeMode: "contain",
        width: 300,
        height: 300,
        marginTop: -60,
        marginBottom: 0,
        borderWidth: 5,
        borderColor: '#C9C8B9',

    },
    board: {
        width: 250,
        height: 100,
        backgroundColor: '#86608e',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 20,
    },
    boardTextStyle: {
        color: '#C9C8B9',
        paddingVertical: 10,
        paddingLeft: 20,
        fontSize: 16,
      },
    mapContainer: {
    },
    annotation: {
        height: 30, 
        width: 30, 
        backgroundColor: '#00cccc', 
        borderRadius: 50, 
        borderColor: '#fff', 
        borderWidth: 3, 
    },
    rowExpansion: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    colorIndexNumbers: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16, 
    },
    buttonContainer: {
        flex: 1,
    },
      /******** card **************/
  card:{
    backgroundColor:"#C9C8B9",
    flex: 2,
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
  },
});