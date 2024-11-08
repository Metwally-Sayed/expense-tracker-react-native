import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import CategoryCard from "../components/CategoryCard";
import TransactionList from "../components/TransactionList";
import TransactionsSummary from "../components/TransactionsSummary";
import { TransactionContext } from "../store/TransactionContext";
import { ICategory, ITransaction } from "../types";

const HomeScreen = (): JSX.Element => {
  const { transactions, categories, updateTransaction, deleteTransaction } =
    useContext(TransactionContext);
  const [filteredTransactions, setFilteredTransactions] =
    useState<ITransaction[]>(transactions);
  const [selectedCategory, setSelectedCategory] = useState<ICategory["id"]>();
  const [isLoading, setIsLoading] = useState(true);

  const handleSelectedCategory = (id: ICategory["id"] | undefined) => {
    if (id === selectedCategory) {
      setFilteredTransactions(transactions);
      setSelectedCategory(undefined);
      return;
    }
    setSelectedCategory(id);
    const filtered = transactions.filter((t) => t.categoryId === id);
    setFilteredTransactions(filtered);
  };

  useEffect(() => {
    if (transactions && transactions.length > 0) {
      setIsLoading(false);
      setFilteredTransactions(transactions);
    } else {
      setIsLoading(true);
    }
  }, [transactions, filteredTransactions]);

  const deleteTransactionsHandler = async (id: ITransaction["id"]) => {
    await deleteTransaction(id);
    setFilteredTransactions((prev) => {
      return prev?.filter((t) => t.id !== id);
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <TransactionsSummary />
      <View style={{ marginVertical: 10 }}>
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item, index }) => (
            <>
              <TouchableOpacity
                onPress={() => handleSelectedCategory(item.id)}
                style={{ marginRight: 10, marginBottom: 4 }}
              >
                <CategoryCard
                  category={item as ICategory}
                  selectedCategory={selectedCategory}
                />
              </TouchableOpacity>
            </>
          )}
        />
      </View>

      {filteredTransactions ? (
        <TransactionList
          transactions={filteredTransactions}
          categories={categories}
          updateTransaction={updateTransaction}
          deleteTransaction={deleteTransactionsHandler}
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
