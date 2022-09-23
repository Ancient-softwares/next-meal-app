import React from 'react';
import { Dimensions, Pressable, SafeAreaView, ScrollView } from 'react-native';
import styles from './style';
import { Text, View } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-native-gesture-handler';
import { ListGroup, Carousel } from 'react-bootstrap';

const HomeScreen = ({ navigation }) => {
  const exampleImage = require('../../assets/favicon.png');

  return (
    <SafeAreaView style={styles.container}> 
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
      <View style={styles.carousel}>
        <Carousel fade>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Destaques</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Destaques</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
        </View>
    <View>
      <Text style={styles.subtitle}>Categorias</Text>
      <Text style={styles.description}>Escolha entre as categorias de restaurantes</Text>
    </View>
      <View style={{ width: 'auto' ,maxWidth: Dimensions.get('screen').width }}>
    <ScrollView 
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
        <Pressable>
          <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10 }}/>
        </Pressable>
        <Pressable>
          <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10 }}/>
        </Pressable>
        <Pressable>
          <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10 }}/>
        </Pressable>
        <Pressable>
          <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10 }}/>
        </Pressable>
        <Pressable>
          <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10 }}/>
        </Pressable>
        <Pressable>
          <img src={exampleImage} className="rounded-circle" style={{ width: 70, height: 70, marginLeft: 10, marginRight: 10 }}/>
        </Pressable>
    </ScrollView>
      </View>
    <View>
      <Text style={styles.subtitle}>Reservados recentemente</Text>
      <Text style={styles.description}>Estabelecimentos que você visitou recentemente</Text>
      <ListGroup as='ul'>
        <ListGroup.Item 
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}>
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do Armando</div>
        </div>
        </ListGroup.Item>
        <ListGroup.Item 
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
        onClick={() => navigation.navigate('Restaurant')}
      >
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do João</div>
        </div>
        </ListGroup.Item>
        <ListGroup.Item 
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do Zézin</div>
        </div>
        </ListGroup.Item>
        <ListGroup.Item 
        as="li"
        className="d-flex justify-content-between align-items-start"
        style={{ border: 'none', marginTop: 10, marginBottom: 10 }}
      >
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do Edinaldo</div>
        </div>
        </ListGroup.Item>
      </ListGroup>
    </View>
    </ScrollView>
    </SafeAreaView>
    );
}

export default HomeScreen;