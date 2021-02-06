import React from 'react';
import {Image} from 'react-native';
import {PrimaryText} from '../../styles';
import Icon from 'react-native-vector-icons/Feather';
import {
  Container,
  Avatar,
  Header,
  Box,
  LogoutButton,
  LogoutButtonText,
  List,
} from './styles';
import avatar from '../../assets/profile_pic.png';
import logoBed from '../../assets/logo-bed.png';
import {useAuth} from '../../hooks/auth';
const SuccessAfterSignUp: React.FC = () => {
  const {user, signOut} = useAuth();
  return (
    <>
      <Container>
        <Image source={logoBed} />
        <Avatar source={avatar} />

        <Header>
          <PrimaryText fontSize={20} textColor="#fff" alignSelf="flex-start">
            Olá {user.name},
          </PrimaryText>
          <PrimaryText fontSize={20} color="#fff" alignSelf="flex-start">
            É um prazer te ter conosco.
          </PrimaryText>
        </Header>

        <Box>
          <PrimaryText textColor={'#000'}>
            A{' '}
            <PrimaryText
              fontSize={15}
              textColor="#04C7AD"
              alignSelf="flex-start">
              Bedside
            </PrimaryText>{' '}
            é a plataforma feita para valorizar a vida e tornar prático o
            cuidado com a saúde. Com ela você irá poder:
          </PrimaryText>
        </Box>

        <Box backgroundColor="#04C7AD">
          <List>
            <Icon
              name="check"
              size={30}
              color="white"
              style={{marginRight: 20}}
            />
            <PrimaryText fontSize={15} textColor="white" alignSelf="center">
              Agendar Vacinas
            </PrimaryText>
          </List>
          <List>
            <Icon
              name="check"
              size={30}
              color="white"
              style={{marginRight: 20}}
            />
            <PrimaryText fontSize={15} textColor="white" alignSelf="center">
              Agendar Consultas
            </PrimaryText>
          </List>
          <List>
            <Icon
              name="check"
              size={30}
              color="white"
              style={{marginRight: 20}}
            />
            <PrimaryText fontSize={15} textColor="white" alignSelf="center">
              Agendar Exames
            </PrimaryText>
          </List>
          <List>
            <Icon
              name="check"
              size={30}
              color="white"
              style={{marginRight: 20}}
            />
            <PrimaryText fontSize={15} textColor="white" alignSelf="center">
              Agendar Testes
            </PrimaryText>
          </List>
        </Box>

        <Box>
          <PrimaryText textColor={'#000'}>
            Assim que estivermos prontos lhe avisaremos via{' '}
            <PrimaryText
              fontSize={15}
              textColor="#e8237d"
              alignSelf="flex-start">
              notifcação
            </PrimaryText>{' '}
            em seu celular e em seu email.
          </PrimaryText>
        </Box>

        <LogoutButton onPress={() => signOut()}>
          <Icon name="log-out" size={20} color="white" />
          <LogoutButtonText>Sair</LogoutButtonText>
        </LogoutButton>
      </Container>
    </>
  );
};

export default SuccessAfterSignUp;
