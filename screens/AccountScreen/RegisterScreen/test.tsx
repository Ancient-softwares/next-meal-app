import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './style';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { Dimensions, Text, TextInput, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { cpf } from 'cpf-cnpj-validator';
import Joi from 'joi';
import MaskInput from 'react-native-mask-input'
import { launchImageLibrary } from 'react-native-image-picker';

export default class Teste extends React.Component {
    setEmail = (text) => {
        this.setState({ email: text })
    }

    setNome = (text) => {
        this.setState({ nome: text })
    }

    setSenha = (text) => {
        this.setState({ senha: text })
    }

    setCpf = (text) => {
        this.setState({ cpf: text })
    }

    setTelefone = (text) => {
        this.setState({ telefone: text })
    }

    setRua = (text) => {
        this.setState({ rua: text })
    }

    setNumero = (text) => {
        this.setState({ numero: text })
    }

    setBairro = (text) => {
        this.setState({ bairro: text })
    }

    setCidade = (text) => {
        this.setState({ cidade: text })
    }

    setEstado = (text) => {
        this.setState({ estado: text })
    }

    setCep = (text) => {
        this.setState({ cep: text })
    }

    setMessage = (text) => {
        this.setState({ message: text })
    }

    
    constructor(props) {
        super(props);
        this.setEmail = this.setEmail.bind(this);
        this.setNome = this.setNome.bind(this);
        this.setSenha = this.setSenha.bind(this);
        this.setCpf = this.setCpf.bind(this);
        this.setTelefone = this.setTelefone.bind(this);
        this.setRua = this.setRua.bind(this);
        this.setNumero = this.setNumero.bind(this);
        this.setBairro = this.setBairro.bind(this);
        this.setCidade = this.setCidade.bind(this);
        this.setEstado = this.setEstado.bind(this);
        this.setCep = this.setCep.bind(this);


        this.state = {
            nomeCliente: '',
            emailCliente: '',
            senhaCliente: '',
            cpfCliente: '',
            telefoneCliente: '',
            ruaCliente: '',
            numeroCliente: '',
            bairroCliente: '',
            cidadeCliente: '',
            estadoCliente: '',
            cepCliente: '',
            message: '',
            image: null,
        }

        this.navigation = this.props.navigation;

        this.schema = Joi.object({
            nomeCliente: Joi.string().min(3).max(30).required(),
            emailCliente: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            senhaCliente: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            cpfCliente: Joi.string().pattern(new RegExp('^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$')).required(),
            telefoneCliente: Joi.string().pattern(new RegExp('^[0-9]{2} [0-9]{5}-[0-9]{4}$')).required(),
            ruaCliente: Joi.string().min(3).max(30).required(),
            numeroCliente: Joi.string().min(1).max(5).required(),
            bairroCliente: Joi.string().min(3).max(30).required(),
            cidadeCliente: Joi.string().min(3).max(30).required(),
            estadoCliente: Joi.string().min(2).max(2).required(),
            cepCliente: Joi.string().pattern(new RegExp('^[0-9]{5}-[0-9]{3}$')).required(),
        });

        this.pack = {
            nomeCliente: '',
            emailCliente: '',
            senhaCliente: '',
            cpfCliente: '',
            telefoneCliente: '',
            ruaCliente: '',
            numeroCliente: '',
            bairroCliente: '',
            cidadeCliente: '',
            estadoCliente: '',
            cepCliente: '',
        }
    }

    getAddress = async () => {
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
    
            const address = JSON.parse(JSON.stringify(response.data));
    
            console.table(JSON.parse(JSON.stringify(response.data)));
    
            setBairro(JSON.stringify(address.bairro).replace(/"/g, ''));
            setCidade(JSON.stringify(address.localidade).replace(/"/g, ''));
            setEstado(JSON.stringify(address.uf).replace(/"/g, ''));
            setRua(JSON.stringify(address.logradouro).replace(/"/g, ''));
    
          }).catch(error => console.error('ERROR::' + (error)));
        } else {
          return false;
        }
      }
    

    handleSubmit = async (event) => {
        event.preventDefault();

        if (schema.validate(this.pack) && cpf.isValid(this.state.cpfCliente)) {
        await axios({
            method: 'post',
            url: `${API_URL}/api/cadastroCliente`,
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            data: JSON.stringify(this.pack)
        }).then(response => {
            this.setMessage('');

                console.table(JSON.parse(JSON.stringify(response.data)));
                navigation.navigate('Account');
            }).catch(error => console.log("ERROR:: ", error.response.data));
            } else {
            this.setMessage('Preencha todos os campos corretamente.');
        }
    }

    handleChoosePhoto() {
        launchImageLibrary({ noData: true }, (response) => {
        if (response) {
            setFoto(response.toString());
        }
        });
    }
     
    render() {
        return (
            <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Label style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    color: '#963333',
                }}>Cadastro</Form.Label>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <br></br>
                    <TextInput style={styles.formInput} onChangeText={(email) => this.setEmail(email)} placeholder="Email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <br></br>
                    <TextInput style={styles.formInput} onChangeText={(name) => this.setName(name)} placeholder="Nome" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCelular">
                    <Form.Label>Celular</Form.Label>
                    <br></br>
                    <MaskInput
                    style={styles.formInput}
                    value={this.state.telefoneCliente}
                    onChangeText={(masked, unmasked) => {
                        this.setTelefone(masked);
                    } }
                    mask={['(', /\d/, /\d/, ')', ' ', /\d/, ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCPF">
                    <Form.Label>CPF</Form.Label>
                    <br></br>
                    <MaskInput
                    style={styles.formInput}
                    value={this.state.cpfCliente}
                    onChangeText={(masked, unmasked) => {
                        this.setCpf(masked);
                    } }
                    mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCEP">
                    <Form.Label>CEP</Form.Label>
                    <br></br>
                    <MaskInput
                    style={[styles.formInput, {
                        width: Dimensions.get('window').width * 0.3
                    }]}
                    value={this.state.cepCliente}
                    onChangeText={(masked, unmasked) => {
                        this.setCep(masked);
                    } }
                    mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]} />
                    <Button style={{
                    marginLeft: 32
                    }}
                    variant="outline-danger"
                    onClick={this.getAddress}
                    >
                    Encontrar endereço
                    </Button>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <br></br>
                    <TextInput secureTextEntry={true} style={styles.formInput} onChangeText={(password) => this.setPassword(password)} placeholder="Senha" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formBasicState">
                    <Form.Label>Estado</Form.Label>
                    <br></br>
                    <TextInput style={styles.formInput} value={this.state.estadoCliente} onChangeText={(estado) => this.setEstado(estado)} placeholder="Estado" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formBasicCity">
                    <Form.Label>Cidade</Form.Label>
                    <br></br>
                    <TextInput style={styles.formInput} value={this.state.cidadeCliente} onChangeText={(cidade) => this.setCidade(cidade)} placeholder="Cidade" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formBasicBairro">
                    <Form.Label>Bairro</Form.Label>
                    <br></br>
                    <TextInput style={styles.formInput} value={this.state.bairroCliente} onChangeText={(bairro) => this.setBairro(bairro)} placeholder="Bairro" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formBasicRua">
                    <Form.Label>Rua</Form.Label>
                    <br></br>
                    <TextInput style={styles.formInput} value={this.state.bairroCliente} onChangeText={(rua) => this.setRua(rua)} placeholder="Rua" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formBasicNumber">
                    <Form.Label>Numero</Form.Label>
                    <br></br>
                    <TextInput style={styles.formInput} value={this.state.numeroCliente} onChangeText={(numero) => this.setNumero(numero)} placeholder="Numero" />
                </Form.Group>

                <Form.Group className='mb-3' controlId="formBasicPhoto">
                    <Form.Label>Foto de perfil</Form.Label>
                    <br></br>
                    <Button variant='outline-info' onClick={this.handleChoosePhoto}>Escolher foto</Button>
                </Form.Group>



                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check id="termsCheckbox" type="checkbox" label="Concordo com os termos de uso" />
                    <Form.Check id="privacityCheckbox" type="checkbox" label="Concordo com a política de privacidade" />
                </Form.Group>

                <Button variant="outline-danger" type="submit">
                    Registrar-se
                </Button>

                <View style={{ marginVertical: '5%' }}>
                    <Form.Group className="mb-3" controlId="formBasicLogin">
                    <Text style={{
                        color: '#000000'
                    }} onPress={() => navigation.navigate('Login')}>Já  possui uma conta?<Text style={{ color: '#963333' }}> Entrar.</Text>
                    </Text>
                    </Form.Group>
                </View>

                <View style={{
                    marginVertical: '5%',
                }}>
                    <Form.Group className="mb-3" controlId="formBasicFeedback">
                    <Text style={{
                        color: '#963333',
                        fontSize: 16,
                        fontWeight: 'bold'
                    }}>
                        {this.message}
                    </Text>
                    </Form.Group>
                </View>

                </Form>
            </ScrollView>
        </View>
        )
    }
}