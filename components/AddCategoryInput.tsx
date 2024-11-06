import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";

import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { generateRandomId, storeData } from "../helpers";
import { ICategory } from "../types";

type Props = {
  addCategory: (category: ICategory) => void;
  selectedCategory: ICategory["type"];
};

const AddCategoryInput = ({
  addCategory,
  selectedCategory,
}: Props): JSX.Element => {
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const addingCategoryHandler = async () => {
    const categoryId: string = generateRandomId();
    try {
      await storeData(
        {
          id: categoryId,
          name: categoryName,
          type: selectedCategory,
        },
        "categories"
      );

      addCategory({
        id: categoryId,
        name: categoryName,
        type: selectedCategory,
      });

      setIsAddingCategory(false);
      setCategoryName("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      {!isAddingCategory ? (
        <TouchableOpacity onPress={() => setIsAddingCategory(true)}>
          <AntDesign name="plus" size={15} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.container}>
          <TextInput
            onChangeText={(text) => setCategoryName(text)}
            value={categoryName}
            autoCorrect={false}
            placeholder="Press here to add a category"
            placeholderTextColor="gray"
            style={styles.textInput}
            maxLength={20}
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={addingCategoryHandler}
          />
          <TouchableOpacity
            onPress={() => setIsAddingCategory((prev) => !prev)}
            // style={styles.button}
          >
            <AntDesign name="close" size={15} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default AddCategoryInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    fontSize: 14,
    backgroundColor: "transparent",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
  },
});
