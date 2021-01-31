import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

export const Avatar = styled.Image`
  margin-bottom: -30;
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
  width: 100%;
  background-color: ${(props: Box) =>
    props.backgroundColor ? props.backgroundColor : '#fff'};
`;
