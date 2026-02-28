import { StyleSheet, Text, View } from 'react-native'
import { Feather } from "@expo/vector-icons";

function HomeScreen() {
  return (
   <View style={styles.container}>
    <View style={styles.startContainer}>
    <Text style={styles.title}>Start Activity</Text>
    <View style={styles.buttonContainer}>
    <Feather name="power" size={124} color="red" style={styles.buttonStyle}/>
    </View>
    </View>
    
    <View style={styles.summaryContainer}>
        <Text style={styles.title}>Activity Summary</Text>
    </View>

    <View style={styles.mapContainer}>
        <Text style={styles.title}>Map</Text>
    </View>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

    startContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
    
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  buttonContainer: {
    // zIndex: -1,
    // height: 100,
    // backgroundColor: 'red',
  },

  buttonStyle: {
    // zIndex: 1,
  },

  summaryContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
},

mapContainer: {
    height: 200,
    borderBlockColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 100,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
},

  });


export default HomeScreen
