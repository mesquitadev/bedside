import React from 'react';
import {Image} from 'react-native';

import {
  Container,
  BoxLogo,
  ContainerData,
  ContainerText,
  ContainerButtons,
  LightTitle,
  BoldTitle,
} from './styles';

import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <>
      <Container>
        <BoxLogo>
          <Image source={logoImg} />
        </BoxLogo>
        <ContainerData>
          <ContainerText>
            <LightTitle>Seja bem-vindo.</LightTitle>
            <BoldTitle>O que deseja fazer?</BoldTitle>
          </ContainerText>
        </ContainerData>
        <ContainerButtons>
          <Button disabled>Entrar</Button>
          <Button>Registrar</Button>
        </ContainerButtons>
      </Container>
    </>
  );
};

export default SignIn;
