import { Dimensions, View, TouchableOpacity, Text, Image } from 'react-native'
import React, { Component } from 'react';

const { height, width } = Dimensions.get('window');
export default Header = ({ title, backButton,onPress }) => {
    return (
        <View style={{ width: width, height: 50, backgroundColor: 'white', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: "#add8e6" }}>
            {backButton ?
                <TouchableOpacity 
                onPress={onPress}
                style={{ height: 50, width: 50,alignItems:'center',justifyContent:'center'}}>
                <Image 
                resizeMode='contain'
                style = {{height: 20, width: 20, tintColor: "blue"}} source = {require("../images/back.png")}></Image>
                </TouchableOpacity>
                : null}
            <Text style={{ fontSize: 20, alignSelf: 'center', textAlign: 'center', flex: 1, color: "#024295" }}>{title}</Text>
            {backButton ?
                <View 
                
                style={{ height: 50, width: 50 }}>
                
                </View>
                : null}
        </View>
    )
}