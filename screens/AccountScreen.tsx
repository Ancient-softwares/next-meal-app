import { Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <MaterialIcons style={styles.accountIcon} name="account-circle" size={64} color='#963333' />
      <Text style={styles.title}>Olá, visitante!</Text>
      <Text style={styles.text}>Crie ou acesse sua conta</Text>
      <Text style={styles.subtitle}>Meu app, NextMeal</Text>
      <ListGroup as="ul">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <Ionicons name="notifications-outline" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Minhas notificações</div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <FontAwesome name="calendar-check-o" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Minhas reservas</div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <MaterialCommunityIcons name="human-queue" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Meu lugar nas filas</div>
        </div>
      </ListGroup.Item>
    </ListGroup>
      <Text style={styles.subtitle}>Configurações gerais</Text>
      <ListGroup as="ul">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <Ionicons name="notifications-off-outline" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Configura</div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <FontAwesome name="calendar-check-o" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Sobre nós</div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <MaterialCommunityIcons name="human-queue" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Meu lugar nas filas</div>
        </div>
      </ListGroup.Item>
    </ListGroup>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 20,
    paddingVertical: 15,
    paddingLeft: 30,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
  },
  marginVertical: {
    marginVertical: 25,
  },
  rowTitle: {
    fontSize: 16,
    marginTop: 30,
    marginHorizontal: 15,
  },
  subtitle: {
    marginVertical: 30,
    fontSize: 16,
    color: '#963333',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  accountIcon: {
    paddingBottom: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: -300,
  },
  firstIcon: {
    paddingTop: 25,
  },
  secondIcon: {
    marginTop: -50,
  },
  secondText: {
    marginTop: -50,
    fontSize: 16,
    marginHorizontal: 15,
  },
  thirdIcon: {
    marginTop: -140,
  },
  thirdText: {
    marginTop: -140,
    fontSize: 16,
    marginHorizontal: 15,
  },
  secondSubtitle: {
    marginTop: -180,
    fontSize: 16,
    color: '#963333',
  },
});
