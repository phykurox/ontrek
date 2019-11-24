import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
//import Permissions from 'react-native-permissions';
import {DestButton} from './Main/Components/Map/MapButton';

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
    };
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error:null
      });
    }, error => this.setState({error: error.message}),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 2000 }
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <DestButton/>
            <MapView
            style={styles.map}
            region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }}
        >
        <Marker coordinate={this.state}/>
        </MapView>
   </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });