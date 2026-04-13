import React, { useState } from "react";
import { View, TextInput, Pressable, Text, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

function AddNotes({run, onSaveNote}) {

// local state to hold notes input value initialised with existing notes if they exist
const [notes, setNotes] = useState(run?.notes || "");


  return (
    <View style={styles.container} >
      <TextInput
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add notes here..."
        multiline={true}
        numberOfLines={4}
      />
      <Pressable style={styles.saveButton} onPress={() => onSaveNote(notes)}>
        <Text style={styles.saveButtonText}>Save Notes</Text>
      </Pressable>
    </View>
  );
}

export default AddNotes;

const styles = StyleSheet.create({

     container: {
     paddingHorizontal: 20,
  },

  notesInput: {
    color: Colors.background,
    backgroundColor: Colors.primaryLightest,
    height: 70,
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
    marginBottom: 20,
  },
  saveButtonText: {
    color: Colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },
});
