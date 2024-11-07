import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ICategory } from "../types";

type Props = {
  category: ICategory;
  selectedCategory: ICategory["id"] | undefined;
};

const CategoryCard = ({ selectedCategory, category }: Props) => {
  return (
    <View
      style={
        selectedCategory === category.id ? styles.selectedCard : styles.card
      }
    >
      <Text
        style={
          selectedCategory === category.id ? styles.selectedText : styles.text
        }
      >
        {category.name}
      </Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  selectedCard: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  text: {
    color: "black",
  },
  selectedText: {
    color: "white",
  },
});
