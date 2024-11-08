import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import { ICategory, ITransaction } from "../types";

type Props = {
  transaction: ITransaction;
  updateTransaction: (transaction: ITransaction) => void;
  deleteTransaction: (id: ITransaction["id"]) => void;
  categories: ICategory[] | undefined;
};

const TransactionCard = ({
  transaction,
  updateTransaction,
  deleteTransaction,
  categories,
}: Props): JSX.Element => {
  const navigation = useNavigation();
  const categoryData = useMemo(
    () =>
      categories?.find((category) => category.id === transaction.categoryId),
    [categories, transaction.categoryId]
  );

  const iconName =
    categoryData?.type === "expense" ? "minuscircle" : "pluscircle";
  const iconColor = categoryData?.type === "expense" ? "red" : "green";

  const scaleAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      <TouchableOpacity
        onLongPress={deleteTransaction.bind(null, transaction.id)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.7}
        accessibilityRole="button"
        accessibilityLabel={`Transaction of ${transaction.amount} dollars for ${transaction.description}`}
      >
        <View style={styles.row}>
          <View style={styles.priceCard}>
            <AntDesign name={iconName} size={18} color={iconColor} />
            <AutoSizeText
              fontSize={32}
              mode={ResizeTextMode.max_lines}
              numberOfLines={1}
              style={styles.amount}
            >
              ${transaction.amount.toFixed(2)}
            </AutoSizeText>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.description}>{transaction.description}</Text>
            <Text style={styles.category}>{categoryData?.name}</Text>
            <Text style={styles.date}>
              {new Date(transaction.date).toDateString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  priceCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  amount: {
    fontSize: 32,
    fontWeight: "800",
    maxWidth: "80%",
  },
  category: {
    fontSize: 15,
    fontWeight: "500",
    color: "grey",
    marginTop: 2,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  description: {
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 12,
    color: "gray",
    marginTop: 2,
  },
});
