import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constans/styles";
import { ICategory } from "../types";

type Props = {
  category: ICategory;
  selectedCategory: ICategory["id"] | undefined;
};

const CategoryCard = ({ selectedCategory, category }: Props) => {
  return (
    <View
      style={
        selectedCategory === category.id
          ? GlobalStyles.selectedCard
          : GlobalStyles.card
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
  text: {
    color: "black",
  },
  selectedText: {
    color: "white",
  },
});
