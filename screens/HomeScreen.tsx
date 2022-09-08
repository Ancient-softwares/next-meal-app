import React, { useState } from 'react';
import Home from '../components/HomeScreen';
import { RootTabScreenProps } from '../types';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-native-gesture-handler';


const HomeScreen = ({ navigation }: RootTabScreenProps<'Home'>) => {
  return (
    <>
      <Home />
    </>
  )
}

export default HomeScreen