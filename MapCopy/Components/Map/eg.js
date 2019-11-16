import React from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import { View, List, ListItem} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

export const SearchResult = function(props) {
    return(
        <View style={styles.searchResultsWrapper}>
            <List>
                <ListItem button avatar>
                    <Left style={styles.leftContainer}>
                        <Icon style={styles.leftIcon} name='location-on'/>
                    </Left>
                <Text>Item 1</Text></ListItem>
                <ListItem><Text>Item 2</Text></ListItem>
            </List>
        </View>

    )
}

const styles = StyleSheet.create({
    searchBox: {
        top: 0,
        position: 'absolute',
        width: width
    },
    inputWrapper: {
        marginLeft:15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: '#fff',
        opacity: 0.9,
        borderRadius:7
    },
    inputSearch: {
        fontSize: 14,
    },
    label: {
        fontSize: 10,
        fontStyle: "italic",
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    }
})
