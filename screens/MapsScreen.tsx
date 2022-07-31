// import React from 'react';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps'

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default function MapsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tela dos mapas</Text>
      <MapView style={{
        flex: 1
      }}
      region={{
        latitude: 42.882004, 
        longitude: 74.582748, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
      }}
      showsUserLocation={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
