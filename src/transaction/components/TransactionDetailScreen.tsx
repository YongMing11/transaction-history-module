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
  const { transactionDetail } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <Title
          style={[
            styles.amount,
            transactionDetail.type === "credit"
              ? styles.creditAmount
              : styles.debitAmount,
          ]}
        >
          {transactionDetail.type === "credit" ? `+ RM ` : `- RM `}
          {transactionDetail.amount}
        </Title>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Merchant:</Text>
        <Text style={styles.infoText}>{transactionDetail.merchant}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Transaction Date:</Text>
        <Text style={styles.infoText}>
          {transactionDetail.date}
        </Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.title}>Description:</Text>
        <Text style={styles.infoText}>{transactionDetail.description}</Text>
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
    color: "#59cd90", // Green color for credit
  },
  debitAmount: {
    color: "#ee6352", // Red color for debit
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
