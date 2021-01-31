import React from 'react';
import {Image} from 'react-native';
import {PrimaryText} from '../../styles';
import {Container, Avatar, Header, Box} from './styles';
import avatar from '../../assets/profile_pic.png';
import logoBed from '../../assets/logo-bed.png';
import {useAuth} from '../../hooks/auth';
const SuccessAfterSignUp: React.FC = () => {
  const {user} = useAuth();
  return (
    <Container>
      <Image source={logoBed} />
      <Avatar source={avatar} />

      <Header>
        <PrimaryText fontSize={20} textColor="#fff" alignSelf="flex-start">
          Olá {user.name},
        </PrimaryText>
        <PrimaryText fontSize={20} color="#fff" alignSelf="flex-start">
          É um Prazer te ter conosco.
        </PrimaryText>
      </Header>

      <Box>
        <PrimaryText textColor={'#000'}>
          A{' '}
          <PrimaryText fontSize={15} textColor="#04C7AD" alignSelf="flex-start">
            Bedside
          </PrimaryText>{' '}
          é a plataforma feita para valorizar a vida e tornar prático o cuidado
          com a saúde. Com ela você irá poder:
        </PrimaryText>
      </Box>

      <Box backgroundColor="#04C7AD">
        <PrimaryText fontSize={15} textColor="white" alignSelf="center">
          Agendar Vacinas
        </PrimaryText>
        <PrimaryText fontSize={15} textColor="white" alignSelf="center">
          Agendar Consultas
        </PrimaryText>
        <PrimaryText fontSize={15} textColor="white" alignSelf="center">
          Agendar Vacinas
        </PrimaryText>
        <PrimaryText fontSize={15} textColor="white" alignSelf="center">
          Agendar Exames
        </PrimaryText>

        <PrimaryText fontSize={15} textColor="white" alignSelf="center">
          Agendar Testes
        </PrimaryText>
      </Box>

      <Box>
        <PrimaryText textColor={'#000'}>
          Assim que estivermos prontos lhe avisaremos via{' '}
          <PrimaryText fontSize={15} textColor="#e8237d" alignSelf="flex-start">
            notifcação
          </PrimaryText>{' '}
          em seu celular e em seu email.
        </PrimaryText>
      </Box>
    </Container>
  );
};

export default SuccessAfterSignUp;
