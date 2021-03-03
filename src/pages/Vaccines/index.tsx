import React, {useRef, useState, useEffect, useCallback} from 'react';
import {View, Platform, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {PrimaryText, SecondaryText} from '../../styles';
import {Modalize} from 'react-native-modalize';
import {Option, Button, Input, Alert, Loading} from '../../components/';
import {Portal} from 'react-native-portalize';
import moment from 'moment';
import {
  Container,
  Card,
  CardVaccines,
  FooterCard,
  CardText,
  PageHeader,
  ModalContainer,
  ModalHeader,
  Avatar,
  FormContainer,
} from './styles';
import logoPref from '../../assets/avatar.png';
import api from './../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import MultiSelect from 'react-native-multiple-select';
import {setSeconds, setHours, setMinutes, parseISO} from 'date-fns';
import {utcToZonedTime} from 'date-fns-tz';
import {defaultFormatUtc} from 'moment-timezone';
interface RouteParams {
  labId: string;
  labName: string;
}
interface Vaccines {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface AppointmentTime {
  label: string;
  value: string;
}

const Vaccines: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const params = route.params as RouteParams;
  const modalRef = useRef(null);
  const [quantities] = useState([
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
  ]);
  const [quantity, setQuantity] = useState('');
  const [selectedLab] = useState<string>(params.labId);
  const [labName] = useState<string>(params.labName);
  const [vaccines, setVaccines] = useState<Vaccines>([]);
  const [locale, setLocale] = useState([]);
  const [localeAddress, setLocaleAddress] = useState('Rua A-13, Qd. 4A, Lt. 4');
  const [selectedLocale, setSelectedLocale] = useState('');
  const [appointmentTime, setAppointmentTime] = useState<AppointmentTime>([]);
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState('');
  const [appointmentDate, setAppointmentDate] = useState<Date>('');
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBack, setIsBack] = useState(false);
  const [loading, setLoading] = useState(true);
  const [scheduled, setScheduled] = useState([]);

  useEffect(() => {
    api.get(`/vaccines/${selectedLab}?page=1&display=20`).then((response) => {
      setVaccines(response.data.vaccines);
      setLoading(false);
    });
  }, []);
  const onOpen = () => {
    modalRef.current?.open();
  };

  const handleSelectedVaccine = useCallback((vaccine) => {
    setSelectedVaccine(vaccine);
    onOpen();
  }, []);
  const handleShowCalendar = useCallback(() => {
    setShowCalendar((state) => !state);
  }, []);

  const handleDateChanged = (event, date) => {
    if (Platform.OS === 'android') {
      setShowCalendar(false);
    }
    if (date) {
      setAppointmentDate(date);
    }
    handleOnChangeDate();
  };

  const handleChangeQuantity = (quantity) => {
    if (quantity > 1) {
      setShowAlert(true);
      setErrorTitle('Erro!');
      setErrorMessage('Você Precisa adicionar os Dependentes');
      setIsBack(false);
    }
    setQuantity(quantity);
  };

  const handleOnChangeDate = async () => {
    try {
      const response = await api.get(
        `/app/vaccines/available/${selectedVaccine.id}?date=${moment(
          appointmentDate,
        ).format('YYYY-MM-DD')}`,
      );
      setLoading(false);
      // console.log('loc', response.data);
      setLocale(
        response.data.availableUnity.map((locale) => ({
          label: locale.name,
          value: locale.name,
        })),
      );
      console.log(
        'locale',
        response.data.availableUnity.map((unity) =>
          setScheduled(unity.availableSchedule),
        ),
      );
      console.log(
        'acd',
        scheduled.map((unity) => unity.time),
      );
      setAppointmentTime(
        scheduled.map((unity) => ({
          label: unity.time,
          value: unity.time,
        })),
      );
    } catch (err) {
      console.log('erro', err.message);
      setLoading(false);
    }
  };

  const handleSave = useCallback(async () => {
    // moment(appointmentDate).tz('America/Sao_Paulo').format('HH:mm');
    console.log('appdate', appointmentDate);
    let dateStr = appointmentDate,
      timeStr = appointmentTime,
      date = moment(dateStr).utc(),
      time = moment(timeStr, 'HH:MM').utc();

    date.set({
      hour: time.get('hour'),
      minute: time.get('minute'),
      second: time.get('second'),
    });

    console.log(
      'min',
      moment(appointmentDate).tz('America/Sao_Paulo').format('HH:mm'),
    );
    const data = {
      vaccine_id: selectedVaccine.id,
      lab_id: selectedLab,
      quantity: quantity,
      date: appointmentDate,
      delivery: false,
      unity: {
        name: selectedLocale,
        adress: localeAddress,
      },
    };
    console.log('ddata', data);
    const response = await api
      .post('app/vaccines/appointments', data)
      .then(() => {
        setShowAlert(true);
        setErrorTitle('Sucesso!');
        setErrorMessage('Você já pode fazer o login');
        // setIsBack(true);
      })
      .catch((error) => {
        setShowAlert(true);
        setErrorTitle('Erro!');
        setErrorMessage(error.response.data.error);
        // setIsBack(true);
      });

    return response;
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <Container>
        <PageHeader>
          <SecondaryText
            textColor="#40CCB2"
            alignSelf="flex-start"
            fontSize={20}>
            Vacinas
          </SecondaryText>
        </PageHeader>
        <CardVaccines>
          {vaccines.map((vaccine) => (
            <Card
              key={vaccine.id}
              onPress={() => handleSelectedVaccine(vaccine)}>
              <CardText>
                <PrimaryText textColor="black">{vaccine.name}</PrimaryText>
              </CardText>
              <FooterCard>
                <SecondaryText>Agendar</SecondaryText>
              </FooterCard>
            </Card>
          ))}
        </CardVaccines>
      </Container>

      {selectedVaccine && (
        <Portal>
          <Modalize
            ref={modalRef}
            handlePosition="inside"
            adjustToContentHeight={true}>
            <ModalContainer>
              <ModalHeader>
                <Avatar source={logoPref} />
                <View style={{padding: 20}}>
                  <SecondaryText
                    textColor="black"
                    alignSelf="center"
                    fontSize={20}>
                    {labName}
                  </SecondaryText>
                </View>
              </ModalHeader>
              <FormContainer>
                <SecondaryText
                  style={{
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  textColor="black"
                  fontSize={20}
                  alignSelf="flex-start">
                  {selectedVaccine.name}
                </SecondaryText>

                <PrimaryText
                  style={{marginBottom: 10, marginTop: 20}}
                  textColor="black"
                  alignSelf="flex-start">
                  Data
                </PrimaryText>
                <Button
                  onPress={handleShowCalendar}
                  style={{borderColor: 'black', borderWidth: 1, height: 40}}
                  backgroundColor="transparent"
                  disabled>
                  {appointmentDate
                    ? moment(appointmentDate, true).format('DD/MM/YYYY')
                    : 'Selecionar uma data'}
                </Button>
                {showCalendar && (
                  <DateTimePicker
                    {...(Platform.OS === 'ios' && {textColor: '#000'})}
                    display="calendar"
                    is24Hour
                    dateFormat="day month year"
                    onChange={handleDateChanged}
                    display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
                    value={appointmentDate ? appointmentDate : new Date()}
                    minimumDate={new Date()}
                  />
                )}

                <PrimaryText
                  style={{marginBottom: 10}}
                  textColor="black"
                  alignSelf="flex-start">
                  Quantidade
                </PrimaryText>
                <Option
                  placeholder="Selecione uma quantidade"
                  items={quantities}
                  defaultValue={quantity}
                  containerStyle={{height: 40}}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={(item) => handleChangeQuantity(item.value)}
                  zIndex={5000}
                />
                {quantity > 1 && (
                  <Button
                    onPress={handleShowCalendar}
                    style={{
                      borderColor: 'black',
                      borderWidth: 1,
                      height: 40,
                      marginTop: 10,
                    }}
                    backgroundColor="transparent"
                    disabled>
                    Adicionar Dependentes
                  </Button>
                )}
                <PrimaryText
                  style={{marginBottom: 10}}
                  textColor="black"
                  alignSelf="flex-start">
                  Unidade
                </PrimaryText>
                <Option
                  placeholder="Selecione uma unidade"
                  items={locale}
                  containerStyle={{height: 40}}
                  defaultValue={selectedLocale}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={(item) => setSelectedLocale(item.value)}
                  zIndex={4000}
                />

                <PrimaryText
                  textColor="black"
                  style={{marginBottom: 10, marginTop: 20}}
                  alignSelf="flex-start">
                  Horário
                </PrimaryText>
                <Option
                  placeholder="Selecione um Horário"
                  items={appointmentTime}
                  defaultValue={selectedAppointmentTime}
                  containerStyle={{height: 40}}
                  style={{backgroundColor: '#fafafa'}}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{backgroundColor: '#fafafa'}}
                  onChangeItem={(item) =>
                    setSelectedAppointmentTime(item.value)
                  }
                  zIndex={2000}
                />
                <Button
                  onPress={handleSave}
                  style={{marginTop: 30, marginBottom: 50}}
                  backgroundColor="#40CCB2">
                  Adicionar
                </Button>
              </FormContainer>
            </ModalContainer>
            <Alert
              show={showAlert}
              title={errorTitle}
              message={errorMessage}
              onConfirmPressed={() => {
                setShowAlert(false);
                isBack ? navigation.goBack() : null;
              }}
            />
          </Modalize>
        </Portal>
      )}
    </>
  );
};

export default Vaccines;
