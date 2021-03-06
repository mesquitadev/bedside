import React, {useRef, useCallback, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
} from 'react-native';
import {PrimaryText, SecondaryText} from '../../styles';
import styled from 'styled-components/native';
import {Button, Input, Alert, InputMask} from '../../components';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useNavigation} from '@react-navigation/native';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import moment from 'moment';
// import { Container } from './styles';

export const Container = styled.View`
  flex: 1;
  background: white;
`;
export const FormContainer = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  height: 80px;
  width: 100%;
  padding: 0px 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const AddDependents: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBack, setIsBack] = useState(false);

  const cpfInputRef = useRef<TextInput>(null);
  const birthdayInputRef = useRef<TextInput>(null);
  interface FormData {
    name: string;
    cpf: string;
    birthday: string;
  }

  const handleSave = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome Obrigatório'),
        cpf: Yup.string().required('CPF Obrigatório'),
        birthday: Yup.string().required('Data de nascimento obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await api
        .post('ousers', {
          name: data.name,
          cpf: data.cpf.replace(/[^0-9]/g, ''),
          birthday: moment(data.birthday, true).format('YYYY-MM-DD'),
        })
        .then(() => {
          setShowAlert(true);
          setErrorTitle('Sucesso!');
          setErrorMessage('Você já pode fazer o login');
          setIsBack(true);
        })
        .catch((error) => {
          setShowAlert(true);
          setErrorTitle('Erro!');
          setErrorMessage(error.response.data.error);
          setIsBack(true);
        });

      return response;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      console.log('erro', err);
      <Alert
        show={showAlert}
        title={errorTitle}
        message={errorMessage}
        onConfirmPressed={() => {
          setShowAlert(false);
          isBack ? navigation.goBack() : null;
        }}
      />;
    }
  }, []);
  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1, marginHorizontal: 10}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <Header>
              <PrimaryText textColor="#40CCB2" alignSelf="center" fontSize={30}>
                Adicionar Dependente
              </PrimaryText>
            </Header>
            <Form ref={formRef} onSubmit={handleSave}>
              <Input
                label="Nome"
                autoCapitalize="words"
                name="name"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cpfInputRef.current?.focus();
                }}
              />

              <InputMask
                label="CPF"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                name="cpf"
                type="cpf"
                returnKeyType="next"
                placeholder="000.000.000-00"
                onSubmitEditing={() => birthdayInputRef.current?.focus()}
              />

              <InputMask
                label="Data de Nascimento"
                keyboardType="numeric"
                autoCorrect={false}
                autoCapitalize="none"
                name="birthday"
                type="datetime"
                options={{
                  format: 'DD/MM/YYYY',
                }}
                placeholder="00/00/0000"
                returnKeyType="next"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button
                backgroundColor="#40CCB2"
                onPress={() => formRef.current?.submitForm()}>
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <Alert
        c
        show={showAlert}
        title={errorTitle}
        message={errorMessage}
        onConfirmPressed={() => {
          setShowAlert(false);
          isBack ? navigation.goBack() : null;
        }}
      />
    </Container>
  );
};

export default AddDependents;
