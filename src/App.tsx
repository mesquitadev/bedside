import 'react-native-gesture-handler';
import React from 'react';
import {View, StatusBar} from 'react-native';

import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#40CCB2" />
      <View style={{flex: 1, backgroundColor: '#40CCB2'}}>
        <Routes />
      </View>
    </NavigationContainer>
  );
};

export default App;
