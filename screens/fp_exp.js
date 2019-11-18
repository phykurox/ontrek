import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import  Header  from '../components/header';

export default class Fpexp extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View>
                <Header title='Footprint & Experience' backButton={false}/>
                <Text
                    onPress={() => this.props.navigation.navigate('Feedback')}
                > fp_exp </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Feedback')} style={{ height: 100, width: 50, backgroundColor: 'red' }}>
                   

                </TouchableOpacity>
            </View>
        );
    }
}
