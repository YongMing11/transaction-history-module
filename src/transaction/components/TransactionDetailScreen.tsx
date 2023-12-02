import React from "react";
import { View, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../shared/navigation/NavigationTypes";
import { Divider, Title, Text } from "react-native-paper";

type TransactionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "TransactionDetail"
>;

type Props = {
  route: TransactionDetailScreenRouteProp;
};

const TransactionDetailScreen: React.FC<Props> = ({ route }) => {
  const { transaction } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Title
          style={[
            styles.amount,
            transaction.type === "credit"
              ? styles.creditAmount
              : styles.debitAmount,
          ]}
        >
          {transaction.type === "credit" ? `+ RM ` : `- RM `}
          {transaction.amount}
        </Title>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Merchant:</Text>
        <Text style={styles.infoText}>{transaction.merchant}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Transaction Date:</Text>
        <Text style={styles.infoText}>
          {new Date(transaction.date).toLocaleString()}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Description:</Text>
        <Text style={styles.infoText}>{transaction.description}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Type:</Text>
        <Text style={styles.infoText}>{transaction.type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 24,
  },
  creditAmount: {
    color: "#4CAF50", // Green color for credit
  },
  debitAmount: {
    color: "#F44336", // Red color for debit
  },
  title: {
    marginRight: 8,
    width: 120, // Adjust as needed
  },
  infoText: {
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  divider: {
    marginVertical: 16,
  },
});

export default TransactionDetailScreen;
