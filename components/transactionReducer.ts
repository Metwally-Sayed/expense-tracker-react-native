type TransactionState = {
  amount: { value: number; err: boolean };
  description: { value: string; err: boolean };
  categoryId: { value: string; err: boolean };
  date: { value: number; err: boolean };
};

export const initialState: TransactionState = {
  amount: { value: 0, err: false },
  description: { value: "", err: false },
  categoryId: { value: "", err: false },
  date: { value: 0, err: false },
};

export function transactionReducer(
  state: TransactionState,
  action: any
): TransactionState {
  switch (action.type) {
    case "SET_AMOUNT":
      return {
        ...state,
        amount: { value: action.value, err: action.value < 1 },
      };
    case "SET_DESCRIPTION":
      return {
        ...state,
        description: { value: action.value, err: action.value.length < 10 },
      };
    case "SET_CATEGORY":
      return {
        ...state,
        categoryId: { value: action.value, err: !action.value },
      };
    case "SET_DATE":
      return {
        ...state,
        date: {
          value: action.value,
          err: !action.value,
        },
      };
    case "VALIDATE":
      return {
        amount: { ...state.amount, err: state.amount.value < 1 },
        description: {
          ...state.description,
          err: state.description.value.length < 10,
        },
        categoryId: { ...state.categoryId, err: !state.categoryId.value },
        date: {
          ...state.date,
          err: !action.value,
        },
      };
    default:
      return state;
  }
}
