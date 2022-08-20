import React from 'react';
import { Carousel, Col, Container, ListGroup, Row, Stack } from 'react-bootstrap';
import { View, Text, SafeAreaView, Image } from 'react-native';
import styles from '../styles/RestaurantScreen.style';
import { RootTabScreenProps } from '../types';

const RestaurantScreen = ({ navigation }: RootTabScreenProps<'Operation'>) => {
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

        <Container style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginBottom: '15%',
        }}>
          <Stack direction="horizontal" gap={2}>
            <div className="bg-light">
              <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
            </div>
            <div className="bg-light">
              <Text style={styles.subtitle}>João's Bar</Text>
              <br />
              <Text style={styles.description}>Rua Veiga Filho, 44, Higienópolis, São Paulo</Text>
            </div>
          </Stack>
        </Container>
      </SafeAreaView>
    );
}

export default RestaurantScreen