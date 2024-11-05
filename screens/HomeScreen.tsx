import { useContext } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import TransactionList from "../components/TransactionList";
import { TransactionContext } from "../store/TransactionContext";

type Props = {};

const HomeScreen = (props: Props): JSX.Element => {
  const { transactions, categories, updateTransaction, deleteTransaction } =
    useContext(TransactionContext);
  return (
    <View style={styles.container}>
      {transactions ? (
        <TransactionList
          transactions={transactions}
          categories={categories}
          updateTransaction={updateTransaction}
          deleteTransaction={deleteTransaction}
        />
      ) : (
        <ActivityIndicator size="small" color="gray" />
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: "100%",
  },
});
