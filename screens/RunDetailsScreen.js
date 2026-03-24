//  screen to show individual run details and have option to add notes edit and add photos etc

import { Text, View, Alert, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import RunSummary from "../components/RunSummary";
import Camera from "../components/Camera";
import Colors from "../constants/Colors";
import { useCameraPermissions } from "expo-camera";
import { addPhotoToRun } from "../utils/addPhoto";

function RunDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { runId } = route.params;

  const [run, setRun] = useState(null);

  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  // load exercise details based on runid passed from list screen
  useEffect(() => {
    const loadRun = async () => {
      const existing = await AsyncStorage.getItem("activities");
      const parsed = existing ? JSON.parse(existing) : [];

      const selectedRun = parsed.find((item) => item.id === runId);

      setRun(selectedRun);
    };

    loadRun();
  }, [runId]);

  // function to save notes to specific run updates async and local state
  const saveNote = async (notes) => {
    const existing = await AsyncStorage.getItem("activities");
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = parsed.map((item) =>
      item.id === runId ? { ...item, notes: notes } : item,
    );

    await AsyncStorage.setItem("activities", JSON.stringify(updated));

    setRun((prev) => ({ ...prev, notes }));

    Alert.alert("Saved", "Your notes were updated");
  };

  // function to delete run from async storage  and navigate back to list screen
  const deleteRun = async (id) => {
    const existing = await AsyncStorage.getItem("activities");
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = parsed.filter((item) => item.id !== id);

    await AsyncStorage.setItem("activities", JSON.stringify(updated));

    Alert.alert("Deleted", "The run was deleted");
    navigation.goBack();
  };

 
  const handleOpenCamera = async () => {
  if (!permission || permission.status !== "granted") {

    console.log("permission before:", permission);

    const result = await requestPermission();

    console.log("permission result:", result);

    if (result.status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera access is needed to take photos"
      );
      return;
    }
  }

  setShowCamera(true);
};

  const savePhoto = async (uri) => {
    const updatedRun = await addPhotoToRun(runId, uri);
    setRun(updatedRun);
  };

  // show loading if not ready
  if (!run) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
   
    <SafeAreaView style={styles.container}>
  <ScrollView>
    <Map />

    <RunSummary
      run={run}
      onSaveNote={saveNote}
      onDelete={deleteRun}
      onOpenCamera={handleOpenCamera}
    />
  </ScrollView>

{/* if showCamera is true, display the camera component as an overlay */}
  {showCamera && (
    <View style={styles.overlay}>
      <Camera
        onPhotoTaken={(uri) => {
          if (uri) savePhoto(uri);
          setShowCamera(false);
        }}
      />
    </View>
  )}
</SafeAreaView>


  );
}

export default RunDetailsScreen;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  overlay: {
     position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "black"
  }
};
