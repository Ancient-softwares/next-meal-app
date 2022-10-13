import React from 'react';
import { Dimensions, Pressable, SafeAreaView, ScrollView } from 'react-native';
import styles from './style';
import { Text, View } from 'react-native';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-native-gesture-handler';
import { ListGroup, Carousel } from 'react-bootstrap';

const HomeScreen = ({ navigation }) => {
  const exampleImage = require('../../assets/example.jpeg');
  const logo = require('../../assets/logo.png');
  function OnPressButton(){
    alert('Click made!')
  }
  return (
    <SafeAreaView style={styles.container}> 
      <ScrollView
      showsVerticalScrollIndicator={false}
      >
          <View style={styles.navHome}>
      <img src={logo} className="" style={{ width: 300, height: 200, paddingTop:-10}}/>
        <Text>Caçando coisa pra colocar. Sei que tá horrivel essa logo ai tb 9kakakak</Text>
      </View>
      <View style={styles.carousel}>
        <Carousel span={false}>
      <Carousel.Item interval={6000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="First slide"
          style={styles.carousel}
        />
        <Carousel.Caption>
          <h3>Veja os restaurantes perto de você.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={6000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="Second slide"
          style={styles.carousel}
        />

        <Carousel.Caption>
          <h3>Economize tempo na hora de realizar sua reserva.</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={6000}>
        <img
          className="d-block w-100"
          src={exampleImage}
          alt="Third slide"
          style={styles.carousel}
        />

        <Carousel.Caption>
          <h3>Conosco você pode visualizar o pratos do restaurantes que selecionar.</h3>
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
        <div style={styles.spaceCategory} >
          <img src={exampleImage} onClick={OnPressButton}  className="rounded-circle" style={{ width: 90, height: 90, marginLeft: 10, marginRight: 10 }}/>
          <Text style={styles.nameCategory}>Seilá</Text>
          </div>
          {/* <img src={exampleImage} className="rounded-circle" style={{ width: 90, height: 90, marginLeft: 10, marginRight: 10 }}/>
          <Text style={styles.nameCategory}>Japonesa</Text> */}
        </Pressable>
        <Pressable>
          {/* <img src={exampleImage} className="rounded-circle" style={{ width: 90, height: 90, marginLeft: 10, marginRight: 10 }}/>
          <Text style={styles.nameCategory}>Brasileira</Text> */}
            <div style={styles.spaceCategory}>
          <img src={exampleImage} onClick={OnPressButton} className="rounded-circle" style={{ width: 90, height: 90, marginLeft: 10, marginRight: 10 }}/>
          <Text style={styles.nameCategory}>Seilá</Text>
          </div>
        </Pressable>
        <Pressable>
        <div style={styles.spaceCategory}>
          <img src={exampleImage} onClick={OnPressButton} className="rounded-circle" style={{ width: 90, height: 90, marginLeft: 10, marginRight: 10 }}/>
          <Text style={styles.nameCategory}>Seilá</Text>
          </div>
        </Pressable>
        <Pressable>
        <div style={styles.spaceCategory}>
          <img src={exampleImage} onClick={OnPressButton} className="rounded-circle" style={{ width: 90, height: 90, marginLeft: 10, marginRight: 10 }}/>
          <Text style={styles.nameCategory}>Seilá</Text>
          </div>
        </Pressable>
        <Pressable>
        <div style={styles.spaceCategory}>
          <img src={exampleImage} onClick={OnPressButton} className="rounded-circle" style={{ width: 90, height: 90, marginLeft: 10, marginRight: 10 }}/>
          <Text style={styles.nameCategory}>Seilá</Text>
          </div>
        </Pressable>
        <Pressable>
          <div style={styles.spaceCategory}>
          <img src={exampleImage} onClick={OnPressButton} className="rounded-circle" style={{ width: 90, height: 90, marginLeft: 10, marginRight: 10 }}/>
          <Text style={styles.nameCategory}>Seilá</Text>
          </div>
        </Pressable>
    </ScrollView>
    <hr style={styles.lineStyle}/>
      </View>
    <View>
      <Text style={styles.subtitle}>Reservados recentemente</Text>
      <Text style={styles.description}>Estabelecimentos que você visitou recentemente</Text>
      <ListGroup as='ul'>
        <ListGroup.Item 
        onClick={OnPressButton}
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
        onClick={() => navigation.navigate('Restaurant')} //?
      >
        <img src={exampleImage} className="rounded-circle" style={{ width: 40, height: 40, marginLeft: 10, marginRight: 10 }}/>
        <div className="ms-2 me-auto">
          <div className="fw-bold">Bar do João</div>
        </div>
        </ListGroup.Item>
        <ListGroup.Item 
        onClick={OnPressButton}
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
        onClick={OnPressButton}
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