import React from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import { View, InputGroup, Input} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SearchList from './SearchList';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const width = Dimensions.get('window').width;

export const SearchBox = function(props) {
    return(
        <View style={styles.searchBox}>
            <GooglePlacesAutocomplete
                apiKey= 'AIzaSyDHaqg2Tvt576tcEp-e26Kaa_2Xk_b1m9A'
                debounce={300}
                minLength={3} // minimum length of text to search
                autoFocus={false}>
                    {({handleTextChange,locationResults}) => (
                        <React.Fragment>
                            {console.log(
                                'locReslt', locationResults
                            )}
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Start</Text>
                                <InputGroup>
                                    <Icon name='search' size={15} color='#FF5E3A'/>
                                    <Input style={styles.inputSearch} placeholder='Choose start location'/>
                                </InputGroup>
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.label}>Destination</Text>
                                <InputGroup>
                                    <Icon name='search' size={15} color='#FF5E3A'/>
                                    <Input style={styles.inputSearch} placeholder='Choose destination location' onChangeText={handleTextChange}/>
                                </InputGroup>
                            </View>
                        </React.Fragment>
                    )}
                
            </GooglePlacesAutocomplete>
        </View>

    )
}

const styles = StyleSheet.create({
    searchBox: {
        top: 50,
        position: 'absolute',
        width: width,
        zIndex: 5,
        elevation: 7,
    },
    inputWrapper: {
        marginLeft:15,
        marginRight: 10,
        marginTop: 5,
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