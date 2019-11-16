import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, TouchableOpacity, Image } from 'react-native';
import Header from '../components/header'
import { Rating, AirbnbRating } from 'react-native-ratings'
const { height, width } = Dimensions.get('window')
export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            ratingValue: ''
        };
    }
    Onsubmit() {
        if (this.state.title == '') {
            alert('Please enter title')
        } else if (this.state.comment == '') {
            alert('Please enter comment')
        } else {
            alert(this.state.title + '     ' + this.state.comment)
        }
    }
    ratingCompleted(m) {
        this.setState({ ratingValue: m })
    }
    submitButton(){
        if(this.state.comment == ""){
            alert("Feedback is empty. Please enter your feedback.")
        }else{
            alert("Feedback has been sent successfully")
            this.props.navigation.goBack()
        }
    }
    render() {
        return (
            <View>
                <Header
                    onPress={() => this.props.navigation.goBack()}
                    title='Feedback' backButton={true} />
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 20 }}>

                    <Text style={{ fontSize: 30, color: "#024295" }}>onTrek</Text>
                    <Image style={{ height: 60, width: 60, alignSelf: "center", marginTop: 10 }} source={require("../Images/logo.png")}></Image>
                </View>

                <Text style={{ textAlign: "center", fontSize: 20, marginTop: 30, color: "#024295" }}>How satisified are you with the journey?</Text>
                <Rating
                    showRating
                    onFinishRating={(m) => this.ratingCompleted(m)}
                    style={{ paddingVertical: 10 }}
                />
                <View style={{ backgroundColor: "#e8f4f8", marginHorizontal: 30, marginTop: 30, borderRadius: 10, height: 150 }}>
                    <TextInput
                        placeholder="Leave a comment"
                        value={this.state.comment}
                        onChangeText={(text) => this.setState({ comment: text })}>
                    </TextInput>
                </View>
                <TouchableOpacity style={{ height: 50, width: 200, backgroundColor: "#024295", alignSelf: "center", marginTop: 20, borderRadius: 25, alignItems: "center", justifyContent: "center" }}
                onPress={()=> this.submitButton()}>
                    <Text style={{ color: "white", fontSize:20 }}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
