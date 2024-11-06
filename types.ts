export interface ICategory {
  id: string;
  name: string;
  type: "expense" | "income";
}

export interface ITransaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  categoryId: ICategory["id"];
}
