import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RunListScreen from "../screens/RunListScreen";
import RunDetailsScreen from "../screens/RunDetailsScreen";

const Stack = createNativeStackNavigator();

function RunStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="RunList" component={RunListScreen} />
      <Stack.Screen name="RunDetails" component={RunDetailsScreen} />
    </Stack.Navigator>
  );
}

export default RunStack;