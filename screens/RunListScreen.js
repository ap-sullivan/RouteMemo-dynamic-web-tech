import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RunListTable from "../components/RunListTable";

function RunListScreen({ navigation }) {
  
  const [activities, setActivities] = useState([]);

  useEffect(() => {

    const loadActivities = async () => {
      const existing = await AsyncStorage.getItem("activities");
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setActivities(parsed);
    };

    loadActivities();

    // Reload when screen is returned after delete
    const unsubscribe = navigation.addListener("focus", loadActivities);

    return unsubscribe;

  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <RunListTable
        activities={activities}
        onPressItem={(run) =>
          navigation.navigate("RunDetails", { runId: run.id })
        }
      />
    </SafeAreaView>
  );
}

export default RunListScreen ;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});