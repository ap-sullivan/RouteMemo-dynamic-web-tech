import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Feather } from "@expo/vector-icons";
import Map from '../components/Map';


function HomeScreen() {
  return (

  //  <ScrollView>
   <View style={styles.container}>
        <Map />
  
    <View style={styles.startContainer}>
    <Text style={styles.title}>Start Activity</Text>
    <View style={styles.buttonContainer}>
    <Feather name="power" size={124} color="red" style={styles.buttonStyle}/>
    </View>
    </View>
    
    <View style={styles.summaryContainer}>
        <Text style={styles.title}>Activity Summary</Text>
    </View>

   
   </View>
  //  </ScrollView> 
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
 
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
    height: 200,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
},



  });


export default HomeScreen
