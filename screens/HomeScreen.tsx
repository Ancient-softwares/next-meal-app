import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { ListGroup } from 'react-bootstrap';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: React.SetStateAction<number>, e: any) => {
    setIndex(selectedIndex);
  };

  const exampleImage = require('../assets/images/example.jpeg');
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
      showsVerticalScrollIndicator
      >
    <View>
      <Text style={styles.subtitle}>Categorias</Text>
    </View>
    <View>
    <ScrollView 
      horizontal={true}
      contentContainerStyle={{ flexGrow: 1, flex: 1 }}
    >

<img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10 }}/>
      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10  }}/>
      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70,  marginLeft: 10, marginRight: 10  }}/>
      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70,  marginLeft: 10, marginRight: 10  }}/>
      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70,  marginLeft: 10, marginRight: 10  }}/>
      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70,  marginLeft: 10, marginRight: 10  }}/>
      <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70,  marginLeft: 10, marginRight: 10  }}/>

    </ScrollView>
    </View>
    <View>
      <Text style={styles.subtitle}>Reservados recentemente</Text>
      <ListGroup as='ul'>
        <ListGroup.Item 
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do Armando</div>
        </div>
        </ListGroup.Item>
        <ListGroup.Item 
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do João</div>
        </div>
        </ListGroup.Item>
        <ListGroup.Item 
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do Zézin</div>
        </div>
        </ListGroup.Item>
        <ListGroup.Item 
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do Edinaldo</div>
        </div>
        </ListGroup.Item>
      </ListGroup>
    </View>
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
