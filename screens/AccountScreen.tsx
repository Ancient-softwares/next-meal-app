import * as dotenv from 'dotenv';
dotenv.config()
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, ListGroup } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import styles from '../styles/AccountScreen.style'
import { MaterialIcons, Ionicons, FontAwesome, MaterialCommunityIcons, Entypo, Feather } from '@expo/vector-icons';
import axios from 'axios';
import { RootTabScreenProps } from '../types';

const AccountScreen = ({ navigation }: RootTabScreenProps<'Account'>) => {
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
                onClick={() => navigation.navigate('Login')}
                >Entrar</Button>
                <Button variant="outline-danger"
                style={{
                    width: '8em',
                    marginTop: 15,
                    marginLeft: 5,
                }}
                onClick={() => navigation.navigate('Register')}
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
    </SafeAreaView>
  );
}

export default AccountScreen