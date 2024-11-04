import { createContext, useState } from "react";
import { ICategory, ITransaction } from "../types";

export const TransactionContext = createContext({});

const TransactionProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<
    ITransaction[] | undefined
  >();

  // Add transaction
  const addTransaction = (transaction: ITransaction) => {
    setTransactions((prev) => {
      return [...prev!, transaction];
    });
  };

  // Update transaction
  const updateTransaction = (transaction: ITransaction) => {
    setTransactions((prev) => {
      return prev?.map((t) => (t.id === transaction.id ? transaction : t));
    });
  };

  // Delete transaction
  const deleteTransaction = (id: number) => {
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
      return [...prev!].filter((t) => t.category.id === categoryId);
    });
  };

  // Filter transactions by category type
  const filterTransactionsbyType = (type: ICategory["type"]) => {
    setTransactions((prev) => {
      return [...prev!].filter((t) => t.category.type === type);
    });
  };

  // Calculate the number of transactions for each category
  const calculateCategoryTotalsTransactions = () => {
    const totals: { [categoryId: number]: number } = {};

    transactions?.forEach((transaction) => {
      const categoryId = transaction.category.id;
      totals[categoryId] = (totals[categoryId] || 0) + transaction.amount;
    });
    return totals;
  };

  const value = {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    sortTransactions,
    filterTransactionsbyCategory,
    filterTransactionsbyType,
    calculateCategoryTotalsTransactions,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}{" "}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
