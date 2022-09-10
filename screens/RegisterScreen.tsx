import * as dotenv from 'dotenv'
dotenv.config()
import React, { useState } from 'react';
import { View } from '../components/Themed';
import styles from '../styles/RegisterScreen.style';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Dimensions, Text, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RootStackScreenProps, RootTabScreenProps } from '../types';
import { cpf } from 'cpf-cnpj-validator';
import Joi from 'joi';
import MaskInput from 'react-native-mask-input'

const API_URL = process.env.URL || 'http://127.0.0.1:8000'

const RegisterScreen = ({ navigation }: RootStackScreenProps<"Register">) => {  
   const [name, setName] = useState('');
   const [cpff, setCpf] = useState('');
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
   const [message, setMessage] = useState('');

   const schema = Joi.object({
      nomeCliente:  Joi.string().alphanum().min(3).max(30).required(),
      cpfCliente: Joi.string().alphanum().min(11).max(11).required(),
      celCliente: Joi.string().alphanum().min(10).max(10).required(),
      senhaCliente: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
      fotoCliente: Joi.string().required().uri(),
      cepCliente: Joi.string().alphanum().min(8).max(8).required(),
      emailCliente: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      ruaCliente: Joi.string().required().min(3).max(30),
      numCasaCliente: Joi.number().required(),
      bairroCliente: Joi.string().required().min(3).max(30),
      cidadeCliente: Joi.string().required().min(3).max(30),
      estadoCliente: Joi.string().required().min(2).max(2)
   })

   const getAddress = async () => {
      if (cep) {
        await axios({
          method: 'get',
          url: `https://viacep.com.br/ws/${cep}/json/`,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          }, 
          data: JSON.stringify({ cep }) 
        }).then(response => {
          console.log(`Reponse: ${JSON.stringify(response.data)}`)
          
          const address = JSON.parse(JSON.stringify(response.data))
          console.log(address) 
          console.log(address.bairro) 
          
          setBairro(JSON.stringify(address.bairro))
        }).catch (error => console.log('ERROR::' + (error.response.data)))
      } else {
        return false;
      }
    } 

    const handleSubmit = async (e: Event) => {
      e.preventDefault()
      
        const packets = {
            nomeCliente:  name,
            cpfCliente: cpff,
            celCliente: cel,
            senhaCliente: password,
            fotoCliente: foto,
            cepCliente: cep,
            emailCliente: email,
            ruaCliente: rua,
            numCasaCliente: numero,
            bairroCliente: bairro,
            cidadeCliente: cidade,
            estadoCliente: estado
        };

        if (schema.validate(packets) && cpf.isValid(cpff)) {
            await axios({
              method: 'post',
              url: `${API_URL}/api/cadastroCliente`,
              headers: {
                'Accept':   'application/json',
                'Content-Type':   'application/json'
              },
              data: JSON.stringify({
                nomeCliente:  name,
                cpfCliente: cpff,
                celCliente: cel,
                senhaCliente: password,
                fotoCliente: foto,
                cepCliente: cep,
                emailCliente: email,
                ruaCliente: rua,
                numCasaCliente: numero,
                bairroCliente: bairro,
                cidadeCliente: cidade,
                estadoCliente: estado
              })
            }).then(response =>  {
              setMessage(''); 

              navigation.navigate('Account')
              console.log(`Cadastro feito com sucesso: ${JSON.stringify(response.data)}`)
            }).catch(error => console.log("ERROR:: ", error.response.data))
        } else {
          setMessage('Preencha todos os campos corretamente.')
        }
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
            {/* <TextInput style={ styles.formInput } onChangeText={ (celular: string) => setCellphone(celular) } placeholder="Celular" /> */}
            <MaskInput
            style={ styles.formInput }
              value={cel}
              onChangeText={(masked, unmasked) => {
                setCellphone(masked); // you can use the unmasked value as well

                console.log(masked); // (99) 99999-9999
              }}
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCPF">
            <Form.Label>CPF</Form.Label>
            <br></br>
           {/*  <TextInput style={ styles.formInput } onChangeText={ (cpf: string) => setCpf(cpf) } placeholder="CPF" /> */}
           <MaskInput
            style={ styles.formInput }
              value={cel}
              onChangeText={(masked, unmasked) => {
                setCellphone(masked); // you can use the unmasked value as well

                console.log(masked); // 000.000.000-00
              }}
              mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicCEP">
            <Form.Label>CEP</Form.Label>
            <br></br>
            {/* <TextInput style={ styles.formInput } onChangeText={ (cep: string) => setCep(cep) } placeholder="CEP" /> */}
            <MaskInput
            style={ [styles.formInput, {
              width: Dimensions.get('window').width * 0.3
            }] }
              value={cep}
              onChangeText={(masked, unmasked) => {
                setCep(masked); // you can use the unmasked value as well

                console.log(masked); // 00000-000
              }}
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            />
            <Button style={{ 
              marginLeft: 32
              }} 
              variant="outline-danger" 
              type="submit"
              onClick={getAddress}
              >
            Encontrar endereço
          </Button>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Senha</Form.Label>
            <br></br>
            <TextInput style={ styles.formInput } onChangeText={ (password: string) => setPassword(password) } placeholder="Senha" />
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

          <View style={{ 
            marginVertical: '5%',
          }}>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Text style={{
              color: '#963333',
              fontSize: 16,
              fontWeight: 'bold'
            }}>
              {message}
            </Text>
          </Form.Group>
          </View>

        </Form>
        </ScrollView>
    </View>
  );
}

export default RegisterScreen


