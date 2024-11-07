import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  addTransactionHandler: () => void;
};

const AddTransactionHeader = ({ addTransactionHandler }: Props): JSX.Element => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.leftTitle}
        onPress={() => navigation.goBack()}
      >
        <Text>
          <Ionicons name="chevron-back" size={25} color="black" />{" "}
        </Text>
        <Text style={styles.titleText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rightTitle}
        onPress={addTransactionHandler}
      >
        <Text style={styles.titleText}>Add</Text>
        <Text>
          <Ionicons name="add" size={25} color="black" />{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTransactionHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 60,
    paddingHorizontal: 10,
    width: "100%",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },
  headerText: {
    textAlign: "right",
    color: "black",
    fontSize: 20,
  },
  rightTitle: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  leftTitle: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
  },
});
