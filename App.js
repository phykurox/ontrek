import React, {Component} from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, Image }
from 'react-native';
import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import {Header, Left, Right, Icon} from 'native-base';

import HomeScreen from './Screens/HomeScreen.js';
import SettingsScreen from './Screens/SettingsScreen.js';

export default class App extends React.Component {
render() {
  return (
    <AppDrawerNavigator />
  );
  }
}

const CustomDrawerComponent = (props) => (
    <View>
        <View style={{ height:150, backgroundColor: 'white', alignItems: 'center',
        justifyContent: 'center', paddingTop:30}}>
            <Image source={require('./Footprints.png')} style={{ height: 120
            , width:120, borderRadius:60}}/>
        </View>
        <ScrollView>
            <DrawerItems {...props} />
        </ScrollView>
    </View>
)

const AppDrawerNavigator = createDrawerNavigator({
    Home:HomeScreen,
    Settings1:SettingsScreen
    },{
    contentComponent:CustomDrawerComponent
    }
    )

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
});
