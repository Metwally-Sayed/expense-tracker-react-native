import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Header from "./components/Header";
import AddExpenseScreen from "./screens/AddExpenseScreen";
import HomeScreen from "./screens/HomeScreen";
import TransactionContext from "./store/TransactionContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <TransactionContext>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: (props) => <Header {...props} />,
            }}
          />
          <Stack.Screen
            name="AddExpenseScreen"
            component={AddExpenseScreen}
            options={{ headerShown: false, presentation: "formSheet" }}
          />
        </Stack.Navigator>
      </TransactionContext>
    </NavigationContainer>
  );
}
