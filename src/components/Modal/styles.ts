import {Animated} from 'react-native';
import styled from 'styled-components/native';

export const ModalContainer = styled(Animated.View)`
  bottom: 16 + getBottomSpace();
  position: 'absolute';
  height: 50%;
  background-color: #fff;
  width: 100%;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 0 25px;

  /* borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  paddingLeft: 25,
  paddingRight: 25, */
`;
