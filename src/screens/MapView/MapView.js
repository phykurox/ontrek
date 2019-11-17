/* Libraries */
import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons, Feather, Entypo, EvilIcons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

// Env vars
import getEnvVars from './../../../env';

// Constants
const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height
const { GMAPS_API_KEY } = getEnvVars();

class MapViewScreen extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            startRegion: null,
            currPos: null,
            destPos: null,
            startedLiveTracking: false,
            loader: true
        };
    }

    componentDidMount = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Location access is important to use this app')
        }
        else {
            this.handleLocation();
        }
    }

    // UTILITY FUNCTIONS

    handleLocation = async () => {
        const { updateCurrentPos } = this
        let position = await Location.getCurrentPositionAsync({});
        updateCurrentPos(position)
    }

    onRegionChange = startRegion => {
        this.setState({
            startRegion,
        })
    }

    updateCurrentPos = (position) => {
        const { animate, focusMap } = this
        let currPos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        this.setState({ currPos, loader: false }, () => animate())
    }

    updateDestinationPos = (position) => {
        const { animate, focusMap } = this
        let destPos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        this.setState({ destPos }, () => focusMap())
    }

    focusMap = async () => {
        const { currPos, destPos, startedLiveTracking } = this.state
        const { updateCurrentPos } = this
        this.refs.map.fitToCoordinates(
            [
                {
                    latitude: currPos.latitude,
                    longitude: currPos.longitude
                },
                {
                    latitude: destPos.latitude,
                    longitude: destPos.longitude
                }
            ],
            {
                edgePadding: { top: 70, right: 70, bottom: 70, left: 70 },
                animated: true,
            }
        )
        const options = {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 3000,
            distanceInterval: 0
        }

        // ADD THIS LIVE LOCATION TRACKING ACTION TO WHICHEVER EVENT YOU WANT
        if (!startedLiveTracking) {
            await Location.watchPositionAsync(options, updateCurrentPos)
            this.setState({ startedLiveTracking: true })
        }
    }

    animate = () => {
        setTimeout(() => {
            this.refs.map.animateToRegion(
                {
                    latitude: this.state.currPos.latitude,
                    longitude: this.state.currPos.longitude,
                    latitudeDelta: 0.0122,
                    longitudeDelta: 0.0061,
                },
                1000
            );
        }, 15)
    }
    // UTILITY FUNCTIONS

    render() {
        const { getRegion, onRegionChange, updateCurrentPos, updateDestinationPos } = this
        const { currPos, destPos, loader } = this.state
        const region = {
            latitude: currPos ? currPos.latitude : null,
            longitude: currPos ? currPos.longitude : null,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0061,
        }
        if (!loader) {
            return (
                <View style={{ flex: 1 }}>
                    <MapView
                        ref="map"
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        initialRegion={region}
                        onRegionChange={onRegionChange}
                        showsUserLocation
                        loadingEnabled
                    >
                        {/* <Marker coordinate={currPos} title={'Start'} /> */}
                        {destPos ? <Marker coordinate={destPos} title={'Destination'} /> : null}
                        <MapViewDirections
                            origin={currPos}
                            destination={destPos}
                            apikey={GMAPS_API_KEY}
                            onReady={() => {}}
                            strokeWidth={3}
                            strokeColor='#222'
                            />
                    </MapView>
                    
                    <View style={{ ...styles.autoCompleteContainer, zIndex: 1 }}>
                        <Text style={{ ...styles.Text }}>Start</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <EvilIcons name={'search'} size={20} color={'orange'} style={{ marginLeft: 10, marginTop: 12 }} />
                            <GooglePlacesAutocomplete
                                placeholder={'Choose start location'}
                                minLength={2}
                                autoFocus={false}
                                returnKeyType={'default'}
                                fetchDetails={true}
                                getDefaultValue={() => 'Current location'}
                                onPress={(data, details = null) => {
                                    this.setState({ address: data.description || data.name })
                                    const position = {
                                        coords: {
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                        }
                                    }
                                    updateCurrentPos(position)
                                }}
                                query={{ key: GMAPS_API_KEY, language: 'en' }}
                                styles={{
                                    textInputContainer: styles.autoCompleteTextContainer,
                                }}
                                listViewDisplayed={false}
                                nearbyPlacesAPI={'GoogleReverseGeocoding'}
                            />
                        </View>
                    </View>
                    <View style={styles.fmbox}>
                        <Button iconLeft
                        onPress={() =>alert('Add payment')}>
                            <Icon name='paw'/>
                            <Text style={{color: '#fff'}}>Start First Mile</Text>
                        </Button>
                    </View>
                    <View style={{ ...styles.autoCompleteContainer, top: 135, zIndex: 0 }}>
                        <Text style={{ ...styles.Text }}>Destination</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <EvilIcons name={'search'} size={20} color={'orange'} style={{ marginLeft: 10, marginTop: 12 }} />
                            <GooglePlacesAutocomplete
                                placeholder={'Choose destination location'}
                                minLength={3}
                                autoFocus={false}
                                returnKeyType={'default'}
                                fetchDetails={true}
                                getDefaultValue={() => this.state.address || ''}
                                onPress={(data, details = null) => {
                                    this.setState({ address: data.description || data.name })
                                    const position = {
                                        coords: {
                                            latitude: details.geometry.location.lat,
                                            longitude: details.geometry.location.lng,
                                        }
                                    }
                                    updateDestinationPos(position)
                                }}
                                query={{ key: GMAPS_API_KEY, language: 'en' }}
                                styles={{
                                    textInputContainer: styles.autoCompleteTextContainer
                                }}
                                listViewDisplayed={false}
                                nearbyPlacesAPI={'GoogleReverseGeocoding'}
                            />
                        </View>
                    </View>
                </View>
            )
        }
        return (
            <ActivityIndicator style={{
                position: "absolute",
                left: 0,
                top: "50%",
                width: "100%",
                zIndex: 2,
                translateY: -10
            }} size="large" color={'black'} />
        )
    }
};

const styles = StyleSheet.create({
    fmbox:{
        bottom: 100,
        right: 20,
        position: 'absolute',
        zIndex: 5,
        elevation: 7,
    },
    autoCompleteContainer: {
        borderRadius: 10,
        overflow: 'hidden',
        position: 'absolute',
        backgroundColor: 'white',
        left: '5%',
        right: '5%',
        top: 50,
        width: '90%',
        backgroundColor: '#fff'
    },
    autoCompleteTextContainer: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        borderBottomWidth: 0,
    },
    Text: {
        fontStyle: 'italic',
        padding: 10
    }
})

export default MapViewScreen