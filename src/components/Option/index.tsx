import DropDownPicker from 'react-native-dropdown-picker';
import styled from 'styled-components/native';
import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';
import {PrimaryText} from '../../styles';

interface OptionProps {
  label?: string;
  items: Array;
}

const Option: React.FC = ({label, items, ...rest}: OptionProps) => {
  return (
    <>
      <PrimaryText
        style={{marginBottom: 10, marginTop: 10}}
        textColor="black"
        alignSelf="flex-start">
        {label}
      </PrimaryText>
      <DropDownPicker
        containerStyle={{height: 50}}
        style={{backgroundColor: '#fafafa'}}
        dropDownStyle={{backgroundColor: '#fafafa'}}
        itemStyle={{
          justifyContent: 'flex-start',
        }}
        items={items}
        {...rest}
      />
    </>
  );
};

export default Option;
