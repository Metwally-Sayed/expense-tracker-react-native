import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "./components/Header";
import AddExpenseScreen from "./screens/AddTransactionScreen";
import HomeScreen from "./screens/HomeScreen";
import TransactionContext from "./store/TransactionContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
  );
}
