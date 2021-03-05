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

export const Container = styled.View`
  flex: 1;
  background: white;
`;

export const Header = styled.View`
  height: 80px;
  padding: 20px 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DataContainer = styled.View`
  flex: 1;
  padding: 0 30px;
`;

export const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [user, setUser] = useState([]);

  useEffect(() => {
    api
      .get('users')
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.warn('erro', err.message);
      });
  }, [navigation]);

  return loading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Container>
        <Header>
          <PrimaryText textColor="#40CCB2" alignSelf="flex-start" fontSize={30}>
            Perfil
          </PrimaryText>
        </Header>
        <DataContainer>
          <SecondaryText textColor="black" alignSelf="flex-start" fontSize={20}>
            {user.name}
          </SecondaryText>
          <PrimaryText textColor="black" alignSelf="flex-start">
            {user.email}
          </PrimaryText>
          <PrimaryText textColor="black" alignSelf="flex-start">
            {user.street}, {user.number}, {user.complement} -{' '}
            {user.neighborhood}
          </PrimaryText>
          <PrimaryText textColor="black" alignSelf="flex-start">
            {user.zip} - {user.city}
          </PrimaryText>
        </DataContainer>
      </Container>
    </SafeAreaView>
  );
};

export default Profile;
