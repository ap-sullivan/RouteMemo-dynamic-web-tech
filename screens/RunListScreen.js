
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from "@react-native-async-storage/async-storage";

function RunList() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const existing = await AsyncStorage.getItem("activities");
        const parsed = existing ? JSON.parse(existing) : [];
        // sort by timestamp descending (latest first)
        parsed.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setActivities(parsed);
      } catch (e) {
        console.error("Failed to load activities", e);
      }
    };

    loadActivities();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <Text style={styles.cell}>
        {new Date(item.timestamp).toLocaleString()}
      </Text>
      <Text style={styles.cell}>{(item.distance / 1000).toFixed(2)} km</Text>
      <Text style={styles.cell}>{item.duration.toFixed(1)} s</Text>
      <Text style={styles.cell}>{item.speed.toFixed(1)} m/s</Text>
    </View>
  );

  return (
       <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.row, styles.header]}>
        <Text style={styles.cell}>#</Text>
        <Text style={styles.cell}>Date / Time</Text>
        <Text style={styles.cell}>Distance</Text>
        <Text style={styles.cell}>Duration</Text>
        <Text style={styles.cell}>Speed</Text>
      </View>
      <FlatList
        data={activities}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default RunList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
  },
  header: {
    borderBottomWidth: 2,
    backgroundColor: "#f2f2f2",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
});