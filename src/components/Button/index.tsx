import React from 'react';

import {Container, ButtonText} from './styles';

const Button: React.FC = ({children, disabled}) => {
  return (
    <Container disabled={disabled}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
