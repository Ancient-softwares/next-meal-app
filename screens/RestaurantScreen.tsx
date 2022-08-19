import React from 'react';
import { Carousel } from 'react-bootstrap';
import { View, Text, SafeAreaView, Image } from 'react-native';
import styles from '../styles/RestaurantScreen.style';

export default class RestaurantScreen extends React.Component {
  render() {
    const exampleImage = require('../assets/images/example.jpeg')
    
    return (
      <SafeAreaView style={styles.container}>
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
      </SafeAreaView>
    );
  }
}