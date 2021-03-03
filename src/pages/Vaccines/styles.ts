import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: white;
`;

export const ModalContainer = styled.View`
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

export const PageHeader = styled.View`
  border-top-color: #efefef;
  border-top-width: 2px;
  border-bottom-color: #efefef;
  border-bottom-width: 2px;
  height: 50px;
  margin: 10px 30px;
  padding: 0 10px;
  justify-content: center;
`;

export const CardVaccines = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 20px;
`;
export const Card = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  background: #e7e7e7;
  margin: 20px auto;
  border-radius: 10px;
`;
export const CardText = styled.View`
  padding: 10px;
`;

export const FooterCard = styled.View`
  padding: 0 !important;
  position: absolute;
  height: 30px;
  background: #40ccb2;
  bottom: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
export const ModalHeader = styled.View`
  flex-direction: row;
  padding: 10px 10px;
  align-items: center;
`;
export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin-left: 30px;
`;
export const FormContainer = styled.View`
  flex: 1;
  margin: 0 20px;
`;
