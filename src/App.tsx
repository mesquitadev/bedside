import 'react-native-gesture-handler';
import React from 'react';
import {View, Text, StatusBar} from 'react-native';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#40CCB2" />
      <View style={{flex: 1, backgroundColor: '#40CCB2'}}>
        <Text>Template Inicial</Text>
      </View>
    </>
  );
};

export default App;
