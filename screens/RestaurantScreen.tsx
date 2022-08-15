import React from 'react';
import { View, Text, SafeAreaView, Image } from 'react-native';
import styles from '../styles/RestaurantScreen.style';

export default class RestaurantScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require('../assets/images/example.jpeg')} style={styles.image} />
      </SafeAreaView>
    );
  }
}