import React, {useEffect, useState, useCallback, useRef} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {SecondaryText, PrimaryText} from '../../styles';
import {
  MainContainer,
  ListContainer,
  ListHeader,
  ItemContainer,
  ModalHeader,
  ContainerModal,
  DataContainer,
  HeaderContainer,
  Avatar,
  Item,
  InfoContainer,
} from './publicTab.styles';
import {Modalize} from 'react-native-modalize';
import {Loading} from '../../components/';
import avatar from '../../assets/avatar.png';
import {Portal} from 'react-native-portalize';
import moment from 'moment';
import api from '../../services/api';
const PublicTab: React.FC = () => {
  const modalRef = useRef<Modalize>(null);
  const [selectedAppointment, setSelectedAppointment] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    api
      .get('app/vaccines/appointments?page=1')
      .then((response) => {
        setAppointments(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [appointments]);

  const onOpen = () => {
    modalRef.current?.open();
  };

  const handleSelectedVaccine = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
    onOpen();
  };

  return (
    <>
      {loading ? (
        <Loading visible={loading} />
      ) : (
        <>
          <MainContainer>
            <ListHeader>
              <SecondaryText textColor="black">Clínica</SecondaryText>
              <SecondaryText textColor="black">Produto</SecondaryText>
              <SecondaryText textColor="black">Data</SecondaryText>
            </ListHeader>
            {appointments.map((appointment) => (
              <ListContainer
                key={appointment.id}
                onPress={() => handleSelectedVaccine(appointment)}>
                <ItemContainer>
                  <PrimaryText
                    size={14}
                    textColor="black"
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {appointment.lab.name}
                  </PrimaryText>
                  <PrimaryText
                    size={12}
                    alignSelf="flex-start"
                    textColor="#E8237D">
                    Clinica
                  </PrimaryText>
                </ItemContainer>
                <ItemContainer>
                  <PrimaryText
                    size={14}
                    textColor="black"
                    alignSelf="flex-start">
                    Vacina
                  </PrimaryText>
                  <PrimaryText
                    size={14}
                    alignSelf="flex-start"
                    textColor="#04C7AD"
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {appointment.lab.name}
                  </PrimaryText>
                </ItemContainer>
                <ItemContainer>
                  <PrimaryText
                    size={14}
                    textColor="black"
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {moment(appointment.date).format('DD/MM/YYYY')}
                  </PrimaryText>
                  <PrimaryText
                    size={12}
                    textColor="black"
                    ellipsizeMode="tail"
                    numberOfLines={1}>
                    {moment(appointment.date).utc().format('HH:mm')}
                  </PrimaryText>
                </ItemContainer>
              </ListContainer>
            ))}
          </MainContainer>

          {showModal && (
            <Portal>
              <Modalize
                ref={modalRef}
                handlePosition="inside"
                adjustToContentHeight>
                <ContainerModal>
                  <ModalHeader>
                    <SecondaryText
                      style={{width: 150}}
                      textColor="#E8237D"
                      fontSize={20}
                      ellipsizeMode="tail"
                      numberOfLines={1}>
                      ID: #{selectedAppointment.id}
                    </SecondaryText>
                  </ModalHeader>
                  <HeaderContainer>
                    <SecondaryText
                      textColor="#40CCB2"
                      alignSelf="flex-start"
                      fontSize={20}>
                      Laboratório:
                    </SecondaryText>
                  </HeaderContainer>
                  <DataContainer>
                    <Avatar source={avatar} />
                    <InfoContainer style={{flexDirection: 'column'}}>
                      <Item>
                        <PrimaryText
                          textColor="black"
                          alignSelf="flex-start"
                          fontSize={20}>
                          Nome:
                        </PrimaryText>
                        <SecondaryText
                          textColor="black"
                          alignSelf="flex-start"
                          fontSize={20}>
                          {selectedAppointment.lab.name}
                        </SecondaryText>
                      </Item>
                      <Item>
                        <PrimaryText
                          textColor="#9FA2B4"
                          alignSelf="flex-start"
                          fontSize={20}>
                          Telefone:
                        </PrimaryText>
                        <SecondaryText
                          textColor="black"
                          alignSelf="flex-start"
                          fontSize={20}>
                          {selectedAppointment.lab.phone}
                        </SecondaryText>
                      </Item>
                    </InfoContainer>
                  </DataContainer>
                  <HeaderContainer>
                    <SecondaryText
                      textColor="#40CCB2"
                      alignSelf="flex-start"
                      fontSize={20}>
                      Informações
                    </SecondaryText>
                  </HeaderContainer>
                  <DataContainer>
                    <InfoContainer>
                      <Item>
                        <PrimaryText
                          textColor="#9FA2B4"
                          alignSelf="flex-start"
                          fontSize={15}>
                          Data:
                        </PrimaryText>
                        <SecondaryText
                          textColor="black"
                          alignSelf="flex-start"
                          fontSize={20}>
                          {moment(selectedAppointment.date)
                            .utc()
                            .format('DD/MM/YYYY')}
                        </SecondaryText>
                      </Item>
                      <Item>
                        <PrimaryText
                          textColor="#9FA2B4"
                          alignSelf="flex-start"
                          fontSize={15}>
                          Horário:
                        </PrimaryText>
                        <SecondaryText
                          textColor="black"
                          alignSelf="flex-start"
                          fontSize={20}>
                          {moment(selectedAppointment.date)
                            .utc()
                            .format('HH:MM')}
                        </SecondaryText>
                      </Item>

                      <Item>
                        <PrimaryText
                          textColor="#9FA2B4"
                          alignSelf="flex-start"
                          fontSize={15}>
                          Unidade:
                        </PrimaryText>
                        <SecondaryText
                          textColor="black"
                          alignSelf="flex-start"
                          fontSize={20}>
                          {selectedAppointment.unity}
                        </SecondaryText>
                      </Item>
                      <Item>
                        <PrimaryText
                          textColor="#9FA2B4"
                          alignSelf="flex-start"
                          fontSize={15}>
                          Endereço:
                        </PrimaryText>
                        <SecondaryText
                          textColor="black"
                          alignSelf="flex-start"
                          fontSize={20}>
                          {selectedAppointment.adress}
                        </SecondaryText>
                      </Item>
                    </InfoContainer>
                  </DataContainer>
                  <HeaderContainer>
                    <SecondaryText
                      textColor="#40CCB2"
                      alignSelf="flex-start"
                      fontSize={20}>
                      Produto:
                    </SecondaryText>
                  </HeaderContainer>
                  <DataContainer>
                    <InfoContainer>
                      <Item>
                        <PrimaryText
                          textColor="#9FA2B4"
                          alignSelf="flex-start"
                          fontSize={15}>
                          Vacina:
                        </PrimaryText>
                        <SecondaryText
                          textColor="black"
                          alignSelf="flex-start"
                          fontSize={20}>
                          {selectedAppointment.vaccine.name}
                        </SecondaryText>
                      </Item>
                    </InfoContainer>
                  </DataContainer>
                </ContainerModal>
              </Modalize>
            </Portal>
          )}
        </>
      )}
    </>
  );
};
export default PublicTab;
