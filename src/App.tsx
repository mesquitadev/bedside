import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NetworkIndicator} from './components';
import Routes from './routes';
import {MainContainer} from '../src/styles';
import {NavigationContainer} from '@react-navigation/native';
import codePush from 'react-native-code-push';
import {Host} from 'react-native-portalize';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <>
      <NetworkIndicator />
      <NavigationContainer>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <AppProvider>
          <Host>
            <MainContainer>
              <Routes />
            </MainContainer>
          </Host>
        </AppProvider>
      </NavigationContainer>
    </>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
