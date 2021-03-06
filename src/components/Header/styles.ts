import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  margin: 0 30px;
  max-width: 100%;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 25px;
`;
export const AddressContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  max-width: 120px;
`;
