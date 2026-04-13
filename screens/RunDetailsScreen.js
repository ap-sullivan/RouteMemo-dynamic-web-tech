//  screen to show individual run details and have option to add notes edit and add photos etc

import { Text, View, Alert, ScrollView } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useEffect, useState, useLayoutEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import RunSummary from "../components/RunSummary";
import AddNotes from "../components/AddNotes";
import UploadPhoto from "../components/UploadPhoto";
import DeleteButton from "../components/DeleteButton";
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

  // function to save notes to specific runs based on runid and update local state to show changes immediately
  const saveNote = async (notes) => {
    const existing = await AsyncStorage.getItem("activities");

    // if there are existing activities, parse them, otherwise start with an empty array
    const parsed = existing ? JSON.parse(existing) : [];

    // map through activities and update the one that matches the current runId 
    const updated = parsed.map((item) =>
      item.id === runId ? { ...item, notes: notes } : item,
    );

    // save the updated array back to async storage
    await AsyncStorage.setItem("activities", JSON.stringify(updated));

    setRun((prev) => ({ ...prev, notes }));

    Alert.alert("Saved", "Your notes were updated");
  };

  // function to delete run from async storage and navigate back to list screen
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
          "Camera access is needed to take photos",
        );
        return;
      }
    }

    setShowCamera(true);
  };

  // hide tab bar when camera is open
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: showCamera ? { display: "none" } : undefined,
    });
  }, [navigation, showCamera]);

  const savePhoto = async (uri) => {
    const updatedRun = await addPhotoToRun(runId, uri);
    setRun(updatedRun);
  };

  // function to delete photo from run updates async and local state
  // index is used to identify which photo to delete as multiple photos can have same uri
  const deletePhoto = async (index) => {
    const existing = await AsyncStorage.getItem("activities");
    const parsed = existing ? JSON.parse(existing) : [];

    const updated = parsed.map((item) => {
      if (item.id === runId) {
        const updatedPhotos = item.photos.filter((_, i) => i !== index);
        return { ...item, photos: updatedPhotos };
      }
      return item;
    });

    await AsyncStorage.setItem("activities", JSON.stringify(updated));

    setRun((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
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
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 60 }}>
        <Map route={run.route} />

        <RunSummary
          run={run}
          onOpenCamera={handleOpenCamera}
        />

        <AddNotes run={run} onSaveNote={saveNote} />

        <UploadPhoto
          photos={run.photos}
          onOpenCamera={handleOpenCamera}
          onDeletePhoto={deletePhoto}
        />

        <DeleteButton id={run.id} onDelete={deleteRun} />
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
    flexGrow: 1,
    backgroundColor: Colors.background,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
  },
};
