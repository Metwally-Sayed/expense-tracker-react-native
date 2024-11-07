import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { message: string };

const ValidationError = ({ message }: Props): JSX.Element => {
  return (
    <View>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default ValidationError;

const styles = StyleSheet.create({
  text: {
    color: "red",
    fontSize: 14,
  },
});
