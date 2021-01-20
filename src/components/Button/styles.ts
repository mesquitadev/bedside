import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface ButtonProps {
  disabled?: string;
}

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: ${(props: string) => (props.disabled ? '#979797' : '#0a5b4c')};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;

export const ButtonText = styled.Text`
  font-family: 'Poppins-Light';
  color: white;
  font-size: 20px;
  margin: 10px 20px 10px;
`;
