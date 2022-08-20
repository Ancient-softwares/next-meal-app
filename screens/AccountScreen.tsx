import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Platform } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, ListGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/AccountList.style'
import { MaterialIcons, Ionicons, FontAwesome, MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';

const API_URL = Platform.OS === 'ios' ? 'http://127.0.0.1:5000' : 'http://10.0.2.2:5000'


const AccountScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [isError, setIsError] = useState(false)
  const [message, setMessage] = useState('')
  const [isLogin, setIsLogin] = useState(true)

  const onChangeHandler = () => {
      setIsLogin(!isLogin)
      setMessage('')
  }

  const onLoggedIn = (token: string) => {
      fetch(`${API_URL}/private`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
          }
      }).then(async response => {
          try {
              const jsonResponse = await response.json()
              if (response.status === 200) {
                  setMessage(jsonResponse.message)
              }
          } catch (error) {
              console.error(error)
          }
      })
  }

  const onSubmitHandler = () => {
      const payload = {
          email,
          name,
          password,
      };
      fetch(`${API_URL}/${isLogin ? 'login' : 'signup'}`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      })
      .then(async response => { 
          try {e
              const jsonResponse = await response.json()
              if (response.status !== 200) {
                  setIsError(true)
                  setMessage(jsonResponse.message)
              } else {
                  onLoggedIn(jsonResponse.token)
                  setIsError(false)
                  setMessage(jsonResponse.message)
              }
          } catch (error) {
              console.error(error)
          }
      })
      .catch(error => {
          console.error(error)
      })
  }

  const getMessage = () => {
      const status = isError ? 'Error' : 'Success'
      return status + message
  }

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);

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
      <ListGroup as="ul">
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
                onClick={handleShowLogin}
                >Entrar</Button>
                <Button variant="outline-danger"
                style={{
                    width: '8em',
                    marginTop: 15,
                    marginLeft: 5,
                }}
                onClick={handleShowRegister}
                >Cadastrar-se</Button>
            </View>
            <Text style={styles.subtitle}>Meu app, NextMeal</Text>
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
    <Modal show={showLogin} onHide={handleCloseLogin}>
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
    <Modal show={showRegister} onHide={handleCloseRegister}>
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

export default AccountScreen