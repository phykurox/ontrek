import Feedback from "./screens/feedback"
import FPEXP from "./screens/FPEXP"
import Homepage from "./screens/homepage"
import Rewards from "./screens/rewards"
import Map from "./screens/map"
import Search from "./screens/searchAddress"


import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from "react-navigation"
var app = createStackNavigator({

    Homepage:{
        screen: Homepage,
        navigationOptions: () => ({
            header: null
        })
    },
    
    Rewards:{
        screen: Rewards,
        navigationOptions: () => ({
            header: null
        })
    },

    Map:{
        screen: Map,
        navigationOptions: () => ({
            header: null
        })
    },

    Search:{
        screen: Search,
        navigationOptions: () => ({
            header: null
        })
    },

    FPEXP: {
        screen: FPEXP,
        navigationOptions: () => ({
            header: null
        })

    },

    Feedback: {
        screen: Feedback,
        navigationOptions: () => ({
            header: null
        })

    },
    
})

export default createAppContainer(app);
