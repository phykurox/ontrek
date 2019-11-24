import React, { Component } from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import * as firebase from 'firebase';

//This is the page that initializes the database connection to firebase 
firebase.initializeApp({
  apiKey: "AIzaSyCfd6oB6-iA27Av-yx-hrTquK4F5WwcnVg",
  authDomain: "ontrek-3a9e6.firebaseapp.com",
  databaseURL: "https://ontrek-3a9e6.firebaseio.com/",
  projectId: "ontrek-3a9e6",
  storageBucket: "ontrek-3a9e6.appspot.com",
  messagingSenderId: "23020331850",
});




export default class Loading extends Component {
    componentDidMount() {
      
      this.checkIfLoggedIn();
    }
  
    checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(
      function(user) {
      if(user){
        this.props.navigation.navigate('Homepage1')
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
  