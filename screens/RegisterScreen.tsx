// import React from 'react';
import React, { useState } from 'react';
import { View } from '../components/Themed';
import styles from '../styles/RegisterScreen.style';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { TextInput } from 'react-native';

const API_URL = 'http://127.0.0.1:8000'

const OperationScreen = () => {
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
   const [complemento, setComplemento] = useState('');
   const [dataCadastro, setDataCadastro] = useState('');
   const [dataAtualizacao, setDataAtualizacao] = useState('');

  

    const loginIsset = () => {
    if (!email || !password) {
        return false;
    } 

    return true;
    }

    const handleSubmit = () => {
  
        const packets = {
            nomeCliente:  name,
            cpfCliente: cpf,
            celCliente: cel,
            senhaCliente: password,
            fotoCliente: foto,
            cepCliente: cep,
            ruaCliente: rua,
            numRuaCliente: numero,
            bairroCliente: bairro,
            cidadeCliente: cidade,
            estadoCliente: estado
        };
        axios.post(`${API_URL}/mobile/cadastroCliente`, packets)
            .then(
                response => alert(JSON.stringify(response.data))
                
                )
            .catch(error => {
                console.log("ERROR:: ",error.response.data);
                
                });
    }
  
  return (
    <View style={styles.container}>
     <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (email: string) => setEmail(email) } placeholder="Email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (name: string) => setName(name) } placeholder="Nome" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCelular">
            <Form.Label>Celular</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (celular: string) => setCellphone(celular) } placeholder="Celular" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCPF">
            <Form.Label>CPF</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (cpf: string) => setCpf(cpf) } placeholder="CPF" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCEP">
            <Form.Label>CEP</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (cep: string) => setCep(cep) } placeholder="CEP" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (password: string) => setPassword(password) } placeholder="Senha" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicStreet">
            <Form.Label>Confirmar senha</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (password: string) => setPassword(password) } placeholder="Confirmar senha" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicState">
            <Form.Label>Estado</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (estado: string) => setEstado(estado) } placeholder="Estado" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicCity">
            <Form.Label>Cidade</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (cidade: string) => setCidade(cidade) } placeholder="Cidade" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicBairro">
            <Form.Label>Bairro</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (bairro: string) => setBairro(bairro) } placeholder="Bairro" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicRua">
            <Form.Label>Rua</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (rua: string) => setRua(rua) } placeholder="Rua" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicNumber">
            <Form.Label>Numero</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (numero: string) => setNumero(numero) } placeholder="Numero" />
          </Form.Group>

          <Form.Group className='mb-3' controlId="formBasicComplement">
            <Form.Label>Complemento</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (complemento: string) => setComplemento(complemento) } placeholder="Complemento" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Concordo com os termos de uso" />
            <Form.Check type="checkbox" label="Concordo com a política de privacidade" />
          </Form.Group>
          
          <Button variant="outline-danger" type="submit" onClick={handleSubmit}>
            Registrar-se
          </Button>
        </Form>
    </View>
  );
}

export default OperationScreen


