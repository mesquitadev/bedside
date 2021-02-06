import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useField} from '@unform/core';
import {PrimaryText, SecondaryText} from '../../styles';
import {TextInputMask, TextInputMaskProps} from 'react-native-masked-text';

interface InputMaskRef extends TextInputMask {
  value: string;
  rawValue: string;
}

interface InputMaskProps extends Omit<TextInputMaskProps, 'defaultValue'> {
  name: string;
  label: string;
}

const InputMask = ({
  name,
  onChangeText,
  label,
  ...rest
}: InputMaskProps): JSX.Element => {
  const inputRef = useRef<InputMaskRef>(null);
  const {fieldName, registerField, defaultValue = '', error} = useField(name);

  const [value, setValue] = useState(defaultValue);
  const [rawValue, setRawValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const mergeOnChaneText = useCallback((text, rawValeu) => {
    setValue(text);
    setRawValue(rawValeu);

    onChangeText && onChangeText(text, rawValeu);
  }, []);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    // setIsFilled(!!inputValueRef.current.value);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
      inputRef.current.rawValue = rawValue;
    }
  }, [value, rawValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      getValue: (ref: InputMaskRef) => {
        return ref.rawValue;
      },
      setValue: (_, newValue: string) => {
        setValue(newValue);
        setRawValue(newValue);
      },
      clearValue: () => {
        setValue('');
        setRawValue('');
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {label ? (
        <SecondaryText textColor={'#000'} alignSelf={'flex-start'}>
          {label}
        </SecondaryText>
      ) : null}
      <Container isFocused={isFocused} isErrored={!!error}>
        <TextInputMask
          ref={inputRef}
          value={value}
          placeholderTextColor="#000"
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          includeRawValueInChangeText
          onChangeText={mergeOnChaneText}
          style={styles.inputMask}
          {...rest}
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

import styled, {css} from 'styled-components/native';
interface Container {
  isFocused?: boolean;
  isErrored?: boolean;
}

export const Container = styled.View<Container>`
  width: 100%;
  height: 50px;
  padding: 0 10px;
  background: #ffffff;
  margin-bottom: 10px;
  border-radius: 10px;
  border-color: #e6e6f0;
  border-width: 1px;
  ${(props: Container) =>
    props.isErrored &&
    css`
      border-width: 2px;
      border-color: #c53030;
    `}
  ${(props: Container) =>
    props.isFocused &&
    css`
      border-width: 1px;
      border-color: #e8237d;
    `}
`;

export const ErrorBox = styled.View`
  color: #c53030;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #424242;
  font-family: 'Poppins-Regular';
  font-size: 16px;
`;

const styles = StyleSheet.create({
  inputMask: {
    flex: 1,
    color: '#424242',
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
  },
});

export default InputMask;
