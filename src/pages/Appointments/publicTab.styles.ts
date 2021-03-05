import styled from 'styled-components/native';

export const Header = styled.View`
  background: white;
  justify-content: center;
  align-items: center;
  height: 80px;
  padding: 0 16px;
`;

export const MainContainer = styled.ScrollView`
  flex: 1;
  background: white;
  margin: 10px 8px;
  border-radius: 6px;
  border-color: #9fa2b4;
  border-width: 1px;
  flex-direction: column;
`;
export const ListHeader = styled.View`
  height: 50px;
  align-items: center;
  padding: 0px 30px;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #9fa2b4;
  border-bottom-width: 1px;
`;
export const ListContainer = styled.TouchableOpacity`
  height: 70px;
  width: 100%;
  align-items: center;
  border-bottom-color: #9fa2b4;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
`;
export const ItemContainer = styled.View`
  padding: 0 10px;
  justify-content: flex-start;
  max-width: 150px;
`;

// Modal
export const ContainerModal = styled.View`
  flex: 1;
  flex-direction: column;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding-bottom: 50px;
`;
export const ModalHeader = styled.View`
  height: 50px;
  margin: 20px 30px;
  padding: 0 10px;
  justify-content: center;
`;

export const DataContainer = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
  border-bottom-color: #dfe0eb;
  border-bottom-width: 2px;
  margin: 0 20px;
`;
export const HeaderContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 20px;
`;

export const Item = styled.View`
  padding: 5px;
`;
export const InfoContainer = styled.View`
  flex-direction: row;
  border-bottom-color: #dfe0eb;
  flex-wrap: wrap;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin: 10px 30px;
`;

/* border-top-color: #efefef;
  border-top-width: 2px;
  border-bottom-color: #efefef;
  border-bottom-width: 2px; */

export const FooterModal = styled.View`
  margin: 0 20px;
`;
