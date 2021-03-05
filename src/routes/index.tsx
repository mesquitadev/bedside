import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Loading} from '../components';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../hooks/auth';

const Routes: React.FC = () => {
  const {user, loading} = useAuth();

  if (loading) {
    return <Loading visible={loading} />;
  }
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
