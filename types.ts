export interface ICategory {
  id: number;
  name: string;
  icon: string;
  color: string;
  totalTransactions: number;
  type: "EXPENSE" | "INCOME";
}

export interface ITransaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  category: ICategory;
}
