import React, { useContext } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import TransactionList from "../components/TransactionList";
import { TransactionContext } from "../store/TransactionContext";

const HomeScreen = (): JSX.Element => {
  const { transactions, categories, updateTransaction, deleteTransaction } =
    useContext(TransactionContext);

  return (
    <GestureHandlerRootView style={styles.container}>
      {transactions ? (
        <TransactionList
          transactions={transactions}
          categories={categories}
          updateTransaction={updateTransaction}
          deleteTransaction={deleteTransaction}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="gray" />
          <Text style={styles.loadingText}>Loading transactions...</Text>
        </View>
      )}
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
  },
  bottomSheetContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
