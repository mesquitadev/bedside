import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0px 20px ${Platform.OS === 'android' ? 150 : 40}px;
`;
