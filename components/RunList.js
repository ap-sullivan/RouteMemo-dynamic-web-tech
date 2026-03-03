import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

function RunList({ activities, onPressItem }) {
  const renderItem = ({ item, index }) => (
    <Pressable onPress={() => onPressItem(item)}>
      <View style={styles.row}>
        <Text style={styles.cell}>{index + 1}</Text>
        <Text style={styles.cell}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
        <Text style={styles.cell}>{(item.distance / 1000).toFixed(2)} km</Text>
        <Text style={styles.cell}>{item.duration.toFixed(1)} s</Text>
        <Text style={styles.cell}>{item.speed.toFixed(1)} m/s</Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
}

export default RunList;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 5,
  },

  cell: {
    flex: 1,
    textAlign: "center",
  },
});
