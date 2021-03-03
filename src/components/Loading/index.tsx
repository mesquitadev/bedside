import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import {SecondaryText} from '../../styles';

const Loading: React.FC = ({visible}) => {
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgba(255,255,255,0.75)"
      source={require('./loading.json')}
      animationStyle={{
        width: 300,
        height: 500,
      }}
      speed={1}>
      <SecondaryText textColor="black" size={100}>
        Carregando...
      </SecondaryText>
    </AnimatedLoader>
  );
};

export default Loading;
