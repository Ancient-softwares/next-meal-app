import React, { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/AccountList.style'
import AccountList from '../components/AccountList';

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
      <AccountList />
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
            <Form.Control type="text" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>CPF</Form.Label>
            <Form.Control type="text" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>CEP</Form.Label>
            <Form.Control type="text" placeholder="Enter email" />
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

