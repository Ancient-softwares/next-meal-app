import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, ListGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/AccountScreen.style'
import { MaterialIcons, Ionicons, FontAwesome, MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import axios from 'axios';

const AccountScreen = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  
  const handleShowLogin = () => setShowLogin(true);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);

  const API_URL = 'http://127.0.0.1:8000'

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [cel, setCellphone] = useState('');
  const [password, setPassword] = useState('');
  const [foto, setFoto] = useState('');
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [complemento, setComplemento] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [dataAtualizacao, setDataAtualizacao] = useState('');

  const registerIsset = (name: string, cpf: string, cel: string, password: string,  foto:string, email: string, cep: string, rua: string, numero: string, bairro: string, cidade: string, estado: string) => {
    if (!name || !cpf || !cel || !password || !foto || !email || !cep || !rua || !numero || !bairro || !cidade || !estado) {
      return false;
    }

    return true;
  }

  const loginIsset = (email: string, password: string) => {
    if (!email || !password) {
      return false;
    } 
  
    return true;
  }


  // usar useEffect(() => {}, [() => register(parametros)]); se der merda
  const register = async () => {
    if (!registerIsset(name, cpf, cel, password, '../assets/images/user.png', email, cep, rua, numero, bairro, cidade, estado)) {
      setError('Preencha todos os campos!');
    } else {
      try {
        const response = await axios.post(`${API_URL}/mobile/registro`, {
          name,
          cpf,
          cel,
          password,
          foto: "../assets/images/user.png",
          email,
          cep,
          rua,
          numero,
          bairro,
          cidade,
          estado,
          complemento,
        });

        setSuccess('Cadastro realizado com sucesso!');
        window.alert('Cadastro realizado com sucesso!');
      } catch (err: any) {
        setError(err.response.data.error);
        window.alert(err.response.data.error);
      }
    }
  }

  const login = async () => {
    if (!loginIsset(email, password)) {
      setError('Preencha todos os campos!');
    } else {
      try {
        const response = await axios.post(`${API_URL}/mobile/login`, {
          email,
          password
        });

        setSuccess('Login realizado com sucesso!');
        window.alert('Login realizado com sucesso!');
      } catch (err: any) {
        console.log(err)
        setError(err.response.data.error);
        window.alert(err.response.data.error);
      }
    }
  }

  const teste = async (e: Event) => {
    e.preventDefault();
    
    try {
      const response = await axios.get(`${API_URL}/mobile/teste`);

      console.log(response.data)
      
      window.alert('Teste realizado com sucesso!' + response.data);
    } catch (err) {
      console.log(err)
      window.alert('Erro ao realizar teste!');
    }
  }

  const soma = async (event: Event) => {
    event.preventDefault()
    
    try {
      const response = await axios.get(`${API_URL}/mobile/teste`);
      const paidoglauber = await response.data
      // a add .

      window.alert('Conectado com sucesso!');
      window.alert(paidoglauber)
    } catch(err) {
      console.log(err);
    }
  }

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
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (email: string) => setEmail(email) } placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <br></br>
            <TextInput style={ styles.modalInput } onChangeText={ (email: string) => setEmail(email) } placeholder="Password" />
          </Form.Group>
          <Button formAction='#' variant="outline-danger" type="submit" onSubmit={() => teste()}>
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
          
          <Button variant="outline-danger" type="submit" onClick={() => register()}>
            Registrar-se
          </Button>
        </Form>
        </Modal.Body>
      </Modal>
    </SafeAreaView>
  );
}

export default AccountScreen