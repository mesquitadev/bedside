import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';
import {Container} from './styles';
import {PrimaryText} from '../../styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({disabled, children, ...rest}) => (
  <Container {...rest}>
    <PrimaryText textColor={disabled ? '#000' : '#fff'}>{children}</PrimaryText>
  </Container>
);

export default Button;
