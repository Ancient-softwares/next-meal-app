import React from 'react';
import { Text, View } from 'react-native';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styles from './style';

export default function MapsScreen() {
  const MAPS_ID = process.env.ID || 'google-map-script';
  const GOOGLE_MAPS_APIKEY = process.env.TOKEN || 'AIzaSyCmrE9qeUQP20VEA6AT53UKRDNqbywCvYw';

  const center = {
    lat: -23.552990263455296,
    lng: -46.39968223122055
  };

  const { isLoaded } = useJsApiLoader({
    id: MAPS_ID,
    googleMapsApiKey: GOOGLE_MAPS_APIKEY,
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <View style={styles.container}>
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
        <></>
      </GoogleMap>
    </View>
  ) : <View>
    <Text>Oops</Text>
  </View>;
}
