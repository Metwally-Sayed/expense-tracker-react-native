import React, { createContext, useEffect, useState } from "react";
import { getData } from "../helpers";
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

  // Get categories from AsyncStorage for the first time

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await getData("categories");
        setCategories(data);
      } catch (error) {
        console.log(error);
      }
    };

    getCategories();
  }, []);

  // Add transaction
  const addTransaction = (transaction: ITransaction) => {
    setTransactions((prev) => [...(prev || []), transaction]);
  };

  // Update transaction
  const updateTransaction = (transaction: ITransaction) => {
    setTransactions((prev) => {
      return prev?.map((t) => (t.id === transaction.id ? transaction : t));
    });
  };

  // Delete transaction
  const deleteTransaction = (id: ITransaction["id"]) => {
    setTransactions((prev) => {
      return prev?.filter((t) => t.id !== id);
    });
  };

  // Sort transactions by date
  const sortTransactions = () => {
    setTransactions((prev) => {
      return [...prev!].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
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
    console.log("adding category from context", category);
    setCategories((prev) => {
      return [...(prev || []), category];
    });
  };

  // Get categories by type
  const getCategoriesByType = (type: "income" | "expense") => {
    const data = categories.filter((category) => category.type === type);
    console.log(data, "getCategoriesByType");

    return data;
  };

  // Update category
  const updateCategory = (category: ICategory) => {
    setCategories((prev) => {
      return prev?.map((c) => (c.id === category.id ? category : c));
    });
  };

  // Delete category
  const deleteCategory = (id: ICategory["id"]) => {
    setCategories((prev) => {
      return prev?.filter((c) => c.id !== id);
    });
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
