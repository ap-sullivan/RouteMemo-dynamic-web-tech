import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

function UploadPhoto({ photos, onOpenCamera, onDeletePhoto }) {
  return (
      <View style={styles.container}>
        <Pressable style={styles.uploadButton} onPress={onOpenCamera}>
          <Text style={styles.uploadButtonText}>Upload Photos</Text>
        </Pressable>

        <View style={styles.photosContainer}>
          {photos &&
            photos.map((uri, index) => (
              <View key={index} style={styles.photoWrapper}>
                <Image source={{ uri }} style={styles.photo} />

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => onDeletePhoto(index)}
                >
                  <Text style={styles.deleteText}>✕</Text>
                </Pressable>
              </View>
            ))}
        </View>
      </View>
    );
  };

export default UploadPhoto;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },

  uploadButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },

  uploadButtonText: {
    color: Colors.black,
    fontWeight: "bold",
    textAlign: "center",
  },

  photoWrapper: {
    position: "relative",
  },

  deleteButton: {
    position: "absolute",
    top: 30,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteText: {
    color: Colors.primaryLight,
    fontWeight: "bold",
    fontSize: 16,
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
