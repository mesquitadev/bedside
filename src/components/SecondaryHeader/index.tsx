import React from 'react';
import {SafeAreaView} from 'react-native';
import {Container, Logo} from './styles';
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
        <Icon name="chevron-down" size={30} />
        <Icon name="chevron-down" size={30} />
        <Logo source={BedLogo} />
        <Icon name="chevron-down" size={30} />
        <Icon name="chevron-down" size={30} />
      </Container>
    </SafeAreaView>
  );
};

export default Header;
