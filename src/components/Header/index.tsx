import React from 'react';
import {SafeAreaView} from 'react-native';
import {Container, Logo, AddressContainer} from './styles';
import BedLogo from '../../assets/logo-bed.png';
import {SecondaryText} from '../../styles';
import Icon from 'react-native-vector-icons/Feather';
interface HeaderProps {
  onPress?: () => {};
  address: string;
}

const Header = ({onPress, address}: HeaderProps) => {
  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <Container>
        <AddressContainer>
          <SecondaryText
            ellipsizeMode="tail"
            numberOfLines={1}
            textColor="black"
            onPress={onPress}>
            {address ? address : 'Adicionar Endereço'}
          </SecondaryText>
          {/* <Icon name="chevron-down" size={16} /> */}
        </AddressContainer>
        <Logo source={BedLogo} />
      </Container>
    </SafeAreaView>
  );
};

export default Header;
