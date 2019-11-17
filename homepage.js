import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
const { height, width } = Dimensions.get('window')
export default class Homepage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    navigateTo(title) {
        if (title == 'Travel') {
            this.props.navigation.navigate('Map')
        }
    }
    makeView(title, image, rightMargin) {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.navigateTo(title)}
            >
                <View style={{ height: (width - 100) / 2, borderWidth: 3, borderColor: '#1681f3', width: (width - 100) / 2, marginLeft: rightMargin ? 40 : 0, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                    <Image
                        source={image}
                        style={{ height: (((width - 100) / 2) * 25 / 100), width: (((width - 100) / 2) * 25 / 100), }} />
                    <Text style={{ fontSize: 14, marginTop: 10, color: '#1681f3' }}>
                        {title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
    render() {
        return (
            <ScrollView style={{ backgroundColor: '#E3EAF4' }} showsVerticalScrollIndicator={false}>
                <View style={{ borderBottomColor: '#1681f3', borderBottomWidth: 2, }}>
                    <ImageBackground source={require("../Images/homepage.jpg")}
                        style={{ width: width, height: (35 * height) / 100, alignItems: 'center' }}>
                        <Image
                            source={require('../Images/user.jpg')}
                            style={{ height: 80, width: 80, borderRadius: 40, marginTop: 20, borderWidth: 1, borderColor: '#00000090' }} />
                        <Text style={{ fontSize: 30, marginTop: 20 }}>
                            Welcome Noah
                    </Text>
                        <Text style={{ fontSize: 30, marginTop: 0, fontWeight: 'bold' }}>
                            80 <Text style={{ fontWeight: 'normal', fontSize: 20 }}>Footprint</Text>
                        </Text>
                    </ImageBackground>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, padding: 30, width: '100%', marginTop: -50 }}>
                    {this.makeView('Travel', require('../Images/trekking.png'))}
                    {this.makeView('Rewards', require('../Images/medal.png'), true)}
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 30, width: '100%' }}>
                    {this.makeView('Edit Profile', require('../Images/usericon.png'))}
                    {this.makeView('Logout', require('../Images/logout.png'), true)}
                </View>



            </ScrollView>
        );
    }
}

