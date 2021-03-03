import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {Header} from './publicTab.styles';
import api from '../../services/api';
import {PrimaryText, SecondaryText} from '../../styles';

import PublicTab from './publicTab';
import PrivateTab from './privateTab';

const initialLayout = {width: Dimensions.get('window').width};

const Appointments = () => {
  const [index, setIndex] = useState(1);

  const [routes] = useState([
    {key: 'second', title: 'Privado'},
    {key: 'first', title: 'Público'},
  ]);

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return <PublicTab />;
      case 'second':
        return <PrivateTab />;
      default:
        return null;
    }
  };

  const TabStyles = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor: '#40CCB2',
      }}
      style={{
        backgroundColor: 'white',
        height: 50,
      }}
      labelStyle={{
        color: '#A6AAB4',
        fontFamily: 'Poppins-Bold',
      }}
      inactiveColor={{
        color: '#A6AAB4',
      }}
      activeColor={{
        color: '#40CCB2',
      }}
    />
  );
  return (
    <>
      <Header>
        <PrimaryText textColor="#04C7AD" fontSize={32}>
          Agendamentos
        </PrimaryText>
      </Header>
      <TabView
        style={{
          backgroundColor: 'white',
        }}
        renderTabBar={TabStyles}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </>
  );
};

export default Appointments;
