import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Colors from "../constants/Colors";

function Map({ route }) {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);

  // request permissions and get current location
  useEffect(() => {
    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      // ? Paisley location
      //Latitude: 55.8436
      // Longitude: -4.4292

      // Get current location
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      // Animate map to current location if no route provided
      if (!route) {
      mapRef.current?.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
    })();
  }, []);

  // Fit map to route coordinates when route changes
  useEffect(() => {
  if (route && route.length > 0) {
    mapRef.current?.fitToCoordinates(route, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  }
}, [route]);

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          showsUserLocation={!route}
          zoomControlEnabled={true}
        >
          {!route && location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          )}

          {/* Route */}
          {route && route.length > 0 && (
            <>
              
              <Marker coordinate={route[0]} title="Start" />

              <Marker
                coordinate={route[route.length - 1]}
                title="End"
                pinColor="red"
              />

              {/* Route line */}
              <Polyline
                coordinates={route}
                strokeColor="black"
                strokeWidth={8}
              />
            </>
          )}
        </MapView>

        {/* Overlay  */}
        {/* <View pointerEvents="none" style={styles.mapOverlay} /> */}
      </View>
    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
  },

  mapContainer: {
    width: "100%",
    height: 300,
    position: "relative",
  },

  map: {
    width: "100%",
    height: "100%",
  },

  mapOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 300,
    backgroundColor: "rgba(0, 70, 0, 0.3)",
  },
});
