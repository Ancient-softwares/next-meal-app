import { Entypo, Ionicons, MaterialIcons, FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import ModalScreen from './ModalScreen'

export default function AccountScreen() {
  const [Lshow, setLShow] = useState(false);
  const [Rshow, setRShow] = useState(false);
  
  const handleLShow = () => setLShow(true);
  const handleRShow = () => setRShow(true);
  const handleLClose = () => setLShow(false);
  const handleRClose = () => setRShow(false);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
       showsVerticalScrollIndicator ={false}
       showsHorizontalScrollIndicator={false}
       style={{
        height: '100%',
        width: '100%',
       }}
      >
      <MaterialIcons style={styles.accountIcon} name="account-circle" size={64} color='#963333' />
      <Text style={styles.title}>Olá, visitante!</Text>
      <Text style={styles.text}>Crie ou acesse sua conta</Text>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}
      >
      <Button variant="outline-danger"
      style={{
        width: '8em',
        marginTop: 15,
        marginRight: 5,
      }}
      onClick={handleLShow}
      >Entrar</Button>
      <Button variant="outline-danger"
      style={{
        width: '8em',
        marginTop: 15,
        marginLeft: 5,
      }}
      onClick={handleRShow}
      >Cadastrar-se</Button>
      </View>
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
          <div className="fw-bold">Política de privacidade</div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <Entypo name="text-document" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Termos de uso</div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <Feather name="info" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Sobre nós</div>
        </div>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <MaterialCommunityIcons name="file-document-edit-outline" size={24} color="black" />
        <div className="ms-2 me-auto">
          <div className="fw-bold">Ajuda e suporte</div>
        </div>
      </ListGroup.Item>
    </ListGroup>
    </ScrollView>
    <Modal show={Lshow} onHide={handleLClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Entrar
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Concordo com os termos de uso" />
            <Form.Check type="checkbox" label="Concordo com a política de privacidade" />
          </Form.Group>
          
          <Button variant="primary" type="submit">
            Registrar-se
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
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
});
