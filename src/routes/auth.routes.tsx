import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Main from '../pages/Main';
// import {Icon} from '../components';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#ffffff'},
      headerTitle: '',
      headerBackTitleVisible: false,
      headerStyle: {
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: 40,
      },
      headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
    }}>
    <Auth.Screen name="Main" component={Main} />
    <Auth.Screen
      name="SignIn"
      component={SignIn}
      options={{
        headerShown: true,
      }}
    />
    <Auth.Screen
      name="SignUp"
      component={SignUp}
      options={{
        headerShown: true,
      }}
    />
  </Auth.Navigator>
);
export default AuthRoutes;
