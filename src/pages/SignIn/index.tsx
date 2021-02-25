import React, {useRef, useCallback, useState} from 'react';
import {
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {Container, ScreenHeader} from './styles';
import {PrimaryText, SecondaryText} from '../../styles';
import {Button, Input, Alert} from '../../components';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import {useNavigation} from '@react-navigation/native';
import getValidationErrors from '../../utils/getValidationErrors';
import {useAuth} from '../../hooks/auth';

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [errorTitle, setErrorTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBack, setIsBack] = useState(false);
  const navigation = useNavigation();

  const {signIn} = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
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

        await signIn({
          email: data.email,
          password: data.password,
        }).catch((error) => {
          setShowAlert(true);
          setErrorTitle('Erro!');
          setErrorMessage(error.response.data.error);
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          return;
        }
      }
    },
    [signIn],
  );
  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{flex: 1}}>
          <Container>
            <ScreenHeader>
              <View style={{width: 200}}>
                <PrimaryText
                  textColor={'#04C7AD'}
                  alignSelf={'flex-start'}
                  fontSize={36}>
                  Já possui cadastro?
                </PrimaryText>
              </View>
              <SecondaryText textColor={'#04C7AD'} light fontSize={15}>
                Coloque abaixo seu email e senha para realizar o login na
                plataforma bedside.
              </SecondaryText>
            </ScreenHeader>
            <Form onSubmit={handleSignIn} ref={formRef}>
              <Container>
                <Input
                  label={'email'}
                  autoCorrect={false}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  name="email"
                  placeholder="E-mail"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                />

                <Input
                  label={'Senha'}
                  ref={passwordInputRef}
                  secureTextEntry
                  returnKeyType="send"
                  name="password"
                  placeholder="Senha"
                  textContentType="newPassword"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />

                <Button
                  backgroundColor="#E8237D"
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}>
                  Entrar
                </Button>
              </Container>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

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

export default SignIn;
