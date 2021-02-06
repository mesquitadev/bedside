import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {NetworkIndicator} from './components';
import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import AppProvider from './hooks';

const App: React.FC = () => {
  useEffect(() => {
    // verificar se o usuário está logado

    SplashScreen.hide();
  }, []);

  return (
    <>
      <NetworkIndicator />
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppProvider>
          <View style={{flex: 1, backgroundColor: '#E8237D'}}>
            <Routes />
          </View>
        </AppProvider>
      </NavigationContainer>
    </>
  );
};

export default App;
