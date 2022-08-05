import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { View } from '../components/Themed';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import style from '../styles/BooksScreen.style';
import { RootTabScreenProps } from '../types';
import { Form, Modal } from 'react-bootstrap';

export default function BookScreen({ navigation }: RootTabScreenProps<'Books'>) {
  const [Rshow, setRShow] = useState(false);
  
  const handleRShow = () => setRShow(true);
  const handleRClose = () => setRShow(false);

  type TYPES = [
    {
      id: any;
      title: any;
      rating: any;
      kitchenType: any;
    },
    {
      id: any;
      title: any;
      rating: any;
      kitchenType: any;
    },
    {
      id: any;
      title: any;
      rating: any;
      kitchenType: any;
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

  const renderItem = ({ item, rating, kitchenType }: { item: any; rating: any; kitchenType: any; } ) => (
    <Item 
    title={ item.title }
    rating={ item.rating }
    kitchenType={ item.kitchenType }
    />
  );
  
  const Item = ({ title, rating, kitchenType }: { title: any, rating: any, kitchenType: any }) => (
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
          <Button variant="outline-danger" onClick={handleRShow}>Mais informações</Button>
        </Card.Body>
      </Card>
    </View>
  );

  <Modal show={Rshow} onHide={handleRClose}>
  <Modal.Header closeButton>
    <Modal.Title>Registrar</Modal.Title>
  </Modal.Header>
  <Modal.Body>
  <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Nome</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>CPF</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>CEP</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>CEP</Form.Label>
      <Form.Control type="email" placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Senha</Form.Label>
      <Form.Control type="password" placeholder="Password" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Registrar-se
    </Button>
  </Form>
  </Modal.Body>
</Modal>

  return (
    <SafeAreaView style={style.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}


