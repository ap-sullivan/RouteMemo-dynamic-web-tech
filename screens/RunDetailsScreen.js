//  screen to show individual run details and have option to add notes edit and add photos etc

import { Text, View, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import RunSummary from "../components/RunSummary";

function RunDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { runId } = route.params;

  const [run, setRun] = useState(null);

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
    item.id === runId ? { ...item, notes: notes } : item
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
}

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
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Map />
        <RunSummary run={run} onSaveNote={saveNote} onDelete={deleteRun} />
      </View>
    </SafeAreaView>
  );
}

export default RunDetailsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
 
// });
