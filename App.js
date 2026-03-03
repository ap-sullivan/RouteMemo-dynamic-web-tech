import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BottomTabs from './navigation/BottomTabs';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  
  <NavigationContainer>

    <BottomTabs />
  </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
