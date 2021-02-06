import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FeatherIcon from 'react-native-vector-icons/Feather';
import SuccessAfterSignUp from '../pages/SuccessAfterSignUp';

const Auth = createStackNavigator();

const AppRoutes: React.FC = () => (
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
    <Auth.Screen
      name="SuccessAfterSignUp"
      component={SuccessAfterSignUp}
      options={{
        headerShown: true,
      }}
    />
  </Auth.Navigator>
);
export default AppRoutes;
