// component to display map with current location and route depending on props, used in both current activity and exercise detail screens

import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import Colors from "../constants/Colors";

function Map({ route, recording }) {

  // state for current location and ref for map to control view
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  
  // ? Paisley location
  //Latitude: 55.8436
  // Longitude: -4.4292

  // request permissions and get current location
  useEffect(() => {
    // skip if route already present (for detail screen)
    if (route && route.length > 0) return;

    (async () => {
      // Request location permissions
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission denied");
        return;
      }

      // Get current location
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    })();
  }, [route]);

  // use effect to fit map to route coordinates when route changes
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
          showsUserLocation={true}
          zoomControlEnabled={true}
        >

          {/* show current location marker if no route provided */}
          {!route && location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
            />
          )}

          {/* Route line - if no route provided show current activity */}
          {route && route.length > 0 && (
            <>
              <Marker coordinate={route[0]} title="Start" />

            {/*  only show end point if not recording */}
              {!recording && (
                <Marker
                  coordinate={route[route.length - 1]}
                  title="End"
                  pinColor="red"
                />
              )}

              <Polyline
                coordinates={route}
                strokeColor="black"
                strokeWidth={3}
                lineDashPattern={[6, 6]}
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

  // mapOverlay: {
  //   position: "absolute",
  //   top: 0,
  //   left: 0,
  //   width: "100%",
  //   height: 300,
  //   backgroundColor: "rgba(0, 70, 0, 0.3)",
  // },
});
