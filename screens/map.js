import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
const { height, width } = Dimensions.get('window')
import Geolocation from '@react-native-community/geolocation';
export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //current region that user is at
            region: {
                latitude: 1.380090,
                longitude: 103.897720,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            },
            address: 'no address found',
            currentLocation: {
                latitude: 1.380090,
                longitude: 103.897720,
            }

        };

    }
    componentDidMount() {
        Geolocation.getCurrentPosition(info =>
            this.setState({
                currentLocation: {
                    latitude: Number(info.coords.latitude),
                    longitude: Number(info.coords.longitude)
                },
                region: {
                    latitude: Number(info.coords.latitude),
                    longitude: Number(info.coords.longitude),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
                endPoint: '',
                startPoint: '',
                startCoordinates: {
                    latitude: Number(info.coords.latitude),
                    longitude: Number(info.coords.longitude)
                },
                endCoordinates: ''
            })
        );
    }
    onRegionChange(region) {
        this.setState({ region: region })
        console.log(region)
    }
    onPressOnMap(regi) {
        console.log(regi.nativeEvent.coordinate)
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + regi.nativeEvent.coordinate.latitude + ',' + regi.nativeEvent.coordinate.longitude + '&key=AIzaSyDbaM2Q6k_wyjAiRZcyOyq8bmk8Ks2h3Sw').then(response => response.json())
            //converting from longtitude and latitude to address 
            .then((responseJson) => {
                this.setState({ address: responseJson.results[0].formatted_address })
                console.log(responseJson)
            })
            .catch(error => console.log(error)) //to catch the errors if any

    }
    setAddress(data) {
        console.log(data)
        if (data.type == 'start') {
            this.setState({
                region: {
                    latitude: data.coordinates.latitude,
                    longitude: data.coordinates.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            })
            this.setState({ startPoint: data.address, startCoordinates: data.coordinates })
        } else {
            this.setState({ endPoint: data.address, endCoordinates: data.coordinates })

        }
    }
    render() {
        return (
            <View>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('Search', { callBack: (data) => this.setAddress(data), type: 'start' })
                    }
                >
                    <TextInput
                        value={this.state.startPoint}
                        placeholder={'Start Address'}
                        pointerEvents='none'
                        editable={false}
                        onChangeText={(text) => this.setState({ startPoint: text })}
                        style={{ height: 40, width: width - 20, alignSelf: 'center', borderWidth: 1, margin: 5, paddingHorizontal: 5, }}
                    >
                    </TextInput>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        this.props.navigation.navigate('Search', { callBack: (data) => this.setAddress(data), type: 'end' })
                    }
                >
                    <TextInput
                        value={this.state.endPoint}
                        placeholder={'End Address'}
                        editable={false}
                        pointerEvents='none'
                        onChangeText={(text) => this.setState({ endPoint: text })}
                        style={{ height: 40, width: width - 20, alignSelf: 'center', borderWidth: 1, margin: 5, paddingHorizontal: 5, }}
                    >

                    </TextInput>
                </TouchableOpacity>
                <MapView
                    style={{ height: height, width: width }}
                    // initialRegion={{
                    //     latitude: 37.78825,
                    //     longitude: -122.4324,
                    //     latitudeDelta: 0.0922,
                    //     longitudeDelta: 0.0421,
                    // }}
                    types={['bus_station', 'train_station']}
                    radius={15000}
                    onPress={(e) => this.onPressOnMap(e)}
                    onRegionChange={(region) => this.onRegionChange(region)}
                    showsUserLocation={true}
                    region={this.state.region}
                >
                    {/* first marker is for current location and start point also */}
                    {this.state.startCoordinates != '' ? <Marker
                        coordinate={this.state.startCoordinates}
                        pinColor='green'
                        title={'start point'}
                    // description={marker.description}
                    /> : null}
                    {this.state.endCoordinates != '' ? <Marker
                        coordinate={this.state.endCoordinates}
                        title={'end point'}
                    // description={marker.description}
                    /> : null}
                </MapView>
            </View>
        );
    }
}
