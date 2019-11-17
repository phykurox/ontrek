import React, { Component } from 'react';
import * as Location from 'expo-location';
import getEnvVars from './../../../env';

const { GMAPS_API_KEY } = getEnvVars();
const { GOOGLE_PLACES_URL } = getEnvVars();

const getCurrLocation = () =>  {
    componentDidMount = async () => {
        let position = await Location.getCurrentPositionAsync({});
        let currPos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
        this.setState({ currPos })
    }
}


export const getNearestMRT = (lat, lng) => {
    const url ='${GOOGLE_PLACES_URL}?location=${currPos.latitude},${currPos.longitude}&radius=1000&type=point_of_interest&keyword=divvy&key=${GMAPS_API_KEY}'

    return async (dispatch) =>{
        const {data} = await axios.get(url)
    }
}