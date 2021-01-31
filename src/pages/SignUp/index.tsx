import React, {useRef, useCallback, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  Alert,
} from 'react-native';
import {PrimaryText, SecondaryText} from '../../styles';
import {Button, Input, Modal} from '../../components';
import {Form} from '@unform/mobile';
import * as Yup from 'yup';
import {FormHandles} from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import AwesomeAlert from 'react-native-awesome-alerts';
import {useNavigation} from '@react-navigation/native';
const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const navigation = useNavigation();

  const nameInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);
  const birthdayInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  interface FormData {
    name: string;
    cpf: number;
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
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('users', {
        name: data.name,
        cpf: data.cpf,
        birthday: data.birthday,
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      setShowAlert(true);
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
                nameInputRef.current?.focus();
              }}
            />

            <Input
              label="CPF"
              keyboardType="numeric"
              autoCorrect={false}
              name="cpf"
              placeholder="CPF"
              mask={'[000].[000].[000]-[00]'}
              returnKeyType="next"
              onSubmitEditing={() => {
                cpfInputRef.current?.focus();
              }}
            />
            <Input
              label="Data de Nascimento"
              autoCorrect={false}
              autoCapitalize="none"
              name="birthday"
              placeholder="00/00/0000"
              returnKeyType="next"
              onSubmitEditing={() => birthdayInputRef.current?.focus()}
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
                emailInputRef.current?.focus();
              }}
            />

            <Input
              label="Senha"
              secureTextEntry
              name="password"
              placeholder="Senha"
              textContentType="newPassword"
              returnKeyType="send"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
            />

            <Button
              backgroundColor="#E8237D"
              onPress={() => formRef.current?.submitForm()}>
              Cadastrar
            </Button>
          </Form>
        </ScrollView>
      </KeyboardAvoidingView>

      <AwesomeAlert
        show={showAlert}
        actionContainerStyle={{
          borderRadius: 10,
        }}
        closeOnTouchOutside={false}
        showProgress={false}
        title="Em Breve"
        titleStyle={{
          fontFamily: 'Poppins-Bold',
        }}
        message="As vacinas ainda estão chegando.
        Assim que estivermos pronto te avisamos."
        messageStyle={{
          justifyContent: 'center',
          textAlign: 'center',
          fontSize: 15,
          fontFamily: 'Poppins-Regular',
          color: '#000',
        }}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonStyle={{
          width: 100,
          justifyContent: 'center',
          alignItems: 'center',
          height: 46,
          backgroundColor: '#04C7AD',
        }}
        confirmButtonTextStyle={{
          fontFamily: 'Poppins-Bold',
          fontSize: 20,
        }}
        onConfirmPressed={() => {
          setHideAlert(false);
          navigation.goBack();
        }}
      />
    </>
  );
};

export default SignUp;
