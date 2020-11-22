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
            // waypoints: [
            //     {coordinates: [-120.329369, 50.666869]},
            //     {coordinates: [-120.329947, 50.659692]},
            // ],
          profile: 'walking',
          geometries: 'geojson',
        };

        const res = await directionsClient.getDirections(reqOptions).send();
        // console.log(res.body.routes[0].geometry.coordinates);
        // console.log(res);
        const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
        this.state.route = newRoute;
    };
        

    updateCoordinates(item) {
        let isMounted = true;
        var coordinatesArray = [];
        for (let i=0; i < item.Path.length; i++)
        {
           coordinatesArray.push([item.Path[i]['longitude'], item.Path[i]['latitude']]);
        }
        this.state = {geopointsArray: coordinatesArray}

        return isMounted = false;
    }

    // Renders a specific coordinate
    renderAnnotation() {
        // const id = 'pointAnnotation' + i;
        // const key = 'pointAnnotation' + i;
        return ( 
            // <MapboxGL.PointAnnotation 
            //     key={key}
            //     id={id} 
            //     coordinate={this.state.geopointsArray[i]}
            // > 
            //     <View style={styles.annotation}

            //     /> 
            // </MapboxGL.PointAnnotation> 

            this.state.geopointsArray.map((point, index) => (
                <MapboxGL.PointAnnotation
                    key={`${index}-PointAnnotation`}
                    id={`${index}-PointAnnotation`}
                    coordinate={point}
                > 
                    {/* <Text>
                        <Image 
                            source={require('../images/1.svg')}
                            style={{
                                flex: 1,
                                resizeMode: 'contain',
                                width: 25,
                                height: 25
                            }}  
                        />
                    </Text> */}

                    <View style={{
                        height: 30, 
                        width: 30, 
                        backgroundColor: '#00cccc', 
                        borderRadius: 50, 
                        borderColor: '#fff', 
                        borderWidth: 3
                        }} 
                    /> 
 
                

                </MapboxGL.PointAnnotation>
  ))
        ); 
    }

    // // Loop through each coordinate and render annotation
    // renderAnnotations() {
    //     const points = [];

    //     for (let i = 0; i < this.state.geopointsArray.length; i++) {
    //         points.push(this.renderAnnotation(i));
    //     }

    //     return points;
    // }

    render() {
        const  { navigation } = this.props;
    return (
        <>
        <View style={{height: "80%", width: "100%", backgroundColor:"#3C413E"}}>
            <View style={{ height: "100%", width: "100%", backgroundColor:"#3C413E"}}>
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
        <View style={styles.container}>    
            <TouchableOpacity
            style={styles.buttonContainerCircle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('QRScanner')}
            >
            <Text style={styles.buttonTextStyle}>QR Scan</Text>
            <Icon name="qrcode" size={75} color={'#C9C8B9'}/>
            
            </TouchableOpacity>
        </View>
        </>
        // <ShowMap />
        );
            
    }
};
export default InHikeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3C413E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonContainerCircle: {
        backgroundColor: '#453D5F',
        //borderWidth: 5,
        color: '#6F6035',
        //borderColor: 'black',
        height: "80%",
        width: "90%",
        alignItems: 'center',
        borderRadius: 50,
        paddingBottom: 10,

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
});