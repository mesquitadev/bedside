import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import {NetworkIndicator} from './components';
import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';
import codePush from 'react-native-code-push';
import AppProvider from './hooks';

const App: React.FC = () => {
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

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
