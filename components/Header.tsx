import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

type Props = NativeStackHeaderProps & {
  // Extra Types ...
};

const Header = ({ navigation, route }: Props): JSX.Element => {
  const addTransaction = () => {
    navigation.navigate("AddExpenseScreen");
  };
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.buttons} onPress={addTransaction}>
        <Text>
          <AntDesign name="plus" size={24} color="black" />
        </Text>
      </TouchableOpacity>
      {/* maybe will add search */}
      <Text style={styles.title}></Text>
      <TouchableOpacity style={styles.buttons}>
        <Text>
          <MaterialCommunityIcons name="sort" size={24} color="black" />{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 80,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  buttons: {
    paddingHorizontal: 5,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
