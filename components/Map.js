import React from 'react'
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';



function Map() {
  return (
  <View style={styles.container}>
       <MapView
        style={styles.map}
        initialRegion={{
          latitude: 55.8436,
          longitude: -4.4292,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}
      />
    </View>
  )
}

export default Map

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: 300,
  },
});