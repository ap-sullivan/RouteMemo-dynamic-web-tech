import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

function Map() {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);

  // request permissions and get current location 
  useEffect(() => {
    (async () => {

      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission denied');
        return;
      }

      // ? Paisley location 
      //Latitude: 55.8436
      // Longitude: -4.4292

      // Get current location
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // Animate map to current location
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    })();
  }, 
  []);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        zoomControlEnabled={true}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        )}
      </MapView>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 300,
  },
});