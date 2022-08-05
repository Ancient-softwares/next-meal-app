// import React from 'react';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps'
import { Text, View } from '../components/Themed';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styles from '../styles/MapsScreen.style';


export default function MapsScreen() {
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBg1UtZII7XxZhq82Arr1noy99uShCP3Bs"
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  
  return isLoaded ? (
    <View style={styles.container}>
      {/* <MapView style={{ 
        flex: 1,
        width: '100%',
        height: '100%',
      }}
      region={{
        latitude: 42.882004, 
        longitude: 74.582748, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421
      }}/> */}
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: '100%',
        }}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
    </View>
  ) : <View>
    <Text>Oops</Text>
  </View>
}


