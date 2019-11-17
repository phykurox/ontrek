import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import IndexFile from './src';

export default class App extends React.Component {
  render() {
    return (
      <IndexFile />
    );
  }
}

// import React, { Component } from 'react';
// import {Text, View} from 'react-native'
// import * as Location from 'expo-location';
// import getNearestMrt from 'nearest-mrt'
// import getEnvVars from './env';

// const { GMAPS_API_KEY } = getEnvVars();
// const { GOOGLE_PLACES_URL } = getEnvVars();

// export default class App extends Component {
//   componentWillMount() {
//     const target = [103.736083, 1.341832]
//     const nearestMRT = getNearestMrt(target, false, 2000)
//     console.warn(nearestMRT.result[0].station.longitude)
//   }
//   render() {
//     return(
//       <View>
//         <Text>Hi</Text>
//       </View>
       
//     )
//   }
 

// }


