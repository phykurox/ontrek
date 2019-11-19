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
  Keyboard,
  Alert
} from 'react-native';


import bgImage from '../images/background.jpg'
import logo from '../images/logo.png'
import Icon from 'react-native-vector-icons/MaterialIcons'

const { width: WIDTH } = Dimensions.get('window')

export default class Register extends Component <[]> {	
	
	state = {
      userEmail: '',
      userPassword: '',
	  userName: '',
	  userDOB: '',
	  userGender: '',
	  userPhoneNumber: '',
	  userCommuteMethod: ''
    }
		
	validateEmail = (email) => {
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}
	
	validatePassword = (password) => {
		var re2 = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,}))/;
		return re2.test(password);		
	}
	
	validatePhoneNumber = (phoneNumber) => {
		var re3 = /^(?=[0-9]{8})/;
		return re3.test(phoneNumber);		
	}
	
	validateGender = (gender) => {
		var re4 = /^(Male|Female)$/;
		return re4.test(gender);		
	}
	
	handleRegister = () => {
				
		if (this.state.userEmail == '' || this.state.userPassword == '' || this.state.userName == '' || this.state.userAge == '' || this.state.userGender == '' || this.state.userPhoneNumber == '' || this.state.userCommuteMethod == ''){
						
			alert('Please fill up the empty fields.');
		} else if (!this.validateEmail(this.state.userEmail)){
			
			alert('Please enter a valid email.');
		} else if (!this.validatePassword(this.state.userPassword)) {
			
			alert('Password must be at least 8 characters long, contains at least 1 uppercase, lowercase and numeric characters, as well as NO special characters.');
		} else if (!this.validatePhoneNumber(this.state.userPhoneNumber)) {
			
			alert('Please enter a Singapore phone number without country code and spaces. eg.90765827');
		} else if (!this.validateGender(this.state.userGender)) {
			
			alert('Please enter "Male" or "Female" for gender.');
		} else {
			
			firebase.auth().createUserWithEmailAndPassword(this.state.userEmail, this.state.userPassword)
	  .then((res) => {
		  firebase.database().ref('users/').push({
			email: this.state.userEmail,
			password: this.state.userPassword,
			name: this.state.userName,
			age: this.state.userAge,
			gender: this.state.userGender,
			phoneNumber: this.state.userPhoneNumber,
			preferredCommute: this.state.userCommuteMethod,
			footprint: 0,
			exp: 0
		  })		  
	  })
	  .then(() => {
	  firebase.auth().currentUser.sendEmailVerification()
	  .then(function() {
		alert('A verification email has been sent to your email account.');
		}).catch(function(error) {
		alert('An error has occurred. ' + error.message);
		});
	  })		
		
	}
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
          <TextInput 
			style={styles.input}
            placeholder = {'Full Name'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
			value = {this.state.userName}
            onChangeText={userName => this.setState({userName})}
            />
        </View>
		
		<View style={styles.inputContainer}>
        <Icon name={'email'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>  
          <TextInput 
			style={styles.input}
            placeholder = {'Email'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
            keyboardType="email-address"
			value = {this.state.userEmail}
            onChangeText={userEmail => this.setState({userEmail})}
            />
        </View>

        <View style={styles.inputContainer}>
        <Icon name={'lock-outline'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput 
			style={styles.input}
            placeholder = {'Password'}
            secureTextEntry = {true}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
			value = {this.state.userPassword}
            onChangeText={userPassword => this.setState({userPassword})}
            />
        </View>  		
		
		<View style={styles.inputContainer}>
        <Icon name={'portrait'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput 
			style={styles.input}
            placeholder = {'Date of Birth'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
			value = {this.state.userAge}
            onChangeText={userAge => this.setState({userAge})}
            />
        </View>
		
		<View style={styles.inputContainer}>
        <Icon name={'wc'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput 
			style={styles.input}
            placeholder = {'Gender: Male/Female'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
			value = {this.state.userGender}
            onChangeText={userGender => this.setState({userGender})}
            />
        </View>
		
		<View style={styles.inputContainer}>
        <Icon name={'contact-phone'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput 
			style={styles.input}
            placeholder = {'Phone Number'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
			value = {this.state.userPhoneNumber}
            onChangeText={userPhoneNumber => this.setState({userPhoneNumber})}
            />
        </View>
		
		<View style={styles.inputContainer}>
        <Icon name={'directions-walk'} size={28} color={'rgba(255,255,255,0.7)'} 
          style = {styles.inputIcon}/>
          <TextInput 
			style={styles.input}
            placeholder = {'Commute Method'}
            placeholderTextColor = 'white'
            underlineColorAndroid = 'transparent'
			value = {this.state.userCommuteMethod}
            onChangeText={userCommuteMethod => this.setState({userCommuteMethod})}
            />
        </View>		
        
		<TouchableOpacity style={styles.btnRegister} onPress={this.handleRegister}>
          <Text style={styles.regtext}>Register</Text>
        </TouchableOpacity>
	 
    </ImageBackground>
	
    );
  }	
	
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    //height: null,
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

  btnRegister: {
    justifyContent: 'center',
    top: 10
  },

  regtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  }

});