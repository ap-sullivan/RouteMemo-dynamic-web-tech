import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { calculateDistance } from "../utils/distance";

function StartButton() {
  const [recording, setRecording] = useState(false);
  const [location, setLocation] = useState(null);

  const [route, setRoute] = useState([]);

  const [startTime, setStartTime] = useState(null);
  const watchId = useRef(null);

  // request location permission on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location is required to use the app");
      }
    })();
  }, []);

  const startRecording = async () => {
    1; // reset route and start time when starting a new recording
    setRoute([]);
    // get start time and save to state
    setStartTime(new Date());
    // change recording state to true
    setRecording(true);

    // watch loc at interval of 5m and save to array in state
    watchId.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.Highest, distanceInterval: 5 },
      (loc) => {
        setLocation(loc.coords);
        setRoute((prev) => [...prev, loc.coords]);
      },
    );
  };

  // stop recording and save route to async function
  const stopRecording = async () => {
    setRecording(false);
    if (watchId.current) {
      watchId.current.remove();
      watchId.current = null;
    }

    // work out duration distance speed
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000;
    const distance = calculateDistance(route);
    const speed = distance / duration;

    // create object with run data to save to async storage
    const activityLog = {
      id: Date.now().toString(),
      route,
      startPoint: route[0],
      endPoint: route[route.length - 1],
      duration, 
      distance, 
      speed, 
      timestamp: startTime.toISOString(),
      notes: "Great bit of exercise!",
    };

    //  save to async storage
    try {
      const existing = await AsyncStorage.getItem("activities");
      const parsed = existing ? JSON.parse(existing) : [];
      // push new activity to array and save back to storage
      parsed.push(activityLog);
      // stringify and save to storage
      await AsyncStorage.setItem("activities", JSON.stringify(parsed));

      console.log("Activity saved:", activityLog);
    } catch (e) {
      console.error("Failed to save activity", e);
    }

    // reset route and start time for next time
    setRoute([]);
    setStartTime(null);
  };

  const handleStart = () => {
    if (recording) stopRecording();
    else startRecording();
  };

  const distance = calculateDistance(route);

  return (
    <View style={styles.startContainer}>
      <Text style={styles.title}>
        {recording ? "Recording..." : "Start Activity"}
      </Text>
      <Pressable onPress={handleStart}
      style={styles.buttonContainer}>
        <Feather
          name="power"
          size={124}
          color="red"
          // style={styles.buttonStyle}
        />
      </Pressable>
    </View>
  );
}

export default StartButton;

const styles = StyleSheet.create({
  startContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
