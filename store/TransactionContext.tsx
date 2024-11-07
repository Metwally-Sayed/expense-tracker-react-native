import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { deleteData, getData, storeData } from "../helpers";
import { ICategory, ITransaction } from "../types";

type TransactionContextType = {
  transactions: ITransaction[] | undefined;
  categories: ICategory[];
  addTransaction: (transaction: ITransaction) => void;
  updateTransaction: (transaction: ITransaction) => void;
  deleteTransaction: (id: ITransaction["id"]) => void;
  sortTransactions: () => void;
  filterTransactionsbyCategory: (categoryId: ICategory["id"]) => void;
  calculateCategoryTotalsTransactions: () => void;
  getCategoriesByType: (type: "income" | "expense") => ICategory[];
  addCategory: (category: ICategory) => void;
  updateCategory: (category: ICategory) => void;
  deleteCategory: (id: ICategory["id"]) => void;
};

export const TransactionContext = createContext({} as TransactionContextType);

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<
    ITransaction[] | undefined
  >();

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isAscending, setIsAscending] = useState(true); // Track sort order

  // Get categories from AsyncStorage for the first time
  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadedCategories = (await getData("categories")) || [];
        const loadedTransactions = await getData("transaction");
        console.log(loadedTransactions);
        setCategories(loadedCategories);
        setTransactions(loadedTransactions);
      } catch (error) {
        Alert.alert("Data Load Error", "Failed to load data.");
      }
    };
    fetchData();
  }, []);

  // Add transaction
  const addTransaction = async (transaction: ITransaction) => {
    try {
      await storeData(transaction, "transaction");
      console.log(
        "addinggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg"
      );

      setTransactions((prev) => [...(prev || []), transaction]);
    } catch (error) {
      Alert.alert("Add Error", "Could not add transaction.");
    }
  };

  // Update transaction
  const updateTransaction = (transaction: ITransaction) => {
    try {
      setTransactions((prev) => {
        return prev?.map((t) => (t.id === transaction.id ? transaction : t));
      });
    } catch (error) {
      Alert.alert("Update Error", "Could not update transaction.");
    }
  };

  // Delete transaction
  const deleteTransaction = async (id: ITransaction["id"]) => {
    try {
      await deleteData("transaction", id);
      setTransactions((prev) => {
        return prev?.filter((t) => t.id !== id);
      });
    } catch (error) {
      Alert.alert("Delete Error", "Could not delete transaction.");
    }
  };

  // Toggle sort order and sort transactions
  const sortTransactions = () => {
    setIsAscending((prev) => !prev); // Toggle sort order state
    setTransactions((prev) => {
      if (!prev) return [];
      return [...prev].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return isAscending ? dateA - dateB : dateB - dateA; // Sort based on current order
      });
    });
  };
  // Filter transactions by category
  const filterTransactionsbyCategory = (categoryId: ICategory["id"]) => {
    setTransactions((prev) => {
      return [...prev!].filter((t) => t.categoryId === categoryId);
    });
  };

  // Calculate the number of transactions for each category
  const calculateCategoryTotalsTransactions = () => {
    // Implementation for hash table based on category id
    //Type complexity is O(1)
    const totals: { [categoryId: string]: number } = {};

    transactions?.forEach((transaction) => {
      const categoryId = transaction.categoryId;
      totals[categoryId] = (totals[categoryId] || 0) + transaction.amount;
    });
    return totals;
  };

  // Add category
  const addCategory = (category: ICategory) => {
    setCategories((prev) => {
      return [...(prev || []), category];
    });
  };

  // Get categories by type
  const getCategoriesByType = (type: "income" | "expense") => {
    const data = categories.filter((category) => category.type === type);
    return data;
  };

  // Update category
  const updateCategory = (category: ICategory) => {
    setCategories((prev) => {
      return prev?.map((c) => (c.id === category.id ? category : c));
    });
  };

  // Delete category
  const deleteCategory = async (id: ICategory["id"]) => {
    try {
      await deleteData("categories", id);
      setCategories((prev) => {
        return prev?.filter((c) => c.id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    // State
    transactions,
    categories,
    // Transaction Actions
    addTransaction,
    updateTransaction,
    deleteTransaction,
    sortTransactions,
    filterTransactionsbyCategory,
    calculateCategoryTotalsTransactions,
    // Category Actions
    getCategoriesByType,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
