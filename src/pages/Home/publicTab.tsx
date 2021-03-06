import React, {useEffect, useState, useCallback} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import VacinaIcon from '../../assets/vacinas.png';
import ExamesIcon from '../../assets/exames.png';
import TestesIcon from '../../assets/testes.png';
import LogoPref from '../../assets/bg-pref.png';
import avatar from '../../assets/avatar.png';
import {SecondaryText, PrimaryText} from '../../styles';
import {
  MainContainer,
  Capa,
  InfoContainer,
  Avatar,
  Avatar2,
  ServicesContainer,
  WarningsContainer,
} from './publicTab.styles';
import {Alert} from '../../components';
const PublicTab: React.FC = ({labs}: object) => {
  const navigation = useNavigation();

  const handleSelectLab = useCallback(
    (labId: string, labName: string) => {
      navigation.navigate('Vaccines', {labId, labName});
    },
    [navigation],
  );

  return (
    <MainContainer>
      <Capa
        source={{
          uri: labs.publicLabs[0].banner.url
            ? labs.publicLabs[0].banner.url
            : LogoPref,
        }}
      />
      <InfoContainer>
        <View>
          <SecondaryText fontSize={20} alignSelf="flex-start" textColor="black">
            {labs.publicLabs[0].name}
          </SecondaryText>
          <PrimaryText fontSize={11} alignSelf="flex-start" textColor="black">
            Vacinas
          </PrimaryText>
        </View>
        <Avatar
          source={{
            uri: labs.publicLabs[0].logo.url
              ? labs.publicLabs[0].logo.url
              : avatar,
          }}
        />
      </InfoContainer>
      <SecondaryText fontSize={15} alignSelf="flex-start" textColor="#40CCB2">
        SERVIÇOS
      </SecondaryText>
      <ServicesContainer>
        <TouchableOpacity
          onPress={() =>
            handleSelectLab(labs.publicLabs[0].id, labs.publicLabs[0].name)
          }>
          <Avatar2 source={VacinaIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Avatar2 source={ExamesIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Avatar2 source={TestesIcon} />
        </TouchableOpacity>
      </ServicesContainer>

      <SecondaryText fontSize={15} alignSelf="flex-start" textColor="#40CCB2">
        Avisos
      </SecondaryText>
      <WarningsContainer>
        <SecondaryText fontSize={15} alignSelf="flex-start" textColor="black">
          Calendário
        </SecondaryText>
        <PrimaryText
          textColor="black"
          style={{
            textAlignVertical: 'center',
            textAlign: 'center',
          }}>
          Quarta-feira (10) – Idosos a partir de 85 anos com iniciais de A a I
          Quinta-feira (11) - Idosos a partir de 85 anos com iniciais de J a M
          Sexta-feira (12) - Idosos a partir de 85 anos com iniciais de N a Z
        </PrimaryText>
      </WarningsContainer>
    </MainContainer>
  );
};

export default PublicTab;
