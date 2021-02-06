import React, {useState, useEffect, useRef} from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useNetInfo} from '@react-native-community/netinfo';
import {PrimaryText} from '../../styles';
import {Container} from './styles';
import * as Animatable from 'react-native-animatable';

const NetworkIndicator: React.FC = () => {
  const netInfo = useNetInfo();
  const [messageConnection, setMessageConnection] = useState('Connected');
  const [icon, setIcon] = useState('wifi');
  const [backgroundColor, setBackgroundColor] = useState(true);
  const component = useRef(null);

  useEffect(() => {
    if (netInfo.isConnected) {
      setMessageConnection('Conectado!');
      setIcon('wifi');
      setBackgroundColor('#3846D4');
      component.current.fadeOutUp(4000);
    } else {
      component.current.slideInDown();
      setMessageConnection('Desconectado!');
      setBackgroundColor('#B6470D');
      setIcon('wifi-off');
    }
  }, [netInfo]);

  return (
    <Animatable.View ref={component}>
      <Container>
        <Icon name={icon} size={30} color="white" />
        <PrimaryText>{messageConnection}</PrimaryText>
      </Container>
    </Animatable.View>
  );
};

export default NetworkIndicator;
