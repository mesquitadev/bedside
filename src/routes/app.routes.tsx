import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import SuccessAfterSignUp from '../pages/SuccessAfterSignUp';
import bedLogo from '../assets/logo-bed.png';
import {Logo} from '../components/Header/styles';

import Vaccines from '../pages/Vaccines';
import Appointments from '../pages/Appointments';
import Home from '../pages/Home';
import Icon from 'react-native-vector-icons/Feather';
import {AppointmentVaccines} from '../pages/Vaccines/AppointmentDetails';
import Dependents from '../pages/Dependents';
import AddDependents from '../pages/Dependents/AddDependent';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeRoutes: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Initial"
      options={{headerShown: false}}
      component={Home}
    />
    <Stack.Screen
      name="Vaccines"
      component={Vaccines}
      options={{
        headerTitle: () => <Logo source={bedLogo} />,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 90,
        },
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerBackImage: () => (
          <Icon name="chevron-left" size={24} color={'#000'} />
        ),
      }}
    />
    <Stack.Screen
      name="VaccineAppointment"
      component={AppointmentVaccines}
      options={{
        headerTitle: () => <Logo source={bedLogo} />,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 90,
        },
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerBackImage: () => (
          <Icon name="chevron-left" size={24} color={'#000'} />
        ),
      }}
    />
    <Stack.Screen
      name="Dependents"
      component={Dependents}
      options={{
        headerTitle: () => <Logo source={bedLogo} />,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 90,
        },
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerBackImage: () => (
          <Icon name="chevron-left" size={24} color={'#000'} />
        ),
      }}
    />

    <Stack.Screen
      name="AddDependent"
      component={AddDependents}
      options={{
        headerTitle: () => <Logo source={bedLogo} />,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 90,
        },
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerBackImage: () => (
          <Icon name="chevron-left" size={24} color={'#000'} />
        ),
      }}
    />
  </Stack.Navigator>
);

const AppointmentRoutes: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Appointments"
      component={Appointments}
      options={{
        headerTitle: () => <Logo source={bedLogo} />,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: 'white',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: 90,
        },
        headerLeftContainerStyle: {
          marginLeft: 15,
        },
        headerBackImage: () => (
          <Icon name="chevron-left" size={24} color={'#000'} />
        ),
      }}
    />
  </Stack.Navigator>
);

const AppRoutes: React.FC = () => (
  <BottomTab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Search':
            iconName = 'search';
            break;
          case 'Appointments':
            iconName = 'list';
            break;
          case 'Settings':
            iconName = 'settings';
            break;
          default:
            iconName = 'search';
            break;
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: '#40CCB2',
      inactiveTintColor: '#777',
      showLabel: false,
    }}>
    <BottomTab.Screen name="Home" component={HomeRoutes} />
    <BottomTab.Screen name="Search" component={SuccessAfterSignUp} />
    <BottomTab.Screen name="Appointments" component={AppointmentRoutes} />
    <BottomTab.Screen name="Settings" component={SuccessAfterSignUp} />
  </BottomTab.Navigator>
);
export default AppRoutes;
