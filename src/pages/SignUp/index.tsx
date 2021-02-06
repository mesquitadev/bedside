import React, {useRef, useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
} from 'react-native';
import moment from 'moment';

import {PrimaryText, SecondaryText} from '../../styles';
import {Button, Input, Modal, InputMask} from '../../components';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import {useNavigation} from '@react-navigation/native';
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBack, setIsBack] = useState(false);

  const nameInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);
  const birthdayInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  interface FormData {
    name: string;
    cpf: string;
    birthday: string;
    email: string;
    password: string;
  }

  const handleSave = useCallback(async (data: FormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatória')
          .min(6)
          .typeError('A senha precisa ter no minimo 6 caracteres'),
        name: Yup.string().required('Nome Obrigatório'),
        cpf: Yup.string().required('CPF Obrigatório'),
        birthday: Yup.string().required('Data de nascimento obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api
        .post('users', {
          name: data.name,
          cpf: data.cpf.replace(/[^0-9]/g, ''),
          birthday: moment(data.birthday, 'DD/MM/YYYY', true).format(
            'YYYY-DD-MM',
          ),
          email: data.email,
          password: data.password,
        })
        .then((res) => {
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
    }
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1, marginHorizontal: 10}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <View>
            <PrimaryText
              textColor={'#04C7AD'}
              alignSelf={'flex-start'}
              fontSize={36}>
              Vamos começar?
            </PrimaryText>
            <SecondaryText textColor={'#04C7AD'} light fontSize={15}>
              Coloque abaixo os seus dados para realizarmos seu cadastro.
            </SecondaryText>
          </View>
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

            {/* <Input
              ref={cpfInputRef}
              label="CPF"
              keyboardType="numeric"
              autoCorrect={false}
              name="cpf"
              placeholder="000.000.000-00"
              mask={'[000].[000].[000]-[00]'}
              returnKeyType="next"
              onSubmitEditing={() => {
                birthdayInputRef.current?.focus();
              }}
            /> */}

            <InputMask
              // ref={cpfInputRef}
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
              // ref={birthdayInputRef}
              label="Data de Nascimento"
              keyboardType="numeric"
              autoCorrect={false}
              autoCapitalize="none"
              name="birthday"
              type="datetime"
              options={{
                format: 'MM/DD/YYYY',
              }}
              placeholder="00/00/0000"
              returnKeyType="next"
              onSubmitEditing={() => emailInputRef.current?.focus()}
            />

            <Input
              label="E-Mail"
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />

            <Input
              ref={passwordInputRef}
              label="Senha"
              secureTextEntry
              name="password"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button
              backgroundColor="#E8237D"
              onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
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

export default SignUp;
