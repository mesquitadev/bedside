import styled, {css} from 'styled-components/native';
import TextInputMask from 'react-native-text-input-mask';

interface Container {
  isFocused?: boolean;
  isErrored?: boolean;
}

export const Container = styled.View<Container>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: #ffffff;
  margin-bottom: 30px;
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

export const TextInput = styled(TextInputMask)`
  flex: 1;
  color: #424242;
  font-family: 'Montserrat-Regular';
  font-size: 16px;
`;
