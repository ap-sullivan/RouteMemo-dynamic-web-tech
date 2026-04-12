import { View, Text, StyleSheet } from "react-native";
import { getTimeParts } from "../utils/time";
import Colors from "../constants/Colors";

function CurrentActivitySummary({ distance, duration, speed, steps }) {

  // use helper function in utils to convert duration in seconds to minutes and seconds for display
  const { minutes, seconds } = getTimeParts(duration);

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>ACTIVITY SUMMARY</Text>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Text style={styles.label}>Distance: </Text>
          <Text style={[styles.value, styles.value2]}>{(distance / 1000).toFixed(2)} </Text>
     
        </View>

        <View style={styles.innerContainer}>
          <Text style={styles.label}>Duration: </Text>
          <Text style={styles.value}>{minutes} m</Text>
          <Text style={styles.value}>{seconds.toString().padStart(2, "0")}  s
          </Text>
        </View>
      </View>

      <View style={styles.outerContainer}>
         <View style={styles.innerContainer}>
          <Text style={styles.label}>Step Count: </Text>
          <Text style={styles.value}>{steps}  </Text>
        </View>

         <View style={styles.innerContainer}>
          <Text style={styles.label}>Speed: </Text>
          <Text style={[styles.value, styles.value2]}>{speed.toFixed(2)} km/h </Text>
     
        </View>

      
      </View>
    </View>

    /* <Text style={styles.title}>Activity Summary</Text>

    
   

        <View style={styles.statBox}>
          <Text style={styles.label}>Speed</Text>
          <Text style={styles.value}>
            {speed.toFixed(2)}
          </Text>
          <Text style={styles.unit}>m/s</Text>
        </View>
      </View> */
  );
}

export default CurrentActivitySummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  mainTitle: {
    marginTop: 20,
    marginBottom: 15,
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 28,
    textAlign: "center",
  },

  outerContainer: {
    flexDirection: "row",
    justifyContent: "",
  },

  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 20,
  },

  label: {
    fontSize: 15,
    color: Colors.primary,
    marginRight: 16,
    fontWeight: "bold",
  },



  value: {
    color: Colors.primary,
    minWidth: 40,
        fontSize: 15,
  },

  value2: {
    textAlign: "right",
        fontSize: 15,
  },

  valueSeconds: {
    color: Colors.primary,
    minWidth: 15,
    fontSize: 15,
  },

  unit: {
    color: Colors.primary,
  },
});
