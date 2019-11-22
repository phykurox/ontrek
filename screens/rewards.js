import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    Image
} from "react-native";
import { Left, Right, Icon, Container, Item, Input, Content, Card, CardItem, Button } from 'native-base';
import Header from '../components/header'


export default class Rewards extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <Container style={styles.container}>
                 <Header
                        onPress={() => this.props.navigation.goBack()}
                        title='Footprint and Exp' backButton={true} />
                <View style={{
                    position: 'absolute', left: 0, right: 0
                    , top: 55, height: 70, backgroundColor: '#3a455c',
                    flexDirection: 'row', alignItems: 'center',
                    paddingHorizontal: 5
                }}>

                    <TouchableOpacity>
                        <View style={{
                            width: 100, backgroundColor: '#e7e7eb',
                            height: 50, borderRadius: 4, padding: 10
                        }}>
                            <Text style={{ fontSize: 12 }}>
                                Sort by
                        </Text>
                            <Text style={{ fontWeight: 'bold' }}>
                                Categories
                        </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ flex: 1, height: "100%", marginLeft: 5, paddingTop: 10 }}>
                        <Item style={{
                            backgroundColor: "white", paddingHorizontal: 10,
                            borderRadius: 4
                        }}>
                            <Icon name='search' style={{ fontSize: 20, paddingTop: 5 }} />
                            <Input placeholder="Search" />
                        </Item>
                    </View>
                </View>

                <Content style={{ backgroundColor: '#d5d5d6', marginTop: 70 }}>
                    <View style={{
                        height: 50, backgroundColor: '#e7e7eb',
                        flexDirection: 'row', paddingHorizontal: 5, alignItems: 'center'
                    }}>
                        <Text>Footprints: </Text>
                        <View style={{ flex: 1, backgroundColor: 'white' }}>
                            <Text>5000</Text>
                        </View>

                    </View>

                    <Card style={{ marginLeft: 5, marginRight: 5 }}>
                        <CardItem header style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#dee0e2'
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 20 }}>Available Vouchers</Text>
                        </CardItem>

                        <CardItem>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require("../images/giftvoucher.png")}
                                        style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                </View>
                                <Right style={{ alignItems: 'flex-start', flex: 3 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                        15% discount code</Text>
                                    <Text style={{ fontStyle: 'italic', color: 'grey' }}>
                                        Gong Cha</Text>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                        20 Footprints</Text>
                                </Right>
                            </View>
                        </CardItem>

                        <CardItem>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require("../images/giftvoucher.png")}
                                        style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                </View>
                                <Right style={{ alignItems: 'flex-start', flex: 3 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                        5% discount code</Text>
                                    <Text style={{ fontStyle: 'italic', color: 'grey' }}>
                                        KFC</Text>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                        10 Footprints</Text>
                                </Right>
                            </View>
                        </CardItem>

                        <CardItem>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require("../images/giftvoucher.png")}
                                        style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                </View>
                                <Right style={{ alignItems: 'flex-start', flex: 3 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                        10% discount code</Text>
                                    <Text style={{ fontStyle: 'italic', color: 'grey' }}>
                                        Carl's jr</Text>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                        10 Footprints</Text>
                                </Right>
                            </View>
                        </CardItem>

                        <CardItem>
                            <View style={{ flexDirection: "row" }}>
                                <View style={{ flex: 1 }}>
                                    <Image source={require("../images/giftvoucher.png")}
                                        style={{ width: 75, height: 75, borderRadius: 37.5 }} />
                                </View>
                                <Right style={{ alignItems: 'flex-start', flex: 3 }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                        20% discount code</Text>
                                    <Text style={{ fontStyle: 'italic', color: 'grey' }}>
                                        4 Fingers</Text>
                                    <Text style={{ color: 'red', fontWeight: 'bold' }}>
                                        25 Footprints</Text>
                                </Right>
                            </View>
                        </CardItem>

                    </Card>

                </Content>
            </Container>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    androidHeader: {
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            }
        })
    }

});