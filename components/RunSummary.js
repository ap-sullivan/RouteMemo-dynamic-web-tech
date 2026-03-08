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
import { getTimeParts } from "../utils/time";

function RunSummary({ run, onSaveNote, onDelete }) {
  // state to hold notes input with existing notes as initial value
  const [notes, setNotes] = useState(run.notes || "");

  return (
  
    <View style={styles.container}>

      <View style={styles.statsContainer}>
      <Text style={styles.title}>Exercise Stats</Text>

      <View style={styles.rowWrapper}>
      <View style={styles.itemWrapper}>
      <Text style={styles.label}>Date:  </Text>
      <Text style={styles.value}>{new Date(run.timestamp).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        } )} </Text>
      </View>
        <View style={styles.itemWrapper}>
        <Text style={styles.label}>Start Time:  </Text>
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
      <Text style={styles.label}>Distance:  </Text>
      <Text style={styles.value}> {(run.distance / 1000).toFixed(2)} km</Text>
      </View>
      <View style={styles.itemWrapper}>
      <Text style={styles.label}>Duration:  </Text>
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
      <Text style={styles.label}>Avg. Speed:  </Text>
      <Text style={styles.value}>{run.speed.toFixed(2)} m/s</Text>
      </View>
        <View style={styles.itemWrapper}>
      <Text style={styles.label}>Steps:  </Text>
      <Text style={styles.value}>100000</Text>
      </View>
      </View>
      </View>
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
      <Pressable style={[styles.saveButton,styles.deleteButton]}>
        <Text
          style={[styles.saveButtonText, styles.deleteButtonText]}
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
    marginBottom: 10,
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
  notesInput: {
    color:  Colors.background,
    backgroundColor: Colors.primaryLightest,
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
    color: Colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: Colors.danger,
  },
  deleteButtonText: {
    color: Colors.white,
  },  

});
