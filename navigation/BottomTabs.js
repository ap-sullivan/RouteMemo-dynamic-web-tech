import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RunStack from "./RunStack";
import HomeScreen from "../screens/HomeScreen";
import RunListScreen from "../screens/RunListScreen";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          height: 60,
          flexDirection: "row",
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          height: 60,
          backgroundColor: Colors.white,
        },
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Runs") {
            iconName = "list";
          }

          return (
            <Feather
              name={iconName}
              size={size}
              color={focused ? Colors.primaryDark : Colors.background}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Runs" component={RunStack} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
