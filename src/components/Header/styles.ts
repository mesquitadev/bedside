import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const DrawerHeader = styled.View`
  width: 100%;
  height: 100px;
  padding: 17px 25px;
`;

export const DrawerBody = styled.View`
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const DrawerItem = styled.TouchableOpacity`
  width: 100%;
  height: 38px;
`;

export const LogoContainer = styled.Image`
  height: 32px;
  width: 125px;
`;
