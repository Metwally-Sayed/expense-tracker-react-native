import React, { Dispatch } from "react";
import { StyleSheet, TextInput } from "react-native";
import ValidationError from "./ValidationError";

type Props = {
  dispatch: Dispatch<any>;
  error: boolean;
};

const AmountInput = ({ dispatch, error }: Props) => {
  return (
    <>
      <TextInput
        style={styles.amountInput}
        onChangeText={(text) =>
          dispatch({ type: "SET_AMOUNT", value: parseInt(text) || 0 })
        }
        keyboardType="numeric"
        maxLength={7}
        placeholder="Amount"
        placeholderTextColor="gray"
      />
      {error && <ValidationError message={"Amount should be at least 1$"} />}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 15,
    fontSize: 32,
    fontWeight: "bold",
  },
  amountInput: {
    marginBottom: 15,
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default AmountInput;
