import { View, Text, StyleSheet } from 'react-native'

function ActivitySummary() {
  return (
    <View>
        <Text style={styles.title}>Activity Summary</Text>
        <Text>Distance: 5km</Text>
        <Text>Duration: 30 minutes</Text>
        <Text>Average Speed: 10 km/h</Text>
        <Text>Target: 10 km</Text>
     </View>                    
  )
}

export default ActivitySummary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
    marginBottom: 10,
  }
});
