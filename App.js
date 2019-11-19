import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/pages/Login';
import Forgotpw from './src/pages/Forgotpw';
import Loading from  './src/pages/Loading';
import Register from './src/pages/Register';

import Feedback from "./src/pages/feedback"
import FPEXP from "./src/pages/FPEXP"
import Homepage from "./src/pages/homepage"
import Rewards from "./src/pages/rewards"


const RootStack = createStackNavigator({
	Loading: {screen: Loading},
	Register: {screen: Register},
	Login: {screen: Login},
	Forget: {screen: Forgotpw},

	Homepage: {screen: Homepage},
	Rewards: {screen: Rewards},
	FPEXP: {screen: FPEXP},
	Feedback: {screen: Feedback},

	},

	{ initialRouteName: 'Loading', headerMode: 'Loading' }
	
	);

const App = createAppContainer(RootStack);

export default App;

