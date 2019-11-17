import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import MapViewScreen from "./screens/MapView";

const AppFlow = createStackNavigator({
    MapViewScreen: MapViewScreen
});

const MapDemo = createStackNavigator(
    {
        Main: {
            screen: AppFlow
        }
    },
    {
        mode: "modal",
        headerMode: "none"
    }
);

export default createAppContainer(MapDemo);
