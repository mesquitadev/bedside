import styled from 'styled-components/native';

interface Container {
  backgroundColor: string;
}

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${(props: Container) =>
    props.backgroundColor ? props.backgroundColor : '#262626'};
  z-index: 9999;
`;
