// component to display summary of a run on teh run details screen

import { Text, View, StyleSheet } from "react-native";
import { useState } from "react";
import Colors from "../constants/Colors";
import { getTimeParts } from "../utils/time";

function RunSummary({ run }) {
  // state to hold notes input with existing notes as initial value
  const [notes, setNotes] = useState(run.notes || "");

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.title}>Exercise Stats</Text>

        <View style={styles.rowWrapper}>
          <View style={styles.itemWrapper}>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.value}>
              {new Date(run.timestamp).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
            </Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.label}>Start Time: </Text>
            <Text style={styles.value}>
              {new Date(run.timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </View>
        </View>

        <View style={styles.rowWrapper}>
          <View style={styles.itemWrapper}>
            <Text style={styles.label}>Distance: </Text>
            <Text style={styles.value}>
              {" "}
              {(run.distance / 1000).toFixed(2)} km
            </Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.label}>Duration: </Text>
            <Text style={styles.value}>
              {(() => {
                const { minutes, seconds } = getTimeParts(run.duration);
                return `${minutes}m : ${seconds.toString().padStart(2, "0")}s`;
              })()}
            </Text>
          </View>
        </View>

        <View style={styles.rowWrapper}>
          <View style={styles.itemWrapper}>
            <Text style={styles.label}>Avg. Speed: </Text>
            <Text style={styles.value}>{run.speed.toFixed(2)} km/h</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.label}>Steps: </Text>
            <Text style={styles.value}>{run.steps}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default RunSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    padding: 20,
  },

  statsContainer: {
    paddingHorizontal: 12,
  },

  title: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  rowWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  itemWrapper: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.primaryDark,
    fontWeight: "bold",
  },

  value: {
    fontSize: 16,
    color: Colors.primary,
  },

  photo: {
    borderWidth: 3,
    borderColor: Colors.primaryLight,
    width: "100%",
    height: 200,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
  },
});
