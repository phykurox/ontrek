import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/pages/Login'
import Forgotpw from './src/pages/Forgotpw'

const RootStack = createStackNavigator({
	Login: {screen: Login},
	Forget: {screen: Forgotpw}
	},

	{ initialRouteName: 'Login', headerMode: 'Login' }
	
	);

const App = createAppContainer(RootStack);

export default App;

