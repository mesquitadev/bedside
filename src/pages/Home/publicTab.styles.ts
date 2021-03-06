import styled from 'styled-components/native';

export const MainContainer = styled.ScrollView`
  flex: 1;
  padding: 0 29px;
  background: white;
`;
export const Capa = styled.Image.attrs({
  resizeMode: 'contain',
})`
  padding: 10px;
  margin-top: 19px;
  width: 100%;
  height: 184px;
  align-self: center;
  max-height: 184px;
`;

export const InfoContainer = styled.View`
  margin: 10px 0;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  height: 80px;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const Avatar2 = styled.Image`
  width: 80px;
  height: 80px;
`;

export const ServicesContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 20px;
`;

export const WarningsContainer = styled.View`
  margin-top: 20px;
`;
