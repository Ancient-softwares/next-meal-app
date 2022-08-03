import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { View } from '../components/Themed';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { createStackNavigator } from '@react-navigation/stack';

import { RootTabScreenProps } from '../types';

export default function BookScreen({ navigation }: RootTabScreenProps<'Books'>) {
  const Stack = createStackNavigator();

  type TYPES = [
    {
      id: string;
      title: string;
      rating: number;
      kitchenType: string;
    },
    {
      id: string;
      title: string;
      rating: number;
      kitchenType: string;
    },
    {
      id: string;
      title: string;
      rating: number;
      kitchenType: string;
    },
  ];
  
  const DATA: TYPES = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'SELECT nome FROM suamae',
      rating: 4.5,
      kitchenType: 'Brasileira',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Bar do José',
      rating: 5.0,
      kitchenType: 'Argentina',
    },
                                           
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Bar do Pedro',
      rating: 4.2,
      kitchenType: 'Mexicana',
    },
  ];

  const renderItem = ({ item, rating, kitchenType }: { item: string; rating: number; kitchenType: string; } ) => (
    <Item 
    title={ item.title }
    rating={ item.rating }
    kitchenType={ item.kitchenType }
    />
  );
  
  const Item = ({ title, rating, kitchenType }: { title: string, rating: number, kitchenType: string }) => (
    <View>
      <Card style={{ 
        width: '22em', 
        border: 'none', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
        }}>
        <Card.Img variant="top" src={require('../assets/images/example.jpeg')} />
        <Card.Body>
          <Card.Title>{ title }</Card.Title>
          <Card.Text>
            Tipo de cozinha: { kitchenType }
          </Card.Text>
          <Card.Text>
            Nota: { rating } / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Fazer reserva</Button>
          <Button variant="success" style={{ marginLeft: 5 }}>Entrar na fila</Button>
        </Card.Body>
      </Card>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
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
  cardImg: {
    flex: 1,
  },
  card: {
    width: '22em', 
      border: 'none', 
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center', 
  }
});
