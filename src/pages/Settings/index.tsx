import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '../../styles';
import {Option, Button, Input, Alert, Loading} from '../../components/';
import styled from 'styled-components/native';
// import {Container} from './styles';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../services/api';
import {useAuth} from '../../hooks/auth';

export const Container = styled.ScrollView`
  flex: 1;
  background: #f9fafb;
`;

export const Header = styled.View`
  height: 80px;
  padding: 20px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const List = styled(FlatList)``;

export const ListItem = styled.TouchableOpacity`
  justify-content: center;
  height: 50px;
  flex: 1;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 2px;
  padding: 0px 10px;
`;

export const IconButton = styled.View`
  justify-content: center;
  align-items: center;
  background: #e8237d;
  border-radius: 50px;
  width: 50px;
  height: 50px;
`;

export const Body = styled.View`
  padding: 10px 30px;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Card = styled.TouchableOpacity`
  background: #ffffff;
  width: 160px;
  height: 160px;
  margin: 10px 0;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Settings: React.FC = () => {
  const {signOut} = useAuth();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [dependents, setDependents] = useState([]);

  useEffect(() => {
    api.get('/ousers').then((res) => {
      setDependents(res.data.ousers);
    });
  }, [navigation]);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Container>
        <Header>
          <PrimaryText textColor="#40CCB2" alignSelf="flex-start" fontSize={30}>
            Configurações
          </PrimaryText>
        </Header>
        <Body>
          <Card
            onPress={() => navigation.navigate('Dependents')}
            style={{
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.2,
              shadowRadius: 5,
            }}>
            <IconButton name="plus" size={20}>
              <Icon name="users" size={20} color="#ffff" />
            </IconButton>
            <PrimaryText
              textColor="black"
              alignSelf="center"
              fontSize={14}
              style={{
                marginTop: 10,
              }}>
              Dependentes
            </PrimaryText>
          </Card>
          <Card
            onPress={() => navigation.navigate('Profile')}
            style={{
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.2,
              shadowRadius: 5,
            }}>
            <IconButton name="plus" size={20}>
              <Icon name="user" size={20} color="#ffff" />
            </IconButton>
            <PrimaryText
              textColor="black"
              alignSelf="center"
              fontSize={14}
              style={{
                marginTop: 10,
              }}>
              Perfil
            </PrimaryText>
          </Card>
          <Card
            onPress={() => signOut()}
            style={{
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 3},
              shadowOpacity: 0.2,
              shadowRadius: 5,
            }}>
            <IconButton name="plus" size={20}>
              <Icon name="log-out" size={20} color="#ffff" />
            </IconButton>
            <PrimaryText
              textColor="black"
              alignSelf="center"
              fontSize={14}
              style={{
                marginTop: 10,
              }}>
              Sair do Aplicativo
            </PrimaryText>
          </Card>
        </Body>
      </Container>
    </SafeAreaView>
  );
};

export default Settings;
