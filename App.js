import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './navigation/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from './constants/Colors';

export default function App() {

  // clear async
  // useEffect(() => {
  //   const clearStorage = async () => {
  //     await AsyncStorage.removeItem("activities");
  //     console.log("Async removed");
  //   };

  //   clearStorage();
  // }, []);


  return (
  
  <NavigationContainer style={styles.container}>

    <BottomTabs />
  </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
