import React, { Component } from 'react';
import * as firebase from 'firebase';
import Login from './src/pages/Login';
import Home from './src/pages/Home';


export default class Loading extends Component {
    componentDidMount() {
      this.checkIfLoggedIn();
    }
  
    checkIfLoggedIn = () => {
    fire.auth().onAuthStateChanged(
      function(user) {
      if(user){
        this.props.navigation.navigate('Home')
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
  