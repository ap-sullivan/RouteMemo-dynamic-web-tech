import { Pressable, Text, Alert, View } from "react-native";
import Colors from "../constants/Colors";

function DeleteButton({ id, onDelete }) {
  const handleDelete = () => {
    Alert.alert(
      "Delete Exercise",
      "Are you sure, this cannot be undone?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDelete(id),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
    <Pressable style={styles.deleteButton} onPress={handleDelete}>
      <Text style={styles.deleteButtonText}>Delete Exercise</Text>
    </Pressable>
    </View>
  );
}

export default DeleteButton;

const styles = {

  container: {
     paddingHorizontal: 20,
  },

     deleteButton: {
    backgroundColor: Colors.danger,
    padding: 12,
    borderRadius: 12,
  },
  deleteButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
}