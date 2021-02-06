import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from 'react';
// import {TextInputProps} from 'react-native';
import {TextInputProps} from 'react-native-masked-text';
import {useField} from '@unform/core';
import {Container, TextInput, ErrorBox} from './styles';
import {PrimaryText, SecondaryText} from '../../styles';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  label?: string;
  type?: string;
  placeholder?: string;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  {name, label, ...rest},
  ref,
) => {
  const {fieldName, defaultValue = '', registerField, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});
  const inputElementRef = useRef<any>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputElementRef.current.focus();
      },
    };
  });
  return (
    <>
      {label ? (
        <SecondaryText textColor={'#000'} alignSelf={'flex-start'}>
          {label}
        </SecondaryText>
      ) : null}
      <Container isFocused={isFocused} isErrored={!!error}>
        <TextInput
          {...rest}
          ref={inputElementRef}
          keyboardAppearance="light"
          placeholderTextColor="#000"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value: any) => {
            inputValueRef.current.value = value;
          }}
        />
      </Container>
      {error && (
        <ErrorBox>
          <PrimaryText
            textColor={'#c53030'}
            alignSelf={'flex-end'}
            fontSize={15}>
            {error}
          </PrimaryText>
        </ErrorBox>
      )}
    </>
  );
};

export default forwardRef(Input);
