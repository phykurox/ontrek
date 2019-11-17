import React, {PureComponenet} from 'react';
import {Text, StyleSheet } from 'react-native';
import {View, List, ListItem, Left} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class SearchList extends PureComponenet {
    render(){
        return (
            <View style={styles.resultWrapper}>
                <List>
                    <ListItem button avatar>
                        <Left style={styles.leftContainer}>
                            <Icon style={styles.leftIcon} name='location-on'/>
                        </Left>
                    <Text>List1</Text>
                    </ListItem>
                </List>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    resultWrapper ={
        top: 220,
        position: 'absolute',
        width: width,
        height:1000,
        backgroundColor: '#fff',
        opacity:0.9
    },
    primaryText:{
        fontWeight: 'bold',
        color: '#373737'
    },
    secondaryText: {
        fontStyle: 'italic',
        color:'#7D7D7D'
    },

    leftContainer:{
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderLeftColor: '#7D7D7D'
    },
    leftIcon: {
        fontSize:20,
        color: '#7D7D7D'
    },
    distance: {
        fontSize:12
    }

});