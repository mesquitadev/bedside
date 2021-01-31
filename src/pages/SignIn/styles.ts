import styled from 'styled-components/native';
import {Platform} from 'react-native';

export const Container = styled.View`
  flex: 1;
  padding: 0 10px ${Platform.OS === 'android' ? 200 : 40}px;
`;

export const ScreenHeader = styled.View`
  width: 100%;
  padding: 0 20px;
`;

export const SafeArea = styled.SafeAreaView`
  margin: 0 10px;
`;
