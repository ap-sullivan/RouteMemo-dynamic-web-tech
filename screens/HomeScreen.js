import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import Colors from "../constants/Colors";
import StartButton from "../components/StartButton";

function HomeScreen() {
  const [route, setRoute] = useState([]);
  const [recording, setRecording] = useState(false);
  
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <Map route={route} recording={recording} />

        <StartButton
          route={route}
          setRoute={setRoute}
          recording={recording}
          setRecording={setRecording}
        />
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
