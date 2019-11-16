import Feedback from "./screens/feedback"
import Fpexp from "./screens/fp_exp"
import Homepage from "./screens/homepage"
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from "react-navigation"
var app = createStackNavigator({

    Homepage:{
        screen: Homepage,
        navigationOptions: () => ({
            header: null
        })
    },
    Fpexp: {
        screen: Fpexp,
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
