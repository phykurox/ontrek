import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/pages/Login';
import Forgotpw from './src/pages/Forgotpw';
import Home from './src/pages/Home';
import Loading from  './src/pages/Loading';
import Register from './src/pages/Register';



const RootStack = createStackNavigator({
	Loading: {screen: Loading},
	Register: {screen: Register},
	Login: {screen: Login},
	Forget: {screen: Forgotpw},
	Home: {screen: Home}
	},

	{ initialRouteName: 'Loading', headerMode: 'Loading' }
	
	);

const App = createAppContainer(RootStack);

export default App;

