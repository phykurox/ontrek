import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import * as firebase from 'firebase';
const { height, width } = Dimensions.get('window')


export default class Homepage1 extends Component {

    state = { currentUser: null }

    constructor(props) {
        super(props);
        this.state = { userInfo: [] };
    }


    componentDidMount() {
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
        const fetchUser = firebase.database().ref('users').orderByChild('email').equalTo(currentUser && currentUser.email);
        fetchUser.once('value', snap => {
            const tempList = this.state.userInfo;
            var uid = Object.keys(snap.val())[0];
            tempList.push({
                fullname: snap.child(uid).child('name').val(),
                fprint: snap.child(uid).child('footprint').val()
            })
            this.setState({ userInfo: tempList });
        })
    }

    navigateTo(title) {
  if(title == 'Travel'){
            this.props.navigation.navigate("MapViewScreen")
        }
         if(title == 'Rewards'){
            this.props.navigation.navigate('Rewards')
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
        const realName = this.state.userInfo.map(usr =>
            <Text style={{ fontSize: 30, marginTop: 20 }}>Welcome {usr.fullname}</Text>)

        const footprint = this.state.userInfo.map(usr =>
            <Text style={{ fontSize: 30, marginTop: 0, fontWeight: 'bold' }}>
                {usr.fprint} <Text style={{ fontWeight: 'normal', fontSize: 20 }}>Footprint</Text>
            </Text>)

        return (
            <ScrollView style={{ backgroundColor: '#E3EAF4' }} showsVerticalScrollIndicator={false}>
                <View style={{ borderBottomColor: '#1681f3', borderBottomWidth: 2, }}>
                    <ImageBackground source={require("../images/homepage.jpg")}
                        style={{ width: width, height: (35 * height) / 100, alignItems: 'center' }}>
                        <Image
                            source={require('../images/user.jpg')}
                            style={{ height: 80, width: 80, borderRadius: 40, marginTop: 20, borderWidth: 1, borderColor: '#00000090' }} />
                        {realName}
                        {footprint}
                    </ImageBackground>
                </View>
                <View style={{ flexDirection: 'row', flex: 1, padding: 30, width: '100%', marginTop: -50 }}>
                    {this.makeView('Travel', require('../images/trekking.png'))}
                    {this.makeView('Rewards', require('../images/medal.png'), true)}
                </View>
                <View style={{ flexDirection: 'row', paddingHorizontal: 30, width: '100%' }}>
                    {this.makeView('Edit Profile', require('../images/usericon.png'))}

                    <TouchableWithoutFeedback
                        onPress={() => firebase.auth().signOut()}>
                        <View style={{ height: (width - 100) / 2, borderWidth: 3, borderColor: '#1681f3', width: (width - 100) / 2, marginLeft: 40.5, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                            <Image
                                source={require('../images/logout.png')}
                                style={{ height: (((width - 100) / 2) * 25 / 100), width: (((width - 100) / 2) * 25 / 100), }} />
                            <Text style={{ fontSize: 14, marginTop: 10, color: '#1681f3' }}>
                                Logout
                    </Text>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </ScrollView>
        );
    }
} 