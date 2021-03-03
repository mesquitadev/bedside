import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 20px;
`;
