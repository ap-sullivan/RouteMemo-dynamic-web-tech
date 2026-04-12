import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import Colors from "../constants/Colors";

import StartButton from "../components/StartButton";

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Map />

        <StartButton />
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },  

});

export default HomeScreen;
