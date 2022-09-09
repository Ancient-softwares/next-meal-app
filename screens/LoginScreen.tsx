// import React from 'react';
import React, { useState } from 'react';
import { View } from '../components/Themed';
import styles from '../styles/LoginScreen.style';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { TextInput } from 'react-native';

const API_URL = 'http://127.0.0.1:8000'

const OperationScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault()
    
    await axios({
      method: 'post',
      url: `${API_URL}/api/loginCliente`,
      headers: {
        'Accept':   'application/json',
        'Content-Type':   'application/json'
      },
      data: JSON.stringify({
        emailCliente: email,
        senhaCliente: password
      })
    })
      .then(
        response => console.log('Response: ' + JSON.stringify(response.data))
      )
      .catch(error => console.log("ERROR:: " + error.response.data))
  }
  
  return (
    <View style={styles.container}>
      <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (text: any) => setEmail(text) } placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (text: any) => setPassword(text) } placeholder="Password" />
          </Form.Group>
          <Button variant="outline-danger" type="submit">
            Entrar
          </Button>

        </Form>
    </View>
  );
}

export default OperationScreen


