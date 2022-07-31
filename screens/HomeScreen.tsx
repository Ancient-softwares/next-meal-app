import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, Image, FlatList, ScrollView, DrawerLayoutAndroid } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Account from './AccountScreen';
import Books from './BookScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  const exampleImage = require('../assets/images/example.jpeg');
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
    <Carousel fade>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <View>
      <Text style={styles.subtitle}>Categorias</Text>
    </View>
    <ScrollView horizontal={true}>

      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10 }}/>
      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10  }}/>
      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70,  marginLeft: 10, marginRight: 10  }}/>

    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  subtitle: {
    marginLeft: 20,
    marginVertical: 30,
    fontSize: 16,
    color: '#963333',
  },
});
