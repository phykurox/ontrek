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
import Header from '../components/header'

import { Left, Right, Icon, Container, Body, Content, Card, CardItem } from 'native-base';




class FPEXP extends Component {


    state = {
        expValue: 0,
        fpValue: 0,
        kmValue: 0,
        totalDistance: 0
    }

    componentDidMount() {
        //const { currentUser } = firebase.auth();
        //console.log('noah user', currentUser);
        //console.log('data from mapview', this.props.navigation.state.params.distanceTravelled)
        this.setState({
            kmValue: this.props.navigation.state.params.distanceTravelled,
            totalDistance: this.props.navigation.state.params.tDist,
            expValue: 3, fpValue: 6
        })
        if (this.state.kmValue < 0.2 * this.state.totalDistance) {
            this.setState({ expValue: 0, fpValue: 0, kmValue: this.props.navigation.state.params.distanceTravelled })

        } else {
            this.setState({
                expValue: this.props.navigation.state.params.distanceTravelled * 100,
                fpValue: this.props.navigation.state.params.distanceTravelled * 10,
                kmValue: this.props.navigation.state.params.distanceTravelled
            })

            this.getFirebase()
        }
    }


    getFirebase = async () => {
        //const userEmail = await AsyncStorage.getItem('email') || 'none';
        //const userPassword = await AsyncStorage.getItem('password') || 'none';
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
            .then((res) => {
                debugger
                firebase.database().ref('users/').push({
                    footprint: this.state.fpValue,
                    exp: this.state.expValue,
                })
            })
            .catch((e) => console.log('error in firebase', e))
        }
        render() {
            const { expValue, fpValue, kmValue } = this.state;
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Feedback')}
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