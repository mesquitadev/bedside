import React, {useState, useRef} from 'react';
import {Image, TouchableOpacity, Text} from 'react-native';
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
import {Modal} from '../../components';
import avatar from '../../assets/profile_pic.png';
import logoBed from '../../assets/logo-bed.png';
import {useAuth} from '../../hooks/auth';
import {Modalize} from 'react-native-modalize';
import DropDownPicker from 'react-native-dropdown-picker';
const SuccessAfterSignUp: React.FC = () => {
  const {user, signOut} = useAuth();
  const [modal, setModal] = useState(false);

  const modalRef = useRef(null);

  const onOpen = () => {
    modalRef.current?.open();
  };
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
          <TouchableOpacity onPress={() => onOpen()}>
            <Text>Open Modal</Text>
          </TouchableOpacity>
        </Box>

        {/* <Box>
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
        </Box> */}

        {/* <LogoutButton onPress={() => signOut()}>
          <Icon name="log-out" size={20} color="white" />
          <LogoutButtonText>Sair</LogoutButtonText>
        </LogoutButton> */}
      </Container>
      <Modalize ref={modalRef} snapPoint={500}>
        <Text
          style={{
            flex: 1,
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <DropDownPicker
            items={[
              {
                label: 'UK',
                value: 'uk',
                icon: () => <Icon name="flag" size={18} color="#900" />,
              },
              {
                label: 'France',
                value: 'france',
                icon: () => <Icon name="flag" size={18} color="#900" />,
              },
            ]}
            containerStyle={{height: 40, width: 200}}
            style={{backgroundColor: '#fafafa'}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            dropDownStyle={{backgroundColor: '#fafafa'}}
          />
        </Text>
      </Modalize>
    </>
  );
};

export default SuccessAfterSignUp;
