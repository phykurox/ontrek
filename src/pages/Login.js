import React, {Component} from 'react';
import * as firebase from 'firebase';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Alert
} from 'react-native';

import bgImage from '../images/background.jpg'
import logo from '../images/logo.png'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width: WIDTH } = Dimensions.get('window')

export default class Login extends Component <[]> {

  constructor(props) {
    super(props);
    this.state = {email: '', password: ''};
  }

  onLoginPress() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
      this.props.navigation.navigate('Home');
    })
    .catch(() => {
      Alert.alert('Authentication Error', 'Invalid Credentials');
    })
  }

  render() {
  return (  
    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View styles={styles.logoContainer}>
          <Image source = {logo} style={styles.logo}/>
          <Text style={styles.logotext}>ONTREK</Text>
        </View>

        <View style={styles.inputContainer}>
          <Icon name={'person-outline'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput style={styles.input}
            placeholder = {'Email'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
            />
        </View>

        <View style={styles.inputContainer}>
        <Icon name={'lock-outline'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput style={styles.input}
            placeholder = {'Password'}
            secureTextEntry = {true}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
            onChangeText={password => this.setState({password})}
            />

        </View>
        <TouchableOpacity style={styles.btnForgot} onPress={() => this.props.navigation.navigate('Forget')}>
          <Text style={styles.forgettext}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnLogin} onPress={this.onLoginPress.bind(this)}>
          <Text style={styles.logintext}>Login</Text>
        </TouchableOpacity>
        
        
        <TouchableOpacity style={styles.btnRegister} onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.forgettext}>Register</Text>
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

  logo: {
    width: 120,
    height: 120,

  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  
  logotext: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    fontStyle: 'italic',
    margin: 10,
    opacity: 0.8
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
  inputContainer:{
    marginTop:10
  },

  btnLogin:{
    width: WIDTH - 70,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'rgba(19, 27, 35, 0.6)',
    justifyContent: 'center',
    marginTop: 10
  },

  btnForgot: {
    top: 4,
    right: 100,
  },

  btnRegister: {
    justifyContent: 'center',
    top: 10
  },


  logintext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },

  forgettext: {
    color: 'rgba(225, 225, 225, 1)',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: "center",
  }
});

