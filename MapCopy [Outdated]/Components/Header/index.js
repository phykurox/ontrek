import React from 'react';
import { TouchableOpacity } from "react-native";
import { Header} from 'react-native-elements';
import {Icon} from 'react-native-vector-icons';

export const HeaderComponent =  ()=>{
	return (
		<TouchableOpacity
        style={{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:70,
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10,
        height:70,
        backgroundColor:'#fff',
        borderRadius:100,
        }}
        >
   <Icon type="left-circle" size={30} />
  </TouchableOpacity>
    );
}

export default HeaderComponent;