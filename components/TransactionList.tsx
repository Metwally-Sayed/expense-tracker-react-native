import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
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
  return (
    <View>
      <FlatList
        data={transactions}
        renderItem={TransactionCard}
        keyExtractor={(item, index) => `${index.toString()}-${item.date}`}
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({});
