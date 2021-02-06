import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Avatar = styled.Image`
  margin-bottom: -30px;
  position: relative;
  z-index: 9999;
`;

export const Header = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  text-align: center;
  width: 100%;
  background-color: #e8237d;
`;

interface Box {
  backgroundColor?: string;
}
export const Box = styled.View`
  align-items: center;
  padding: 0 20px;
  text-align: center;
  justify-content: center;
  flex: 1;
  height: auto;
  width: 100%;
  background-color: ${(props: Box) =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
`;
export const LogoutButton = styled.TouchableOpacity`
  width: 100%;
  background: #e8237d;
  border-top-width: 1px;
  border-color: #e8237d;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const List = styled.View`
  width: 100%;
  /* padding: 10px 0; */
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const LogoutButtonText = styled.Text`
  color: white;
  font-size: 18px;
  font-family: 'Poppins-Regular';
  margin-left: 16px;
`;
