import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/RestaurantScreen.style';

export default class RestaurantScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>RestaurantScreen</Text>
      </View>
    );
  }
}