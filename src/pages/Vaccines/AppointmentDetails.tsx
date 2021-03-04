import React, {useRef, useState, useEffect, useCallback, useMemo} from 'react';
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
import {zonedTimeToUtc, utcToZonedTime} from 'date-fns-tz';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBack, setIsBack] = useState(false);
  const [scheduled, setScheduled] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [dependents, setDependents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDependents, setSelectedDependents] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [finalDate, setFinalDate] = useState<Date>('');
  const [ouser1, setOuser1] = useState('');
  const [ouser2, setOuser2] = useState('');
  const [ouser3, setOuser3] = useState('');
  const [ouser4, setOuser4] = useState('');
  const [ouser5, setOuser5] = useState('');
  const minimumDate = useMemo(() => {
    const today = new Date();

    if (today.getHours() >= 17) {
      return new Date(today.setDate(today.getDate() + 1));
    }

    return today;
  }, []);
  const [selectedDate, setSelectedDate] = useState(minimumDate);

  const handleConfirm = (date: Date) => {
    console.log('teste', date);
    setSelectedDate(date);
    console.log('slD', selectedDate);
    hideDatePicker();
  };

  const handleTime = (item) => {
    setSelectedAppointmentTime(item.value);
    console.log('htv', item.value);
  };

  const handleDependents = (item) => {
    console.log('dss', item);
    setSelectedDependents(item);
  };

  useEffect(() => {
    setSelectedDate(selectedDate);
    setSelectedAppointmentTime(selectedAppointmentTime);
    setSelectedDependents(selectedDependents);
    api
      .get(`/app/vaccines/available/${selectedVaccine.id}`, {
        params: {
          date: moment(selectedDate).format('YYYY-MM-DD'),
        },
      })
      .then((response) => {
        setLocale(
          response.data.availableUnity.map((locale) => ({
            label: locale.name,
            value: locale.name,
            address: locale.adress,
          })),
        );

        response.data.availableUnity.map((unity) =>
          setScheduled(unity.availableSchedule),
        );

        setAppointmentTime(
          scheduled.map((unity) => ({
            label: unity.time,
            value: unity.time,
          })),
        );

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
        setDisabled(false);
      });

    const [hour, minute] = selectedAppointmentTime.split(':');
    const value = setSeconds(
      setMinutes(setHours(selectedDate, Number(hour)), Number(minute)),
      0,
    );
    const formatedDate = new Date(
      value.valueOf() - value.getTimezoneOffset() * 60000,
    );
    setFinalDate(formatedDate);
    console.log('fnDt', finalDate);

    setOuser1(selectedDependents[0]);
    setOuser2(selectedDependents[1]);
    setOuser3(selectedDependents[2]);
    setOuser4(selectedDependents[3]);
    setOuser5(selectedDependents[4]);
  }, [selectedDate, selectedAppointmentTime, navigation, selectedDependents]);

  const handleChangeQuantity = (quantity) => {
    if (quantity > 1 && dependents.length) {
      setShowAlert(true);
      setErrorTitle('Erro!');
      setErrorMessage('Você Precisa adicionar os Dependentes');
      setIsBack(false);
    }
    setQuantity(quantity);
  };

  const handleSave = useCallback(() => {
    console.log('dep', selectedDependents);
    // for (let i; i <= 4; i++) {
    //   const ouser = selectedDependents[i];
    //   console.log('ou', ouser);
    // }
    const data = {
      vaccine_id: selectedVaccine.id,
      lab_id: labId,
      quantity: quantity,
      date: finalDate,
      delivery: false,
      unity: {
        name: selectedLocale,
        adress: address,
      },
      ouser1_id: ouser1,
      ouser2_id: ouser2,
      ouser3_id: ouser3,
      ouser4_id: ouser4,
      ouser5_id: ouser5,
    };
    console.log('data', data);
    const response = api
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

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

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
            onPress={showDatePicker}
            style={{borderColor: 'black', borderWidth: 1, height: 40}}
            backgroundColor="transparent"
            disabled>
            {selectedDate
              ? moment(selectedDate, true).format('DD/MM/YYYY')
              : 'Selecionar uma data'}
          </Button>

          <Option
            label="Quantidade"
            // disabled={disabled}
            placeholder={
              disabled ? 'Carregando...' : 'Selecione uma quantidade'
            }
            items={quantities}
            defaultValue={quantity}
            onChangeItem={(item) => handleChangeQuantity(item.value)}
            zIndex={6000}
          />

          {quantity > 1 && (
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
              onChangeItem={handleDependents}
              zIndex={5000}
            />
          )}
          {quantity > 1 && (
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
            onChangeItem={handleTime}
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
};

export default Vaccines;
