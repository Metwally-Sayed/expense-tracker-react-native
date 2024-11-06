import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  text?: string;
};

const CategoryCard = ({ text }: Props) => {
  return <View style={styles.container}>{text && <Text>{text}</Text>}</View>;
};

export default CategoryCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
