import * as dotenv from 'dotenv'
dotenv.config()
import React, { useState } from 'react';
import { View } from '../components/Themed';
import styles from '../styles/RegisterScreen.style';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackScreenProps, RootTabScreenProps } from '../types';

const API_URL = process.env.URL || 'http://127.0.0.1:8000'

const RegisterScreen = ({ navigation }: RootStackScreenProps<"Register">) => {
   const [name, setName] = useState('');
   const [cpf, setCpf] = useState('');
   const [cel, setCellphone] = useState('');
   const [password, setPassword] = useState('');
   const [foto, setFoto] = useState('');
   const [email, setEmail] = useState('')
   const [cep, setCep] = useState(''); 
   const [rua, setRua] = useState('');
   const [numero, setNumero] = useState('');
   const [bairro, setBairro] = useState('');
   const [cidade, setCidade] = useState('');
   const [estado, setEstado] = useState('');

    const handleSubmit = async (e: Event) => {
      e.preventDefault()
  
        const packets = {
            nomeCliente:  name,
            cpfCliente: cpf,
            celCliente: cel,
            senhaCliente: password,
            fotoCliente: foto,
            cepCliente: cep,
            emailCliente: email,
            ruaCliente: rua,
            numRuaCliente: numero,
            bairroCliente: bairro,
            cidadeCliente: cidade,
            estadoCliente: estado
        };
        await axios({
          method: 'post',
          url: `${API_URL}/api/cadastroCliente`,
          headers: {
            'Accept':   'application/json',
            'Content-Type':   'application/json'
          },
          data: JSON.stringify({
            nomeCliente:  name,
            cpfCliente: cpf,
            celCliente: cel,
            senhaCliente: password,
            fotoCliente: foto,
            cepCliente: cep,
            emailCliente: email,
            ruaCliente: rua,
            numRuaCliente: numero,
            bairroCliente: bairro,
            cidadeCliente: cidade,
            estadoCliente: estado
          })
      })
      .then(response => window.alert('Cadastro realizado com sucesso!' + JSON.stringify(response.data)))
        .catch(error => {
        console.log("ERROR:: ", error.response.data)})
  }
  
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
     <Form onSubmit={handleSubmit}>
     <Form.Label style={{
              fontSize: 32,
              fontWeight: 'bold',
              color: '#963333',
              marginVertical: '5%',
            }}>Cadastro</Form.Label>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (email: string) => setEmail(email) } placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (name: string) => setName(name) } placeholder="Nome" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCelular">
            <Form.Label>Celular</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (celular: string) => setCellphone(celular) } placeholder="Celular" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCPF">
            <Form.Label>CPF</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (cpf: string) => setCpf(cpf) } placeholder="CPF" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCEP">
            <Form.Label>CEP</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (cep: string) => setCep(cep) } placeholder="CEP" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (password: string) => setPassword(password) } placeholder="Senha" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicStreet">
            <Form.Label>Confirmar senha</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (password: string) => setPassword(password) } placeholder="Confirmar senha" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicState">
            <Form.Label>Estado</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (estado: string) => setEstado(estado) } placeholder="Estado" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicCity">
            <Form.Label>Cidade</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (cidade: string) => setCidade(cidade) } placeholder="Cidade" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicBairro">
            <Form.Label>Bairro</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (bairro: string) => setBairro(bairro) } placeholder="Bairro" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicRua">
            <Form.Label>Rua</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (rua: string) => setRua(rua) } placeholder="Rua" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicNumber">
            <Form.Label>Numero</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (numero: string) => setNumero(numero) } placeholder="Numero" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Concordo com os termos de uso" />
            <Form.Check type="checkbox" label="Concordo com a política de privacidade" />
          </Form.Group>
          
          <Button variant="outline-danger" type="submit">
            Registrar-se
          </Button>

          <View style={{ marginVertical: '5%' }}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Text style={{
              color: '#000000'
          }} onPress={() => navigation.navigate('Login')}>Já  possui uma conta?<Text style={{color: '#963333'}}> Entrar.  </Text>
          </Text>
          </Form.Group>
          </View>

        </Form>
        </ScrollView>
    </View>
  );
}

export default RegisterScreen


