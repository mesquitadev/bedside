import React from 'react';
import {View, ActivityIndicator, Text} from 'react-native';
import {SecondaryText} from '../../styles';

const Loading: React.FC = ({visible}) => {
  return (
    <SecondaryText textColor="black" size={100}>
      Carregando...
    </SecondaryText>
  );
};

export default Loading;
