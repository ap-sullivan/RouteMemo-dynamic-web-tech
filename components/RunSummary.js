import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { lazy, useState } from "react";
import Colors from "../constants/Colors";

function RunSummary({ run, onSaveNote, onDelete }) {
  // state to hold notes input with existing notes as initial value
  const [notes, setNotes] = useState(run.notes || "");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Run Details</Text>
      <View style={styles.itemWrapper}>
      <Text style={styles.label}>Date: </Text>
      <Text> {new Date(run.timestamp).toLocaleDateString("en-GB")}</Text>
      </View>
      <Text>
        Start Time:{" "}
        {new Date(run.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </Text>
      <Text>Total Distance: {(run.distance / 1000).toFixed(2)} km</Text>
      <Text>Total Duration: {run.duration.toFixed(1)} seconds</Text>
      <Text>Average Speed: {run.speed.toFixed(2)} m/s</Text>
      <Text>Notes: </Text>
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        placeholder={run.notes}
        multiline={true}
        numberOfLines={4}
      />
      <Pressable style={styles.saveButton} onPress={() => onSaveNote(notes)}>
        <Text style={styles.saveButtonText}>Save Notes</Text>
      </Pressable>
      <Pressable style={styles.saveButton}>
        <Text
          style={styles.saveButtonText}
          onPress={() =>
            Alert.alert(
              "Delete Exercise",
              "Are you sure, this cannot be un-done?",
              [
                { text: "Cancel", style: "cancel" },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => onDelete(run.id),
                },
              ],
            )
          }
        >
          Delete Exercise
        </Text>
      </Pressable>
      <View>
        <Text>Area to view add photos</Text>
      </View>
    </View>
  );
}

export default RunSummary;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

    itemWrapper: {
    flexDirection: "row",
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
  },
  notesInput: {
    height: 90,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
  },
  saveButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
});
