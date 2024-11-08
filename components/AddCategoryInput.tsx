import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { generateRandomId, storeData } from "../helpers";
import { ICategory } from "../types";

type Props = {
  addCategory: (category: ICategory) => void;
  selectedCategoryType: ICategory["type"];
};

const AddCategoryInput = ({
  addCategory,
  selectedCategoryType,
}: Props): JSX.Element => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const addingCategoryHandler = async () => {
    if (!categoryName.trim()) {
      Alert.alert("Invalid Input", "Category name cannot be empty.");
      return;
    }

    const categoryId = generateRandomId();
    setLoading(true);

    try {
      await storeData(
        {
          id: categoryId,
          name: categoryName,
          type: selectedCategoryType,
        },
        "categories"
      );

      addCategory({
        id: categoryId,
        name: categoryName,
        type: selectedCategoryType,
      });

      setCategoryName("");
      setIsAddingCategory(false);
    } catch (error) {
      Alert.alert("Error", "Failed to add category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {!isAddingCategory ? (
        <TouchableOpacity
          onPress={() => setIsAddingCategory(true)}
          accessibilityLabel="Add category"
        >
          <AntDesign name="plus" size={20} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={setCategoryName}
            value={categoryName}
            autoCorrect={false}
            placeholder="Enter Category"
            placeholderTextColor="gray"
            style={styles.textInput}
            maxLength={20}
            keyboardType="default"
            returnKeyType="done"
            onSubmitEditing={addingCategoryHandler}
          />
          {loading ? (
            <ActivityIndicator size="small" color="gray" />
          ) : (
            <TouchableOpacity
              onPress={() => setIsAddingCategory(false)}
              accessibilityLabel="Close input"
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          )}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    fontSize: 14,
    color: "black",
    paddingHorizontal: 8,
  },
});
