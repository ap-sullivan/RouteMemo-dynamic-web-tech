import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pedometer } from "expo-sensors";
import * as Location from "expo-location";
import { calculateDistance } from "../utils/distance";
import CurrentActivitySummary from "./CurrentActivitySummary";
import Colors from "../constants/Colors";

function StartButton({ route, setRoute }) {
  
  // state for recording status and location
  const [recording, setRecording] = useState(false);
  const [location, setLocation] = useState(null);

  // state for duration of activity
  const [startTime, setStartTime] = useState(null);
  const watchId = useRef(null);
  const [duration, setDuration] = useState(0);

  //  state for step count
  const [steps, setSteps] = useState(0);
  const pedometerSubscription = useRef(null);

  // request location and pedometer permissions on mount
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location is required to use the app");
      }

      // pedometer
      const { status: pedometerStatus } =
        await Pedometer.requestPermissionsAsync();

      if (pedometerStatus !== "granted") {
        alert("Permission to access pedometer is required to use the app");
      }
    })();
  }, []);

  const startRecording = async () => {
    // reset route and start time
    setRoute([]);
    // get start time and save to state
    setStartTime(new Date());
    // change recording state to true
    setRecording(true);
    // reset steps
    setSteps(0);

    const isAvailable = await Pedometer.isAvailableAsync();
    console.log("Pedometer available:", isAvailable);

    // start pedometer
    pedometerSubscription.current = Pedometer.watchStepCount((result) => {
      setSteps(result.steps);
    });

    // watch loc at interval and save to array in state

    //  ? FOR ANDROID TESTING WHEN LOADING GPX FILE
    // watchId.current = await Location.watchPositionAsync(
    //   {
    //     accuracy: Location.Accuracy.Highest,
    //     timeInterval: 1000,
    //     distanceInterval: 0,
    //   },
    //   (loc) => {
    //     setLocation(loc.coords);
    //     setRoute((prev) => [...prev, loc.coords]);
    //   },
    // );

    //  ? IOS intervals
    watchId.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 3000,
        distanceInterval: 5,
      },
      (loc) => {
        setLocation(loc.coords);
        setRoute((prev) => [...prev, loc.coords]);
      },
    );
  };

  // timer showing duration while recording run
  useEffect(() => {
    let interval;

    if (recording && startTime) {
      interval = setInterval(() => {
        const now = new Date();
        setDuration((now - startTime) / 1000);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [recording, startTime]);

  // stop recording and save route to async function
  const stopRecording = async () => {
    setRecording(false);

    // stop pedometer
    if (pedometerSubscription.current) {
      pedometerSubscription.current.remove();
      pedometerSubscription.current = null;
    }
    // stop location tracking
    if (watchId.current) {
      watchId.current.remove();
      watchId.current = null;
    }

    // work out duration, distance speed
    const endTime = new Date();
    const duration = (endTime - startTime) / 1000;
    const distance = calculateDistance(route);
    // save as km/h
    const speed = duration > 0 ? (distance / duration) * 3.6 : 0;

    // create object with run data to save to async storage
    const activityLog = {
      id: Date.now().toString(),
      route,
      startPoint: route[0],
      endPoint: route[route.length - 1],
      duration,
      distance,
      speed,
      steps,
      timestamp: startTime.toISOString(),
      notes: "Add your notes here",
    };

    //  save to async storage
    try {
      // get existing activities from storage or start with empty array
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
    // setStartTime(null);
    // setDuration(0);
  };

  const handleStart = () => {
    if (recording) stopRecording();
    else startRecording();
  };

  //  calculate distance using util function that uses haversine formula
  const distance = calculateDistance(route);

  // speed calculation for km/h
  const speed = duration > 0 ? (distance / duration) * 3.6 : 0;

  //end time
  const endTime = startTime
    ? new Date(startTime.getTime() + duration * 1000)
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.startContainer}>
        <Text style={styles.title}>
          {recording ? "Recording..." : "Start Activity"}
        </Text>
        <Pressable onPress={handleStart} style={styles.buttonContainer}>
          <Feather name="power" size={108} color={Colors.primaryDark} />
        </Pressable>
      </View>

      <View style={styles.summaryContainer}>
        <CurrentActivitySummary
          distance={distance}
          duration={duration}
          speed={speed}
          // target={10}
          steps={steps}
        />
      </View>
    </View>
  );
}

export default StartButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },

  startContainer: {
    marginTop: 30,
    alignItems: "center",
  },

  title: {
    color: Colors.primary,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  buttonContainer: {
    width: 150,
    height: 150,
    borderRadius: 80,
    backgroundColor: Colors.grayLight,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: Colors.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },

  summaryContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
