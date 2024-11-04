import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: (props) => <Header {...props} />,
          }}
        />
        {/* <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
