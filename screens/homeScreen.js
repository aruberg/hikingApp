import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity,Alert } from 'react-native';
import { block } from 'react-native-reanimated';
import logo from '../images/logo.png';

class HomeScreen extends Component {
    render() {
        global.currentScreenIndex = 'HomeScreen';
        return (
                <View style={styles.container}>

                     <Image source={logo} style={styles.image} />
                     
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        activeOpacity={0.5}
                        onPress={alert('you are going to take a hike')}>
                        <Text style={styles.buttonTextStyle}>Do a Hike!</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={styles.buttonContainer}
                        activeOpacity={0.5}
                        onPress={alert('going to your profile')}>
                        <Text style={styles.buttonTextStyle}>My profile</Text>  
                     </TouchableOpacity>
                     
                     <View style={styles.board}>
                            <Text style={styles.boardTextStyle} >Goals</Text>
                        </View>
                        <View style={styles.board}>
                            <Text style={styles.boardTextStyle} >Awards</Text>
                        </View>
                         </View>

                 
                  

                );
              };
    }

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3C413E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header:{
        backgroundColor: "#679267",
        height:200,
      },
    buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#C98F39",

      },
      buttonTextStyle: {
        color: '#C9C8B9',
        paddingVertical: 10,
        fontSize: 16,
      },
      image: {
        resizeMode: "contain",
        marginTop: 30,
        marginBottom: 70,

    },
    board: {
        width: 330,
        height: 150,
        backgroundColor: '#679267',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 20,
        borderRadius: 20,


    },
    boardTextStyle: {
        color: '#C9C8B9',
        paddingVertical: 10,
        paddingLeft: 20,
        fontSize: 16,
      },
});