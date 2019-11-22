import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    ProgressBarAndroid,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import Header from '../components/header';
import navigation from "react-navigation";
import { Left, Right, Icon, Container, Body, Content, Card, CardItem } from 'native-base';
import * as firebase from 'firebase';


class FPEXP extends Component {
    constructor(props) {
        super(props);
        this.getFirebase = this.getFirebase.bind(this);
        this.updateFirebase = this.updateFirebase.bind(this);
        this.state = { userInfo: [] };
        this.fprint = 0;
        this.exp = 0;
    }

    state = {
        expValue: 0,
        fpValue: 0,
        kmValue: 0,
        totalDistance: 0,
        userEmail: '',
        userPassword: '',
        userName: '',
        userDOB: '',
        userGender: '',
        userPhoneNumber: '',
        userCommuteMethod: ''
        
    }

    componentDidMount() {
        this.setState({
           
            kmValue: this.props.navigation.getParam('distanceTravelled'),
            totalDistance: this.props.navigation.getParam('tDist'),
            expValue: 3, fpValue: 6
        })

        if (this.state.kmValue < 0.2 * this.state.totalDistance) {
            this.setState({ expValue: 0, fpValue: 0, kmValue: this.props.navigation.getParam('distanceTravelled') })

        } else {
            this.setState({
                expValue: this.props.navigation.getParam('distanceTravelled') * 100,
                fpValue: this.props.navigation.getParam('distanceTravelled') * 10,
                kmValue: this.props.navigation.getParam('distanceTravelled')
            })

            this.getFirebase()
            
        }
        console.log('kmValue' + this.kmValue + 'total distance' + this.totalDistance)
    }

    updateFirebase = () => {
        var uid;
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
        const fetchUser2 = firebase.database().ref('users').orderByChild('email').equalTo(currentUser && currentUser.email);
        fetchUser2.once('value', snap => {
            const tempList = this.state.userInfo;
            uid = Object.keys(snap.val())[0];
            console.log(uid);
            var updateData = {
                
                footprint: this.fprint + this.state.fpValue, 
                exp: this.exp + this.state.expValue
            };
            var update1 = {};
            update1['/users/' + uid ] = updateData;
            var database = firebase.database().ref('users/' + uid).update({ footprint: this.fprint + this.state.fpValue, 
                exp: this.exp + this.state.expValue});
            alert("Footprint and EXP has been credited to your account")
        })


    }

    getFirebase = () => {
        var uid;
        const { currentUser } = firebase.auth();
        this.setState({ currentUser });
        const fetchUser = firebase.database().ref('users').orderByChild('email').equalTo(currentUser && currentUser.email);
        fetchUser.once('value', snap => {
            const tempList = this.state.userInfo;
            uid = Object.keys(snap.val())[0];

            firebase.database().ref('users/' + uid).on('value', (snapshot) => {
                const userObject = snapshot.val();
                console.log("USEROBJECT" + this.userObject);
                this.fprint = userObject.footprint;
                console.log("fprint" + this.fprint)
                this.exp = userObject.exp;
                
            } )
            this.updateFirebase();
            
        })
        console.log();
      
        console.log("Footprint" + this.fprint + "EXP"  + this.exp );
    
}

    render() {

        const { expValue, fpValue } = this.state;
        const { navigation } = this.props;
        const kmValue = navigation.getParam('distanceTravelled');
        const totalDistance = navigation.getParam('tDist');
        const currPos=  this.props.navigation.getParam('currPos');
        const destPos=  this.props.navigation.getParam('destPos');
        
        return (

            <Container style={styles.container}>
                <SafeAreaView>
                    <Header
                        onPress={() => this.props.navigation.goBack()}
                        title='Footprint and Exp' backButton={true} />
                </SafeAreaView>
                <Content>
                    <View style={{ paddingTop: 10 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1, alignItems: 'center', paddingTop: 10 }}>
                                <Image source={require("../images/avatar.png")}
                                    style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                            </View>
                            <View style={{ flex: 3 }}>
                                <Card style={{ marginLeft: 5, marginRight: 5, }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}>

                                        <CardItem style={{
                                            borderWidth: 1,
                                            borderBottomColor: '#dee0e2', justifyContent: 'center', flex: 1
                                        }}>
                                            <View>
                                                <Text style={{ fontWeight: 'bold' }}>10</Text>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>Level</Text>
                                            </View>
                                        </CardItem>

                                        <CardItem style={{
                                            borderWidth: 1,
                                            borderBottomColor: '#dee0e2', justifyContent: 'center', flex: 1
                                        }}>
                                            <View>
                                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>200</Text>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>FootPrints</Text>
                                            </View>
                                        </CardItem>

                                        <CardItem style={{
                                            borderWidth: 1,
                                            borderBottomColor: '#dee0e2', justifyContent: 'center', flex: 1
                                        }}>
                                            <View>
                                                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>5</Text>
                                                <Text style={{ fontSize: 12, color: 'grey' }}>Badges</Text>
                                            </View>
                                        </CardItem>
                                    </View>

                                </Card>

                            </View>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Text style={{ fontWeight: 'bold' }}>
                                Lingma Dingdong
                            </Text>
                            <Text style={{ fontStyle: 'italic', fontSize: 15 }}>
                                Singapore Institute of Technology
                            </Text>
                            <Text style={{ fontStyle: 'normal', color: '#585858' }}>
                                Year 2 Information and Communications Technology
                                (Information Security)
                            </Text>
                        </View>
                    </View>

                    <View>
                        <Card style={{ marginLeft: 5, marginRight: 5 }}>
                            <CardItem header style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#dee0e2'
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: '700' }}
                                >Journey summary</Text>
                            </CardItem>
                            <CardItem>
                                <View>
                                    <Image source={require("../images/prize2.jpg")}
                                        style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                </View>
                                <Right style={{ alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>
                                        <Text>+ {expValue} EXP</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>

                                        <Text>+ {fpValue} FP</Text>

                                    </View>
                                    <View style={{ flexDirection: 'row', flex: 1 }}>

                                        <Text>+ {kmValue} KM</Text>
                                    </View>

                                </Right>

                            </CardItem>
                        </Card>
                    </View>

                    <View>
                        <Card style={{ marginLeft: 5, marginRight: 5 }}>
                            <CardItem header style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#dee0e2'
                            }}>
                                <Text style={{ fontSize: 20, fontWeight: '700' }}
                                >Badges</Text>
                            </CardItem>

                            <CardItem>
                                <View style={{ flex: 3 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <View>
                                            <Image source={require("../images/prize.png")}
                                                style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                            <Text style={{ alignSelf: 'center' }}>Lvl 10</Text>
                                        </View>
                                        <View>
                                            <Image source={require("../images/prize.png")}
                                                style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                            <Text style={{ alignSelf: 'center' }}>Lvl 20</Text>
                                        </View>
                                        <View>
                                            <Image source={require("../images/prize.png")}
                                                style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                            <Text style={{ alignSelf: 'center' }}>Lvl 30</Text>
                                        </View>
                                    </View>
                                </View>

                            </CardItem>
                        </Card>

                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Feedback', {currPos:currPos, destPos: destPos})}
                        style={{ height: 40, width: 200, backgroundColor: "#024295", alignSelf: "center", marginTop: 20, borderRadius: 25, alignItems: "center", justifyContent: "center", marginTop: 5 }}>
                        <Text style={{ color: "white", fontSize: 20 }}>Proceed to Feedback</Text>
                    </TouchableOpacity>
                </Content>


            </Container>
        );
    }
}

export default FPEXP;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
}
);