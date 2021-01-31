import React from 'react';
import {Image, View} from 'react-native';

import {Container, BoxLogo} from './styles';
import {PrimaryText, SecondaryText} from '../../styles';

import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';

const Main: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <BoxLogo>
        <Image source={logoImg} />
      </BoxLogo>
      <Container>
        <PrimaryText fontSize={20} color="white" alignSelf="flex-start">
          Seja bem-vindo.
        </PrimaryText>
        <SecondaryText fontSize={20} color="white" alignSelf="flex-start">
          O que deseja fazer?
        </SecondaryText>
        <Button
          disabled
          backgroundColor="white"
          textColor={'#000'}
          fontSize={16}
          onPress={() => navigation.navigate('SignIn')}>
          Entrar
        </Button>
        <Button onPress={() => navigation.navigate('SignUp')}>Registrar</Button>
      </Container>
    </>
  );
};

export default Main;
