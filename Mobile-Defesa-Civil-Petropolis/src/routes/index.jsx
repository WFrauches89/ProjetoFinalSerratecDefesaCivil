import React from 'react';
import { BottonTabRoutes } from './BottonTab/index';
import Header from '../components/Header/index';
import { View } from 'react-native-web';

export const TabRoutes = () => {
  return (
    <>
      <Header />
      <BottonTabRoutes />
    </>
  );
};
