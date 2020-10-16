// import React, {Component} from 'react';
// import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity,Alert } from 'react-native';
// import logo from '../images/logo.png';
// import mapGeneric from '/Users/camicas/projectCOMP4910/hikingApp/images/mapGeneric.jpg';

// class InHikeScreen extends Component {
//     render() {
//         global.currentScreenIndex = 'InHikeScreen';
//         return (

//                 <View style={styles.container}>
//                      <Image source={logo} style={styles.image} />
//                      <Image source={mapGeneric} style={styles.image} />
//                      <TouchableOpacity
//                         style={styles.buttonStyle}
//                         activeOpacity={0.5}
//                         onPress={alert("Opening Camera")}>
//                         <Text style={styles.buttonTextStyle}>QR Scan!</Text>
//                      </TouchableOpacity>
//                 </View>

                  

//                 );
//               };
//     }

// export default InHikeScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#C98F39',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },

//     buttonStyle: {
//         backgroundColor: '#453D5F',
//         borderWidth: 0,
//         color: '#FFFFFF',
//         borderColor: '#453D5F',
//         height: 150,
//         width: 150,
//         alignItems: 'center',
//         borderRadius: 100,
//         marginLeft: 10,
//         marginRight: 10,
//         marginTop: 20,
//         marginBottom: 20,

//       },
//       buttonTextStyle: {
//         color: '#C9C8B9',
//         paddingVertical: 55,
//         fontSize: 30,
//       },
//       image: {
//         resizeMode: "contain",
//         width: 200,
//         height: 250,
//         marginTop: -70,
//         marginBottom: 0,

//     },
//     board: {
//         width: 250,
//         height: 100,
//         backgroundColor: '#86608e',
//         marginLeft: 10,
//         marginRight: 10,
//         marginTop: 20,
//         marginBottom: 20,
//         borderRadius: 20,


//     },
//     boardTextStyle: {
//         color: '#C9C8B9',
//         paddingVertical: 10,
//         paddingLeft: 20,
//         fontSize: 16,
//       },
// });