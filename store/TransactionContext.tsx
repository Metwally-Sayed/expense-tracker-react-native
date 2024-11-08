import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { deleteData, getData, storeData } from "../helpers";
import { ICategory, ITransaction } from "../types";

type TransactionContextType = {
  transactions: ITransaction[];
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
  calculateExpenses: () => number;
  calculateIncomes: () => number;
};

export const TransactionContext = createContext({} as TransactionContextType);

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isAscending, setIsAscending] = useState(true);
  const [filteredTransactions, setFilteredTransactions] =
    useState<ITransaction[]>(transactions);
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
    setIsAscending((prev) => !prev);
    setTransactions((prev) => {
      if (!prev) return [];
      return [...prev].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return isAscending ? dateA - dateB : dateB - dateA;
      });
    });
  };
  // Filter transactions by category
  const filterTransactionsbyCategory = (categoryId: ICategory["id"]) => {
    const filtered = transactions.filter((t) => t.categoryId === categoryId);
    setFilteredTransactions(filtered);
  };

  // Calculate the number of transactions for each category
  const calculateCategoryTotalsTransactions = () => {
    if (!transactions) return {}; // Early return if no transactions

    const totals: { [categoryId: string]: number } = {};

    transactions.forEach((transaction) => {
      const { categoryId, amount } = transaction;
      totals[categoryId] = (totals[categoryId] || 0) + amount;
    });

    return totals;
  };

  // Calculate the total expenses
  const calculateExpenses = (): number => {
    const totals = calculateCategoryTotalsTransactions();
    if (Object.keys(totals).length === 0) return 0;

    const expenseCategories = categories.filter(
      (category) => category.type === "expense"
    );
    const expenseTotals = expenseCategories.reduce((acc, category) => {
      const categoryTotal = totals[category.id] || 0;
      return acc + categoryTotal;
    }, 0);

    return expenseTotals;
  };

  // Calculate the total incomes
  const calculateIncomes = (): number => {
    const totals = calculateCategoryTotalsTransactions();
    if (Object.keys(totals).length === 0) return 0;

    const incomeCategories = categories.filter(
      (category) => category.type === "income"
    );
    const incomeTotals = incomeCategories.reduce((acc, category) => {
      const categoryTotal = totals[category.id] || 0;
      return acc + categoryTotal;
    }, 0);

    return incomeTotals;
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
    // Calculation Actions
    calculateExpenses,
    calculateIncomes,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
