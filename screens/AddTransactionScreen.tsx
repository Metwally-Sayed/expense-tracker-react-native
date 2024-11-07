import { TouchableOpacity } from "@gorhom/bottom-sheet";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AddCategoryInput from "../components/AddCategoryInput";
import AddTransactionHeader from "../components/AddTransactionHeader";
import CategoryCard from "../components/CategoryCard";
import ValidationError from "../components/ValidationError";
import { generateRandomId } from "../helpers";
import { TransactionContext } from "../store/TransactionContext";
import { ICategory } from "../types";

type Props = {
  navigation: any;
};

type TransactionState = {
  amount: { value: number; err: boolean };
  description: { value: string; err: boolean };
  categoryId: { value: string; err: boolean };
};

const initialState: TransactionState = {
  amount: { value: 0, err: false },
  description: { value: "", err: false },
  categoryId: { value: "", err: false },
};

function transactionReducer(
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
    case "VALIDATE":
      return {
        amount: { ...state.amount, err: state.amount.value < 1 },
        description: {
          ...state.description,
          err: state.description.value.length < 10,
        },
        categoryId: { ...state.categoryId, err: !state.categoryId.value },
      };
    default:
      return state;
  }
}

const AddExpenseScreen = ({ navigation }: Props): JSX.Element => {
  const { categories, addTransaction, addCategory, deleteCategory } =
    useContext(TransactionContext);

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<ICategory["type"]>("income");
  const [selectedCategory, setSelectedCategory] = useState<ICategory["id"]>();

  const [transaction, dispatch] = useReducer(transactionReducer, initialState);

  // Memoize filtered categories
  const filteredCategories = useMemo(
    () =>
      categories.filter((category) => category.type === selectedCategoryType),
    [selectedCategoryType, categories]
  );

  const selectedCardHandler = useCallback((categoryId: ICategory["id"]) => {
    setSelectedCategory(categoryId);
    dispatch({ type: "SET_CATEGORY", value: categoryId });
  }, []);

  const validateTransaction = useCallback(() => {
    dispatch({ type: "VALIDATE" });
    return (
      transaction.amount.value >= 1 &&
      transaction.description.value.length >= 10 &&
      selectedCategory
    );
  }, [transaction, selectedCategory]);

  const addTransactionHandler = useCallback(async () => {
    if (!validateTransaction()) return;

    await addTransaction({
      id: generateRandomId(),
      amount: transaction.amount.value,
      date: Date.now(),
      description: transaction.description.value,
      categoryId: selectedCategory as ICategory["id"],
    });
    navigation.goBack();
  }, [
    transaction,
    selectedCategory,
    addTransaction,
    validateTransaction,
    navigation,
  ]);

  return (
    <View style={styles.container}>
      <AddTransactionHeader addTransactionHandler={addTransactionHandler} />
      <View style={styles.card}>
        <TextInput
          style={styles.amountInput}
          onChangeText={(text) =>
            dispatch({ type: "SET_AMOUNT", value: parseInt(text) || 0 })
          }
          keyboardType="numeric"
          maxLength={7}
          placeholder="Amount"
          placeholderTextColor="gray"
        />
        {transaction.amount.err && (
          <ValidationError message={"Amount should be at least 1$"} />
        )}

        <TextInput
          style={styles.descriptionInput}
          onChangeText={(text) =>
            dispatch({ type: "SET_DESCRIPTION", value: text })
          }
          placeholder="Description"
          placeholderTextColor="gray"
          multiline
          maxLength={70}
        />
        {transaction.description.err && (
          <ValidationError
            message={"Description should be at least 10 chars"}
          />
        )}

        <Text style={{ marginBottom: 6 }}>Select a entry type</Text>

        <View style={styles.segmantcontainer}>
          <SegmentedControl
            values={["income", "expense"]}
            backgroundColor="#f2f2f2"
            tintColor="white"
            selectedIndex={currentTab}
            onValueChange={(value) => {
              setSelectedCategoryType(value as ICategory["type"]);
              setSelectedCategory(undefined);
              dispatch({ type: "SET_CATEGORY", value: "" });
            }}
          />

          <View style={styles.categoryCardContainer}>
            {filteredCategories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onLongPress={() => deleteCategory(category.id)}
                onPress={() => selectedCardHandler(category.id)}
              >
                <CategoryCard
                  category={category}
                  selectedCategory={selectedCategory}
                />
              </TouchableOpacity>
            ))}
            <View style={styles.addCategoryInputContainer}>
              <AddCategoryInput
                addCategory={addCategory}
                selectedCategoryType={selectedCategoryType}
              />
            </View>
          </View>
          {transaction.categoryId.err && (
            <ValidationError
              message={"You have to select a category or add new one"}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 10,
  },
  card: {
    padding: 15,
  },
  amountInput: {
    marginBottom: 15,
    fontSize: 32,
    fontWeight: "bold",
  },
  descriptionInput: {
    marginBottom: 15,
    fontSize: 15,
  },
  segmantcontainer: {
    paddingVertical: 10,
  },
  categoryCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
    paddingVertical: 5,
  },
  addCategoryInputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
