import React from 'react';

import {SecondaryText} from '../../styles';
import {Container} from './privateTab.styles';
const PrivateTab: React.FC = () => {
  return (
    <Container>
      <SecondaryText textColor="black" fontSize={40}>
        OPS!
      </SecondaryText>
      <SecondaryText
        style={{
          textAlignVertical: 'center',
          textAlign: 'center',
        }}
        textColor="black"
        fontSize={20}>
        Ainda estamos finalizando as nossas parcerias, para fornecer as melhores
        opções para vocês.
      </SecondaryText>
    </Container>
  );
};

export default PrivateTab;
