import React, {useState, useEffect} from 'react';
import {Dimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {Header, Loading} from '../../components';
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import PublicTab from './publicTab';
import PrivateTab from './privateTab';

const initialLayout = {width: Dimensions.get('window').width};
export interface Home {
  id: string;
  name: string;
  city: string;
  prefecture: boolean;
  logo: string;
  banner: string;
}

const Home = () => {
  const [index, setIndex] = useState(1);
  const [loading, setLoading] = useState(true);
  const [cityHall, setCityHall] = useState<Home[]>([]);
  useEffect(() => {
    async function loadLabs(): Promise<void> {
      api
        .get('app/home', {
          // headers: {
          //   Authorization: 'Bearer ' + AsyncStorage.getItem('@Bedside:token'),
          // },
        })
        .then((response) => {
          setCityHall(response.data);
          setLoading(false);
        })
        .catch((err) => console.log('erro', err.message));
    }

    loadLabs();
  }, []);

  const [routes] = useState([
    {key: 'second', title: 'Privado'},
    {key: 'first', title: 'Público'},
  ]);

  const renderScene = ({route}: any) => {
    switch (route.key) {
      case 'first':
        return <PublicTab labs={cityHall} />;
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
  return loading ? (
    <Loading visible={loading} />
  ) : (
    <>
      <Header address={'Av. 02, Setor Bueno'} />
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

export default Home;
