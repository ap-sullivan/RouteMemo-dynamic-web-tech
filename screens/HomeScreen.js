import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Map from "../components/Map";
import ActivitySummary from "../components/ActivitySummary";
import StartButton from "../components/StartButton";

function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Map />

        <StartButton />

        <View style={styles.summaryContainer}>
          <ActivitySummary />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  buttonStyle: {
    // zIndex: 1,
  },

  summaryContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default HomeScreen;
