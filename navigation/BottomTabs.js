import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RunStack from "./RunStack";
import HomeScreen from "../screens/HomeScreen";
import RunListScreen from "../screens/RunListScreen";
import { Feather } from "@expo/vector-icons";

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
        },
        tabBarIconStyle: {
          width: "100%",
          height: "100%",
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "RunList") {
            iconName = "list";
          }

          return (
            <Feather
              name={iconName}
              size={size}
              color={focused ? "#007AFF" : "gray"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="RunList" component={RunStack} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
