import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

interface ButtonProps {
  backgroundColor?: string;
}

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background-color: ${(props: ButtonProps) =>
    props.backgroundColor ? props.backgroundColor : '#620A32'};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
`;
