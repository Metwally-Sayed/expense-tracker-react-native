import React, { useCallback } from "react";
import { FlatList, RefreshControl, StyleSheet, Text, View } from "react-native";
import { ICategory, ITransaction } from "../types";
import TransactionCard from "./TransactionCard";

type Props = {
  transactions: ITransaction[] | undefined;
  categories: ICategory[] | undefined;
  updateTransaction: (transaction: ITransaction) => void;
  deleteTransaction: (id: ITransaction["id"]) => void;
};

const TransactionList = ({
  transactions,
  categories,
  updateTransaction,
  deleteTransaction,
}: Props): JSX.Element => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const renderItem = useCallback(
    ({ item }: { item: ITransaction }) => (
      <TransactionCard
        transaction={item}
        updateTransaction={updateTransaction}
        deleteTransaction={deleteTransaction}
        categories={categories}
      />
    ),
    [updateTransaction, deleteTransaction, categories]
  );

  const keyExtractor = useCallback(
    (item: ITransaction, index: number) => `${index.toString()}-${item.date}`,
    []
  );

  const ListEmptyComponent = (): JSX.Element => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No transactions available</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        style={{ flex: 1 }}
        data={transactions}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
  },
});
