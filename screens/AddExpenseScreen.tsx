import SegmentedControl from "@react-native-segmented-control/segmented-control";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AddCategoryInput from "../components/AddCategoryInput";
import CategoryCard from "../components/CategoryCard";
import { TransactionContext } from "../store/TransactionContext";
import { ICategory } from "../types";

type Props = {};

const AddExpenseScreen = (props: Props): JSX.Element => {
  const { categories, addTransaction, addCategory, getCategoriesByType } =
    useContext(TransactionContext);

  const [currentTab, setcurrentTab] = useState(0);
  const [selectedCategory, setSelectedCategory] =
    useState<ICategory["type"]>("income");

  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>([]);

  console.log(selectedCategory, "selectedCategory");

  useEffect(() => {
    if (categories) {
      const data = categories.filter(
        (category) => category.type === selectedCategory
      );
      console.log(data, "DATA");
      setFilteredCategories(data);
    }
  }, [selectedCategory, categories]);

  // let categoriesJSX;

  // if (categories) {
  //   categoriesJSX = (
  //     <View>
  //       {getCategoriesByType(selectedCategory)?.map((category) => (
  //         <CategoryCard text={category.name} key={category.id} />
  //       ))}
  //       <View style={styles.addCategoryInputContainer}>
  //         <AddCategoryInput
  //           addCategory={addCategory}
  //           selectedCategory={selectedCategory}
  //         />
  //       </View>
  //     </View>
  //   );
  // } else if (categories === undefined) {
  //   categoriesJSX = (
  //     <AddCategoryInput
  //       addCategory={addCategory}
  //       selectedCategory={selectedCategory}
  //     />
  //   );
  // } else {
  //   categoriesJSX = <ActivityIndicator size="small" color="gray" />;
  // }

  console.log(categories, "cccccc");

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.amountInput}
          autoCorrect={false}
          keyboardType="numeric"
          maxLength={7}
          placeholder="Amount"
          placeholderTextColor="gray"
        />
        <TextInput
          style={styles.descriptionInput}
          autoCorrect={false}
          placeholder="Description"
          placeholderTextColor="gray"
          multiline={true}
          maxLength={70}
        />
        <Text style={{ marginBottom: 6 }}>Select a entry type</Text>

        <View style={styles.segmantcontainer}>
          <SegmentedControl
            values={["income", "expense"]}
            backgroundColor="#f2f2f2"
            tintColor="white"
            selectedIndex={currentTab}
            onValueChange={(value) =>
              setSelectedCategory(value as ICategory["type"])
            }
          />
          <View style={styles.categoryCardContainer}>
            {filteredCategories?.map((category) => (
              <CategoryCard text={category.name} key={category.id} />
            ))}
            <View style={styles.addCategoryInputContainer}>
              <AddCategoryInput
                addCategory={addCategory}
                selectedCategory={selectedCategory}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginVertical: 30,
    backgroundColor: "#f2f2f2",
  },
  card: {
    borderRadius: 15,
    elevation: 3,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
    backgroundColor: "#e0e0e0",
    borderRadius: 15,
    padding: 10,
  },
  categoryCardContainer: {
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 3,
  },
  addCategoryInputContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
