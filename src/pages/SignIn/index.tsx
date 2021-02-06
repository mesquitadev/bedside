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
import {Button, Input, Modal} from '../../components';
import * as Yup from 'yup';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

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
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
          setShowAlert(true);
          return;
        }
      }
      setShowAlert(true);
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
                  onSubmitEditing={() => {}}
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

      <Modal
        show={showAlert}
        title="Erro"
        message="Parece que Houve um erro ao tentar entrar na plataforma, verifique as credenciais!"
        onConfirmPressed={() => {
          setShowAlert(false);
        }}
      />
    </>
  );
};

export default SignIn;
