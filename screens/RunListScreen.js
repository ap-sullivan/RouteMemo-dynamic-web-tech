
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RunList from "../components/RunList";

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
  }, []);

  return (
       <SafeAreaView style={styles.container}>
        <View>
          <Text> Area for an overview of all runs, add some stats liek total runs, average time, average spoeed etc</Text>
        </View>
      <RunList
      activities={activities}
      onPressItem={(run) =>
        // pass param to details screen to show specific run details
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