import React, {Component, useState, useEffect} from 'react';
import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity,Alert } from 'react-native';
import logo from '../images/logo.png';
import mapGeneric from '../images/mapGeneric.jpg';
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


function InHikeScreen({route, navigation}) {
  const {item} = route.params;
//   for (let i = 0; i <navigation.navigate('Path', {item}); i++)
//     {
        
//     }
  const startingPoint = [-120.329369, 50.666869];
  const nextPoint = [-120.329947, 50.659692];
  const destinationPoint = [-120.328292, 50.660397];

  const [track, setTrack] = useState(null);

  const startDestinationPoints = [startingPoint, nextPoint, destinationPoint]

  useEffect(() => {
    fetchRoute();
  })
  
  const fetchRoute = async () => {
    const reqOptions = {
      waypoints: [
        {coordinates: [-120.329369, 50.666869]},
        {coordinates: [-120.329947, 50.659692]},
        {coordinates: [-120.328292, 50.660397]},
      ],
      profile: 'walking',
      geometries: 'geojson',
    };

    // const res = await directionsClient.getDirections(reqOptions).send();
    console.log(res);

    const newRoute = makeLineString(res.body.routes[0].geometry.coordinates);
    setTrack(newRoute);
  };

  const renderAnnotations = () => {
    return (
      startDestinationPoints.map((point, index) => (
        <MapboxGL.PointAnnotation
            key={`${index}-PointAnnotation`}
            id={`${index}-PointAnnotation`}
            coordinate={point}> 
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


  return (
    <>
    <View style={{flex: 3, height: "100%", width: "100%" }}>
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={11}
        centerCoordinate={startingPoint}
        style={{flex: 1}}>
          <MapboxGL.Camera
            zoomLevel={11}
            centerCoordinate={startingPoint}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>
          {renderAnnotations()}
          {
          track && (
           <MapboxGL.ShapeSource id='shapeSource' shape={track}>
              <MapboxGL.LineLayer id='lineLayer' style={{lineWidth: 5, lineJoin: 'bevel', lineColor: '#ff0000'}} />
            </MapboxGL.ShapeSource>
          )
        }
      </MapboxGL.MapView>
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
  )
    } export default InHikeScreen;

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