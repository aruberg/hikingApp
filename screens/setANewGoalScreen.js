import React, {Component} from 'react';
import { View, Image, Text, StyleSheet, Animated,  TouchableOpacity,Alert, TextInput } from 'react-native';
import { block } from 'react-native-reanimated';
import logo from '../images/logo.png';

class SetANewGoalScreen extends Component {
        state = {
           timeFrame: '',
           distance: '',
           elevation: '',
           location: '',
        }
        handleTimeFrame = (text) => {
           this.setState({ timeFrame: text })
        }
        handleDistance= (text) => {
           this.setState({ distance: text })
        }
        handleElevation= (text) => {
            this.setState({ elevation: text })
         }
        handleLocation= (text) => {
            this.setState({ location: text })
         }
        save = (timeFrame, distance, elevation, location) => {
           alert('TimeFrame: ' + timeFrame + ' Distance: ' + distance + '\n' + 'Elevation: ' + elevation + 'Location: ' + location)
        }
        render() {
           return (
              <View style = {styles.container}>
                   <Image source={logo} style={styles.image} />

                 <View style = {{flexDirection: 'row'}}>
                 <Text style = {styles.TextStyle} >TimeFrame: </Text>
                 <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "in days "
                    placeholderTextColor = "#C98F39"
                    autoCapitalize = "none"
                    onChangeText = {this.handleTimeFrame}/>
                    </View> 

                <View style = {{flexDirection: 'row'}}>
                 <Text style = {styles.TextStyle} >Distance: </Text>
                 <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "# in Km "
                    placeholderTextColor = "#C98F39"
                    autoCapitalize = "none"
                    onChangeText = {this.handleDistance}/>
                 </View> 

                 <View style = {{flexDirection: 'row'}}>
                 <Text style = {styles.TextStyle} >Elevation: </Text>
                 <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "0.0 "
                    placeholderTextColor = "#C98F39"
                    autoCapitalize = "none"
                    onChangeText = {this.handleElevation}/>
                </View>
                 
                <View style = {{flexDirection: 'row'}}> 
                 <Text style = {styles.TextStyle} >Location: </Text>
                 <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "type a location in bc  "
                    placeholderTextColor = "#C98F39"
                    autoCapitalize = "none"
                    onChangeText = {this.handleLocation}/>
                 </View>   
                 
                 <TouchableOpacity
                    style = {styles.submitButton}
                    onPress = {
                       () => this.save(this.state.timeFrame, this.state.distance, this.state.elevation, this.state.location)
                    }>
                    <Text style = {styles.buttonTextStyle}> Save </Text>
                 </TouchableOpacity>
              </View>
           )
        }
     }

export default SetANewGoalScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3C413E',
        justifyContent: 'center',
        alignItems: 'center',
    },

    submitButton: {
        backgroundColor: '#C98F39',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#C98F39',
        height: 60,
        width: 150,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        marginBottom: 20,

      },
      buttonTextStyle: {
        color: '#C9C8B9',
        paddingVertical:10,
        fontSize: 25,

      },
       TextStyle: {
        color: '#C98F39',
        paddingVertical:10,
        fontSize: 25,
        margin: 20,
      },

        input: {
           margin: 20,
           height: 50,
           width: 80,
           borderColor: '#C98F39',
           borderWidth: 3,

        },
     })
