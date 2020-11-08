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
import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity,Alert } from 'react-native';
import logo from '../images/logo.png';
import mapGeneric from '../images/mapGeneric.jpg';
//import ShowMap from '../components/ShowMap';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken('pk.eyJ1Ijoia2FtbG9vcHNoaWtpbmdhcHAiLCJhIjoiY2tnOXB6eHZrMDNiazJ4cGJsemRzbDIzayJ9.KxdkKCtiVF9F9MDptsdRZg',);

class InHikeScreen extends Component {

    state = {
        coordinates: []
    };

    constructor(props){
        super(props);
        var item = props.route.params;
        this.updateCoordinates(item);
        //console.log(item);

    }

    updateCoordinates(item) {
        let isMounted = true;
        var coordinatesArray = [];
        for (let i=0; i < item.Path.length; i++)
        {
           coordinatesArray.push([item.Path[i]['longitude'], item.Path[i]['latitude']]);
        }
        this.state = {coordinates: coordinatesArray}
      

         console.log(this.state.coordinates);

        return isMounted = false;
    }

    renderAnnotation(i) {
        const id = 'pointAnnotation' + i;
        const key = 'pointAnnotation' + i;
        return ( 
            <MapboxGL.PointAnnotation 
                key={key}
                id={id} 
                coordinate={this.state.coordinates[i]}
            > 
                <View style={styles.annotation}

                /> 
            </MapboxGL.PointAnnotation> 
        ); 
    }

    renderAnnotations() {
        const points = [];

        for (let i = 0; i < this.state.coordinates.length; i++) {
            points.push(this.renderAnnotation(i));
        }

        return points;
    }

    render() {
        const  { navigation } = this.props;
    return (
        <>
        <View style={{height: "65%", width: "100%", backgroundColor:"#3C413E"}}>
            <View style={{ height: "100%", width: "100%", backgroundColor:"#3C413E"}}>
                <MapboxGL.MapView
                    styleURL={MapboxGL.StyleURL.Street}
                    zoomLevel={14}
                    centerCoordinate={this.state.coordinates[0]}
                    style={{flex: 1}}>
                    <MapboxGL.Camera
                        zoomLevel={14}
                        centerCoordinate={this.state.coordinates[0]}
                        animationMode={'flyTo'}
                        animationDuration={0}
                    >
                    </MapboxGL.Camera>
                    {this.renderAnnotations()}
                </MapboxGL.MapView>
            </View>
        </View>
        <View style={styles.container}>    
            <TouchableOpacity
            style={styles.buttonContainerCircle}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('QRScanner')}
            >
            <Text style={styles.buttonTextStyle}>QR Scan!</Text>
            </TouchableOpacity>
        </View>
        </>
        
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
        backgroundColor: '#C98F39',
        borderWidth: 5,
        color: '#6F6035',
        borderColor: 'black',
        height: 200,
        width: 200,
        alignItems: 'center',
        borderRadius: 100,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        paddingBottom: 10,

      },
      buttonTextStyle: {
        color: '#C9C8B9',
        paddingVertical: 75,
        fontSize: 30,
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