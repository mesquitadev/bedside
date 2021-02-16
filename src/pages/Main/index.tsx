import React from 'react';
import {Image, Text} from 'react-native';

import {
  Container,
  ContainerLogo,
  ContainerText,
  ContainerButtons,
} from './styles';
import {PrimaryText, SecondaryText} from '../../styles';

import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';
import {useNavigation} from '@react-navigation/native';

const Main: React.FC = () => {
  const navigation = useNavigation();
  return (
    <>
      <Container>
        <ContainerLogo>
          <Image source={logoImg} />
        </ContainerLogo>
        <ContainerButtons>
          <ContainerText>
            <PrimaryText fontSize={20} color="white" alignSelf="flex-start">
              Seja bem-vindo.
            </PrimaryText>
            <SecondaryText fontSize={20} color="white" alignSelf="flex-start">
              O que deseja fazer?
            </SecondaryText>
          </ContainerText>
          <Button
            disabled
            backgroundColor="white"
            textColor={'#000'}
            fontSize={16}
            onPress={() => navigation.navigate('SignIn')}>
            Entrar
          </Button>
          <Button onPress={() => navigation.navigate('SignUp')}>
            Registrar
          </Button>
          <PrimaryText fontSize={15} color="white" alignSelf="center">
            Versao: 1.0.0
          </PrimaryText>
        </ContainerButtons>
      </Container>
    </>
  );
};

export default Main;
