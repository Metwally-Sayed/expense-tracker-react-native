import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import { Colors } from "../constans/colors";
import { GlobalStyles } from "../constans/styles";
import { TransactionContext } from "../store/TransactionContext";

type Props = {};

const TransactionsSummary = (props: Props) => {
  const { calculateExpenses, calculateIncomes, categories } =
    useContext(TransactionContext);
  const netBalance = calculateIncomes() - calculateExpenses();
  return (
    <View style={[GlobalStyles.card, { paddingVertical: 20 }]}>
      <Text style={styles.title}>Total Summary</Text>
      <Text>Net Balance </Text>
      <Text
        style={[
          styles.netBalanceAmount,
          { color: netBalance > 0 ? Colors.green : Colors.red },
        ]}
      >
        ${netBalance.toFixed(2)}
      </Text>
      <BarChart
        data={[
          { value: calculateIncomes(), frontColor: Colors.green },
          { value: calculateExpenses(), frontColor: Colors.red },
        ]}
        width={300}
        height={200}
        barWidth={18}
        barBorderRadius={3}
        spacing={20}
        noOfSections={4}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ color: "gray" }}
        yAxisTextStyle={{ color: "gray" }}
        isAnimated
        gradientColor={"blue"}
        animationDuration={500}
      />
      <View style={styles.summaruContainer}>
        <View style={styles.summaryRow}>
          <Text>Income:</Text>
          <Text style={[styles.summaryAmount, { color: Colors.green }]}>
            ${calculateIncomes().toFixed(2)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text>Expense:</Text>
          <Text style={[styles.summaryAmount, { color: Colors.red }]}>
            ${calculateExpenses().toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TransactionsSummary;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  },
  netBalanceAmount: {
    fontSize: 30,
    fontWeight: "bold",
  },
  summaryRow: {
    flexDirection: "row",
  },
  summaruContainer: {
    marginTop: 5,
    marginBottom: 5,
    gap: 4,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "black",
  },
  summaryAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});
