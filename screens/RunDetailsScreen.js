//  screen to show individual run details and have option to add notes edit and add photos etc


import { Text, View, StyleSheet } from 'react-native'
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context'
import Map from '../components/Map';

function RunDetailsScreen() {

  const route = useRoute();
  const { runId } = route.params;

  const [run, setRun] = useState(null);

  useEffect(() => {
    const loadRun = async () => {
      const existing = await AsyncStorage.getItem("activities");
      const parsed = existing ? JSON.parse(existing) : [];

      const selectedRun = parsed.find((item) => item.id === runId);

      setRun(selectedRun);
    };

    loadRun();
  }, [runId]);

  if (!run) {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView style={{ flex: 1 }}>
         <View>
            <Text>Individual Run Details</Text>
         <Map />
         
         <View style={styles.detailContainer}>
        <Text style={styles.title}>Run Details</Text>

      <Text>Date: {new Date(run.timestamp).toLocaleString()}</Text>
      <Text>Distance: {(run.distance / 1000).toFixed(2)} km</Text>
      <Text>Duration: {run.duration.toFixed(1)} seconds</Text>
      <Text>Speed: {run.speed.toFixed(2)} m/s</Text>
      <Text>Notes: {run.notes}</Text>
        <View> 
            <Text>Area to view add photos</Text>
            </View>
         </View>

         </View>
    </SafeAreaView>
      
    
  )
}

export default RunDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
});