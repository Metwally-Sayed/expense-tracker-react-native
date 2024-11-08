import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ICategory } from "../types";
import CategoryCard from "./CategoryCard";

type Props = {
  selectedCategory: ICategory["id"] | undefined;
  categories: ICategory[];
  handleSelectedCategory: (id: ICategory["id"]) => void;
};

const FilterCatergories = ({
  categories,
  handleSelectedCategory,
  selectedCategory,
}: Props) => {
  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        horizontal
        data={categories}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity
              onPress={() => handleSelectedCategory(item.id)}
              style={{ marginRight: 10, marginBottom: 4 }}
            >
              <CategoryCard
                category={item as ICategory}
                selectedCategory={selectedCategory}
              />
            </TouchableOpacity>
          </>
        )}
      />
    </View>
  );
};

export default FilterCatergories;

const styles = StyleSheet.create({});
