import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import MapboxGL from "@react-native-mapbox-gl/maps";


MapboxGL.setAccessToken('pk.eyJ1Ijoia2FtbG9vcHNoaWtpbmdhcHAiLCJhIjoiY2tnOXB6eHZrMDNiazJ4cGJsemRzbDIzayJ9.KxdkKCtiVF9F9MDptsdRZg',);
//Used Guide here:
//https://reactnativeforyou.com/how-to-integrate-mapbox-in-react-native/
export default App = () => {

  return (
    <View style={{ height: "100%", width: "100%", backgroundColor:"#3C413E"}}>
      <MapboxGL.MapView
        styleURL={MapboxGL.StyleURL.Street}
        zoomLevel={11}
        centerCoordinate={[-120.3428, 50.6782]}
        style={{flex: 1}}>
          <MapboxGL.Camera
            zoomLevel={11}
            centerCoordinate={[-120.3428, 50.6782]}
            animationMode={'flyTo'}
            animationDuration={0}
          >
          </MapboxGL.Camera>
      </MapboxGL.MapView>
      <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonContainerCircle}
        activeOpacity={0.5}
      >
      <Text style={styles.buttonTextStyle}>QR Scan!</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
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
        marginTop: 20,
        marginBottom: 20,

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

    map: {
        flex: 1,
    },
});
