import { TouchableOpacity } from "@gorhom/bottom-sheet";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, {
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import AddCategoryInput from "../components/AddCategoryInput";
import AddTransactionHeader from "../components/AddTransactionHeader";
import AmountInput from "../components/AmountInput";
import CategoryCard from "../components/CategoryCard";
import DatePicker from "../components/DatePicker";
import DescriptionInput from "../components/DescriptionInput";
import {
  initialState,
  transactionReducer,
} from "../components/transactionReducer";
import ValidationError from "../components/ValidationError";
import { generateRandomId } from "../helpers";
import { TransactionContext } from "../store/TransactionContext";
import { ICategory } from "../types";

type Props = {
  navigation: any;
};

const AddExpenseScreen = ({ navigation }: Props): JSX.Element => {
  const { categories, addTransaction, addCategory, deleteCategory } =
    useContext(TransactionContext);

  const [currentTab, setCurrentTab] = useState(0);
  const [selectedCategoryType, setSelectedCategoryType] =
    useState<ICategory["type"]>("income");
  const [selectedCategory, setSelectedCategory] = useState<ICategory["id"]>();

  const [transaction, dispatch] = useReducer(transactionReducer, initialState);

  const [selectedDate, setSelectedDate] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);

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
      selectedCategory &&
      !transaction.date.err
    );
  }, [transaction, selectedCategory]);

  const addTransactionHandler = async () => {
    addTransaction({
      id: generateRandomId(),
      amount: transaction.amount.value,
      date: date.getTime(),
      description: transaction.description.value,
      categoryId: selectedCategory as ICategory["id"],
    });
    navigation.goBack();
  };

  const toggleDatePicker = useCallback(() => {
    setShowDateTimePicker((prev) => !prev);
  }, []);

  const confirmIosDatePicker = useCallback(() => {
    setSelectedDate(date.toDateString());
    toggleDatePicker();
  }, []);
  return (
    <>
      <AddTransactionHeader addTransactionHandler={addTransactionHandler} />
      <View style={styles.container}>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          {/* AmountInput */}
          <AmountInput dispatch={dispatch} error={transaction.amount.err} />
          {/* DescriptionInput */}
          <DescriptionInput
            dispatch={dispatch}
            error={transaction.amount.err}
          />
          {/* DatePickerInput */}
          <DatePicker
            showDateTimePicker={showDateTimePicker}
            toggleDatePicker={toggleDatePicker}
            date={date}
            confirmIosDatePicker={confirmIosDatePicker}
            selectedDate={selectedDate}
            dispatch={dispatch}
            setDate={setDate}
            setSelectedDate={setSelectedDate}
          />
          <Text style={{ marginBottom: 6 }}>Select a entry type</Text>
          <View style={styles.segmantcontainer}>
            <SegmentedControl
              values={["income", "expense"]}
              backgroundColor="#f2f2f2"
              tintColor="white"
              fontStyle={{ color: "black" }}
              selectedIndex={currentTab}
              onValueChange={(value) => {
                value === "income" ? setCurrentTab(0) : setCurrentTab(1);
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
    </>
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
