import React from "react";
import { StyleSheet, TextInput } from "react-native";
import ValidationError from "./ValidationError";

type Props = {
  dispatch: React.Dispatch<any>;
  error: boolean;
};

const DescriptionInput = ({ dispatch, error }: Props) => {
  return (
    <>
      <TextInput
        style={styles.descriptionInput}
        onChangeText={(text) =>
          dispatch({ type: "SET_DESCRIPTION", value: text })
        }
        placeholder="Description"
        placeholderTextColor="gray"
        multiline
        maxLength={70}
      />
      {error && (
        <ValidationError message={"Description should be at least 10 chars"} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  descriptionInput: {
    marginBottom: 15,
    fontSize: 15,
  },
});

export default DescriptionInput;
