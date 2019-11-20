/* Libraries */
import React, { Component } from 'react';
import { Button, Icon } from 'native-base';
import { View, Alert, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Platform, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons, Feather, Entypo, EvilIcons } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import axios from 'axios';
import getNearestMrt from 'nearest-mrt';
import haversine from 'haversine'
import pick from 'lodash/pick'

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
            secLoc: null,
            busm2: null,
            prevLatLng: {},
            mrtmarker1:[],
            mrtmarker2: [],
            busmarker1: [],
            busmarker2: [],
            fmmrt: [],
            fmbus: [],
            lmbus: [],
            lmmrt: [],
            checkReach: false,
            display: true,
            distanceTravelled: 0,
            startedLiveTracking: false,
            loader: true
        };
    }
    

    componentDidMount = async () => {
        const { distanceTravelled } = this.state
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('Location access is important to use this app')
        }
        else {
            this.handleLocation();
        }
        //calculate distance from start
        let position = await Location.getCurrentPositionAsync({});
        const newLatLngs = {latitude: position.coords.latitude, longitude: position.coords.longitude }
        const positionLatLngs = pick(position.coords, ['latitude', 'longitude'])
        this.setState({
            distanceTravelled: distanceTravelled + this.calcDistance(newLatLngs),
            prevLatLng: newLatLngs
          })
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

        // ADD LIVE LOCATION TRACKING ACTION TO AN EVENT
        if (!startedLiveTracking) {
            await Location.watchPositionAsync(options, updateCurrentPos)
            this.setState({ startedLiveTracking: true })
        }
    }

    calcDistance(newLatLng) {
        const { prevLatLng } = this.state
        return (haversine(prevLatLng, newLatLng) || 0)
      }

    gettingFMRoutes = async () => {
        const { currPos, destPos } = this.state
        //total distance
        const tDist = haversine(currPos, destPos)
        if (destPos === null) {
            Alert.alert(
                'Notice',
                'Your destination is too near or empty. Try again'
            )
        }
        // Need check location within radius to move to last mile
        // else if () {
                //hide button
        //     this.setState({checkReach: false})
        // }
        else {
            let cLoc = [currPos.longitude, currPos.latitude]
            let dLoc = [destPos.longitude, destPos.latitude]
            const firstnearestMRT = getNearestMrt(cLoc, false, 2000)
            const secnearestMRT = getNearestMrt(dLoc, false, 2000)
            let currLoc = {
                latitude: firstnearestMRT.result[0].station.latitude,
                longitude: firstnearestMRT.result[0].station.longitude
            }
            let secLoc = {
                latitude: secnearestMRT.result[0].station.latitude,
                longitude: secnearestMRT.result[0].station.longitude
            }
            // Get Bus Routes
            let busAPI = axios.get('https://maps.googleapis.com/maps/api/directions/json?origin='+currPos.latitude+','+currPos.longitude+'&destination='+destPos.latitude+','+destPos.longitude+'&mode=transit&transit_mode=bus&key='+GMAPS_API_KEY)
            .then(res=> {
                FirstbusLocArr = res.data.routes[0].legs[0].steps[0].end_location
                let busm1 = {
                    latitude: FirstbusLocArr.lat,
                    longitude: FirstbusLocArr.lng
                }
                instArr = []
                for (let step =0; step < res.data.routes[0].legs[0].steps.length; step++) {
                    if (res.data.routes[0].legs[0].steps[step].travel_mode === 'TRANSIT') {
                        count = 0
                        if (count === 0 ) {
                            firstArr = []
                            firstArr.push(res.data.routes[0].legs[0].steps[step].transit_details.line.name)
                            firstArr.push(res.data.routes[0].legs[0].steps[step].transit_details.arrival_stop.name)
                            firstArr.push(res.data.routes[0].legs[0].steps[step].transit_details.num_stops)      
                            count += 1 
                        }
                        else {
                            otherArr= []
                            otherArr.push(res.data.routes[0].legs[0].steps[step].transit_details.line.name)
                            otherArr.push(res.data.routes[0].legs[0].steps[step].transit_details.arrival_stop.name)
                            otherArr.push(res.data.routes[0].legs[0].steps[step].transit_details.num_stops)     
                        }
                    }
                    if (step === (res.data.routes[0].legs[0].steps.length-1)) {
                        const lastBusStopLoc = res.data.routes[0].legs[0].steps[step].start_location
                        let busm2 = {
                            latitude: lastBusStopLoc.lat,
                            longitude: lastBusStopLoc.lng
                        }
                        this.setState({
                            busmarker2: [
                                ...this.state.busmarker2,
                                {
                                    coordinate: busm2,
                                    name: 'BUS STOP',
                                    title: 'Destination Stop',
                                    description: 'Please alight at this stop and continue last mile.'
                                }
                            ],
                            busm2
                        })  
                    }            
                }
                //Set markers and route for Bus stops
                this.setState({
                    busmarker1: [
                        ...this.state.busmarker1,
                        {
                            coordinate: busm1,
                            name: 'BUS STOP',
                            title: 'Take Bus ' + firstArr[0],
                            description: 'After ' + firstArr[2]+ ' stops, alight at ' +firstArr[1]
                        }
                    ],
                    fmbus: [
                        ...this.state.fmbus,
                        {
                            origin: currPos,
                            destination: busm1,
                            apikey: GMAPS_API_KEY,
                            strokeWidth: 3,
                            strokeColor: '#FF0000'
                        }
                    ],
                })
                
            })
            //set markers and route for MRT Stops
            this.setState({
                mrtmarker1: [
                    ...this.state.mrtmarker1,
                {
                    coordinate: currLoc,
                    name: 'MRT',
                    title: firstnearestMRT.result[0].station.name + ' STATION',
                    description: 'Alight at: ' + secnearestMRT.result[0].station.name + ' STATION'
                }
                ],
                mrtmarker2: [
                    ...this.state.mrtmarker2,
                {
                    coordinate: secLoc,
                    name: 'MRT STATION'
                }
                ],
                fmmrt: [
                    ...this.state.fmmrt,
                    {
                        origin: currPos,
                        destination: currLoc,
                        apikey: GMAPS_API_KEY,
                        strokeWidth: 3,
                        strokeColor: '#00008b'
                    }
                ],
                secLoc, display:  false 
            })        
         }
    }

    gettingLMRoutes = async () => {
        const { busm2, secLoc, destPos } = this.state
        this.setState({
            lmbus: [
                ...this.state.lmbus,
                {
                    origin: busm2,
                    destination: destPos,
                    apikey: GMAPS_API_KEY,
                    strokeWidth: 3,
                    strokeColor: '#FF0000'
                }
            ],
            lmmrt: [
                ...this.state.lmmrt,
                {
                    origin: secLoc,
                    destination: destPos,
                    apikey: GMAPS_API_KEY,
                    strokeWidth: 3,
                    strokeColor: '#00008b'
                }
            ]
        })

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
                        {this.state.mrtmarker1.map((m1) => {
                            return (
                                <Marker {...m1} >
                                <View style={styles.markers}>
                                    <Text style={styles.mtxt}>{m1.name}</Text>
                                </View>
                            </Marker>
                            ) 
                        })}
                        {this.state.mrtmarker2.map((m2) => {
                            return (
                            <Marker {...m2} >
                                <View style={styles.markers}>
                                    <Text style={styles.mtxt}>{m2.name}</Text>
                                </View>
                            </Marker>
                            ) 
                        })}
                        {this.state.busmarker1.map((b1) => {
                            return (
                                <Marker {...b1} >
                                <View style={styles.markers}>
                                    <Text style={styles.mtxt}>{b1.name}</Text>
                                </View>
                            </Marker>
                            ) 
                        })}
                        {this.state.busmarker2.map((b2) => {
                            return (
                                <Marker {...b2} >
                                <View style={styles.markers}>
                                    <Text style={styles.mtxt}>{b2.name}</Text>
                                </View>
                            </Marker>
                            ) 
                        })}
                        {this.state.fmmrt.map((fmm1) => {
                            return (
                            <MapViewDirections {...fmm1} />
                            ) 
                        })}
                        {this.state.fmbus.map((fmb1) => {
                            return (
                            <MapViewDirections {...fmb1} />
                            ) 
                        })}
                        {this.state.lmmrt.map((lmd1) => {
                            return (
                            <MapViewDirections {...lmd1} />
                            ) 
                        })}
                        {this.state.lmbus.map((lmd2) => {
                            return (
                            <MapViewDirections {...lmd2} />
                            ) 
                        })}
                        { this.state.display && 
                        <MapViewDirections
                            origin={currPos}
                            destination={destPos}
                            apikey={GMAPS_API_KEY}
                            onReady={() => {}}
                            strokeWidth={3}
                            strokeColor='#222'
                            />
                        }
                        
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
                    <View style={styles.fmbox}>
                        <Button iconLeft
                        onPress={this.gettingFMRoutes}>
                            <Icon name='paw'/>
                            <Text style={{color: '#fff'}}>First Mile</Text>
                        </Button>
                    </View>
                    <View style={styles.lmbox}>
                        <Button iconLeft
                        onPress={this.gettingLMRoutes}>
                            <Icon name='paw'/>
                            <Text style={{color: '#fff'}}>Last Mile</Text>
                        </Button>
                    </View>
                    <View style={styles.bottomBar}>
                        <View style={styles.bottomBarGroup}>
                            <Text style={styles.bottomBarHeader}>DISTANCE</Text>
                            <Text style={styles.bottomBarContent}>{parseFloat(this.state.distanceTravelled).toFixed(2)} km</Text>
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
    lmbox:{
        bottom: 100,
        left: 20,
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
    },
    bottomBar: {
        position: 'absolute',
        height: 80,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        width: WIDTH,
        padding: 10,
        flexWrap: 'wrap',
        flexDirection: 'row'
      },
      bottomBarGroup: {
        flex: 1
      },
      bottomBarHeader: {
        color: '#fff',
        fontWeight: "400",
        textAlign: 'center'
      },
      bottomBarContent: {
        color: '#fff',
        fontWeight: "700",
        fontSize: 18,
        marginTop: 5,
        color: '#19B5FE',
        textAlign: 'center'
      },
      markers: {
        backgroundColor: "#550bbc",
        padding: 5 ,
        borderRadius: 5,
      },
      mtxt: {
         color: "#FFF",
         fontWeight: "bold" 
      }
})

export default MapViewScreen