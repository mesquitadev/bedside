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
import {setSeconds, setHours, setMinutes} from 'date-fns';
import {zonedTimeToUtc} from 'date-fns-tz';
interface RouteParams {
  labId: string;
  selectedVaccine: Array;
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
export const AppointmentVaccines: React.FC = () => {
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
  const navigation = useNavigation();
  const route = useRoute();
  const params = route.params as RouteParams;
  const [selectedVaccine] = useState<string>(params.selectedVaccine);
  const [labName] = useState<string>(params.labName);
  const [labId] = useState<string>(params.labId);
  const [quantity, setQuantity] = useState('');
  const [locale, setLocale] = useState([]);
  const [selectedLocale, setSelectedLocale] = useState('');
  const [address, setAddress] = useState<string>('');
  const [appointmentTime, setAppointmentTime] = useState([]);
  const [selectedAppointmentTime, setSelectedAppointmentTime] = useState('');
  const [selectedDate, setSelectedDate] = useState<number>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBack, setIsBack] = useState(false);
  const [scheduled, setScheduled] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [dependents, setDependents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDependents, setSelectedDependents] = useState([]);
  useEffect(() => {
    api
      .get(
        `/app/vaccines/available/${selectedVaccine.id}?date=${moment(
          selectedDate,
        ).format('YYYY-MM-DD')}`,
      )
      .then((res) => {
        setLocale(
          res.data.availableUnity.map((locale) => ({
            label: locale.name,
            value: locale.name,
            address: locale.adress,
          })),
        );

        res.data.availableUnity.map((unity) =>
          setScheduled(unity.availableSchedule),
        );

        setAppointmentTime(
          scheduled.map((unity) => ({
            label: unity.time,
            value: unity.time,
          })),
        );
        setLoading(false);
        if (scheduled) {
          setDisabled(false);
        }
      })
      .catch((err) => {
        console.log(err.message);
        setDisabled(true);
      });
    setDisabled(false);

    api
      .get('/ousers')
      .then((res) => {
        setDependents(
          res.data.ousers.map((dep) => ({
            label: dep.name,
            value: dep.id,
          })),
        );
      })
      .catch((err) => console.log(err.message));
  }, [selectedDate]);

  const handleShowCalendar = useCallback(() => {
    setShowCalendar((state) => !state);
  }, []);

  const handleDateChanged = (event, date) => {
    if (Platform.OS === 'android') {
      setShowCalendar(false);
    }
    if (date) {
      console.log('date', date);
      setSelectedDate(date);
      console.log('sDate', selectedDate);
    }
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

  const handleSave = useCallback(async () => {
    console.log('appdate', selectedAppointmentTime);
    console.log('appointmentDate', selectedDate);
    const [hour, minute] = selectedAppointmentTime.split(':');
    const value = setSeconds(
      setMinutes(setHours(selectedDate, Number(hour)), Number(minute)),
      0,
    );
    const znTime = zonedTimeToUtc(value, 'utc');
    console.log('zntdate', znTime);
    console.log('deps', znTime);
    const data = {
      vaccine_id: selectedVaccine.id,
      lab_id: labId,
      quantity: quantity,
      date: znTime,
      delivery: false,
      unity: {
        name: selectedLocale,
        adress: address,
      },
    };
    const response = await api
      .post('app/vaccines/appointments', data)
      .then(() => {
        setShowAlert(true);
        setErrorTitle('Sucesso!');
        setErrorMessage('Agendamento Realizado com Sucesso!');
        setIsBack(true);
      })
      .catch((error) => {
        setShowAlert(true);
        setErrorTitle('Erro!');
        setErrorMessage(error.response.data.error);
        setIsBack(true);
      });

    return response;
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <>
      <ModalContainer>
        <ModalHeader>
          <Avatar source={logoPref} />
          <View style={{padding: 20}}>
            <SecondaryText textColor="black" alignSelf="center" fontSize={20}>
              {labName}
            </SecondaryText>
            <SecondaryText
              style={{
                marginBottom: 20,
              }}
              textColor="black"
              fontSize={20}>
              {selectedVaccine.name}
            </SecondaryText>
          </View>
        </ModalHeader>
        <FormContainer>
          <Button
            onPress={handleShowCalendar}
            style={{borderColor: 'black', borderWidth: 1, height: 40}}
            backgroundColor="transparent"
            disabled>
            {selectedDate
              ? moment(selectedDate, true).format('DD/MM/YYYY')
              : 'Selecionar uma data'}
          </Button>
          {showCalendar && (
            <DateTimePicker
              {...(Platform.OS === 'ios' && {textColor: '#000'})}
              display="calendar"
              is24Hour
              dateFormat="day month year"
              onChange={(event, date) => {
                setSelectedDate(date);
                console.log('sDate', selectedDate);
              }}
              display={Platform.OS === 'android' ? 'calendar' : 'spinner'}
              value={selectedDate ? selectedDate : new Date()}
              minimumDate={new Date()}
            />
          )}

          <Option
            label="Quantidade"
            disabled={disabled}
            placeholder={
              disabled ? 'Carregando...' : 'Selecione uma quantidade'
            }
            items={quantities}
            defaultValue={quantity}
            onChangeItem={(item) => handleChangeQuantity(item.value)}
            zIndex={6000}
          />
          {dependents
            ? null
            : quantity > 1 && (
                <Button
                  onPress={() => navigation.navigate('Dependents')}
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

          {dependents && (
            <Option
              label="Dependentes"
              disabled={disabled}
              multipleText="%d dependentes foram selecionados."
              multiple={true}
              min={0}
              max={5}
              placeholder={
                disabled ? 'Carregando...' : 'Selecione uma quantidade'
              }
              items={dependents}
              defaultValue={quantity}
              onChangeItem={(item) => setSelectedDependents(item.value)}
              zIndex={5000}
            />
          )}

          <Option
            label="Unidade"
            placeholder={disabled ? 'Carregando...' : 'Selecione uma unidade'}
            disabled={disabled}
            items={locale}
            onChangeItem={(item) => {
              setSelectedLocale(item.value);
              setAddress(item.address);
            }}
            zIndex={4000}
          />

          <Option
            label="Horário"
            disabled={disabled}
            placeholder={disabled ? 'Carregando...' : 'Selecione um Horário'}
            items={appointmentTime}
            defaultValue={selectedAppointmentTime}
            onChangeItem={(item) => setSelectedAppointmentTime(item.value)}
            zIndex={2000}
          />
          <Button
            onPress={() => handleSave()}
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
    </>
  );
};

export default Vaccines;
