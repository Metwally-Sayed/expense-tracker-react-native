import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {};

const TransactionCard = (props: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>TransactionCard</Text>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
});
