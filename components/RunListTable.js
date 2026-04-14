// component that renders a table of previous activities 
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { getTimeParts } from "../utils/time";
import Colors from "../constants/Colors";

function RunListTable({ activities, onPressItem }) {
  const renderItem = ({ item }) => (
    <Pressable onPress={() => onPressItem(item)}>
      <View style={styles.row}>
        <Text style={styles.cell}>
          {new Date(item.timestamp).toLocaleDateString("en-GB")}
        </Text>
        <Text style={styles.cell}>{(item.distance / 1000).toFixed(2)} km</Text>
        <Text style={styles.cell}>
          {(() => {
            const { minutes, seconds } = getTimeParts(item.duration);
            return `${minutes}m : ${seconds.toString().padStart(2, "0")}s`;
          })()}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <FlatList
      data={activities}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      ListHeaderComponent={
        <View style={styles.headerRow}>
          <Text style={styles.headerCell}>Date</Text>
          <Text style={styles.headerCell}>Distance</Text>
          <Text style={styles.headerCell}>Duration</Text>
        </View>
      }
    />
  );
}

export default RunListTable;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 6,
    marginBottom: 6,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primaryDark,
  },

  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: Colors.primaryLightest,
    paddingVertical: 5,
  },

  cell: {
    flex: 1,
    textAlign: "center",
    color: Colors.primary,
    paddingVertical: 4,
  },
});
