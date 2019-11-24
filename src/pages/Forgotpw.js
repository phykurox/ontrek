import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import bgImage from '../images/background.jpg'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width: WIDTH } = Dimensions.get('window')

export default class Forgotpw extends Component {
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View>
        <Text style={styles.fgtTitle}>Forgot Your Password?</Text>
        <Text style={styles.instructions}>Enter your Registered Email</Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'person-outline'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput style={styles.input}
            placeholder = {'Email'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
            keyboardType="email-address"
            />
        </View>
              
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.logintext}>Confirm</Text>
        </TouchableOpacity>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fgtTitle: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: "center",
    margin: 10,
    opacity: 0.8
  },

  instructions: {
    color: 'white',
    fontSize:15,
    textAlign: "center",
  },

  inputContainer:{
    marginTop:10
  },

  input: {
    width: WIDTH - 70,
    height: 40,
    borderRadius: 30,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'white',
    opacity: 0.8,
    marginHorizontal: 25
  }, 
   
  inputIcon: {
    position: 'absolute',
    top: 5,
    left: 35
  },

  btnLogin:{
    width: WIDTH - 70,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'rgba(19, 27, 35, 0.6)',
    justifyContent: 'center',
    marginTop: 10
  },

  logintext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },

});
