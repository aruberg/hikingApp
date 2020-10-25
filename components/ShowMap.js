import React, {Component} from 'react';
import {View, SafeAreaView} from 'react-native';
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken('pk.eyJ1Ijoia2FtbG9vcHNoaWtpbmdhcHAiLCJhIjoiY2tnOXFyNHdrMDZzYTJ4bzEwdzRpb3BzNyJ9.XsNRLNsh273gGyt99pFlzw');
MapboxGL.setConnected(true);

export default class ShowMap extends Component {

    constructor(props){
        super(props);
        this.state={
            coordinates:[[-120.3428, 50.6782]],
            location:[[-120.3428, 50.6782]],
        };
    };

  render () {
    return (
        <SafeAreaView>
            <View style={{flex: 1}}>
                <MapboxGL.MapView
                    ref={(c) => (this._map = c)}
                    zoomLevel={2.37}
                    style={{flex: 1}}
                    centerCoordinate={this.state.coordinates[0]}
                    >
                </MapboxGL.MapView>
            </View>
        </SafeAreaView>

      );
  }
};