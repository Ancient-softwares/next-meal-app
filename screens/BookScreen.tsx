import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function BookScreen() {
  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
      <Card style={{ width: '24em', border: 'none', flex: 1, alignItems: 'flex-start' }}>
        <Card.Img variant="top" src="../assets/images/example.jpeg" />
        <Card.Body>
          <Card.Title>Bar do João</Card.Title>
          <Card.Text>
            Tipo de cozinha: Brasileira
          </Card.Text>
          <Card.Text>
            Nota: 4.9 / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Fazer reserva</Button>
          <Button variant="success" style={{ marginLeft: 5 }}>Entrar na fila</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '24em', border: 'none', flex: 1, alignItems: 'flex-start' }}>
        <Card.Img variant="top" src="../assets/images/example.jpeg" />
        <Card.Body>
          <Card.Title>Mocotó</Card.Title>
          <Card.Text> 
            Tipo de cozinha: Brasileira
          </Card.Text>
          <Card.Text>
            Nota: 4.9 / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Fazer reserva</Button>
          <Button variant="success" style={{ marginLeft: 5 }}>Entrar na fila</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '24em', border: 'none', flex: 1, alignItems: 'flex-start' }}>
        <Card.Img variant="top" src="../assets/images/example.jpeg" />
        <Card.Body>
          <Card.Title>Le Bife</Card.Title>
          <Card.Text>
            Tipo de cozinha: Brasileira
          </Card.Text>
          <Card.Text>
            Nota: 4.9 / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Fazer reserva</Button>
          <Button variant="success" style={{ marginLeft: 5 }}>Entrar na fila</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '24em', border: 'none', flex: 1, alignItems: 'flex-start' }}>
        <Card.Img variant="top" src="../assets/images/example.jpeg" />
        <Card.Body>
          <Card.Title>Arturito</Card.Title>
          <Card.Text>
            Tipo de cozinha: Brasileira
          </Card.Text>
          <Card.Text>
            Nota: 4.9 / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Fazer reserva</Button>
          <Button variant="success" style={{ marginLeft: 5 }}>Entrar na fila</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '24em', border: 'none', flex: 1, alignItems: 'flex-start' }}>
        <Card.Img variant="top" src="../assets/images/example.jpeg" />
        <Card.Body>
          <Card.Title>Mocotó</Card.Title>
          <Card.Text>
            Tipo de cozinha: Brasileira
          </Card.Text>
          <Card.Text>
            Nota: 4.9 / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Fazer reserva</Button>
          <Button variant="success" style={{ marginLeft: 5 }}>Entrar na fila</Button>
        </Card.Body>
      </Card>
      <Card style={{ width: '24em', border: 'none', flex: 1, alignItems: 'flex-start' }}>
        <Card.Img variant="top" src="../assets/images/example.jpeg" />
        <Card.Body>
          <Card.Title>Tropikall Bar</Card.Title>
          <Card.Text>
            Tipo de cozinha: Brasileira
          </Card.Text>
          <Card.Text>
            Nota: 4.9 / 5.0
          </Card.Text>
          <Button variant="primary" style={{ marginRight: 5 }}>Fazer reserva</Button>
          <Button variant="success" style={{ marginLeft: 5 }}>Entrar na fila</Button>
        </Card.Body>
      </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
