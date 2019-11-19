import React, { Component } from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';


firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
});

export default class Loading extends Component {
    componentDidMount() {
      this.checkIfLoggedIn();
    }
  
    checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
      if(user){
        this.props.navigation.navigate('Homepage')
      }
      else{
        this.props.navigation.navigate('Login')
      }
    }.bind(this)
    );
  };

    render() {
        return (
          <View style={styles.container}>
            <Text>Loading</Text>
            <ActivityIndicator size="large" />
          </View>
        )
      }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })
  