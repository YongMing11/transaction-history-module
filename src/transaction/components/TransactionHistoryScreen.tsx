import React, { useContext, useEffect, useState } from "react";
import { ListRenderItem, View, StyleSheet, Text } from "react-native";
import { List, Title, FAB, ActivityIndicator } from "react-native-paper";
import { Transaction, TransactionDetail } from "../entities/Transaction";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { authenticate } from "../../shared/biometrics/BiometricsService";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../shared/navigation/NavigationTypes";
import { TransactionContext } from "../context/TransactionContext";
import { TransactionController } from "../interfaceAdapters/controllers/TransactionController";
import { formatDateToDateTimeStringWithoutYear, formatDateToFullDateTimeString, formatDateToMonthYearString } from "../../shared/formatter/dateFormatter";

const TransactionHistoryScreen: React.FC = () => {
  const transactionController: TransactionController =
    useContext(TransactionContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [amountVisible, setAmountVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const fetchTransactions = async () => {
    try {
      await transactionController.getTransactions();
      setTransactions(transactionController.getPresentedTransactions());
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  };

  const toggleAmountVisibility = async () => {
    try {
      const isAuthenticated = await authenticate();
      if (isAuthenticated) {
        console.log("Authenticated");
        setAmountVisible(!amountVisible);
      }
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const navigateToDetailScreen = (transaction: Transaction) => {
    const transactionDetail: TransactionDetail = {
      id: transaction.id,
      amount: transaction.amount,
      date: formatDateToFullDateTimeString(transaction.date),
      description: transaction.description,
      merchant: transaction.merchant,
      type: transaction.type,
    };
    navigation.navigate("TransactionDetail", { transactionDetail });
  };

  useEffect(() => {
    fetchTransactions();
  }, [transactionController, amountVisible]);

  const renderItem: ListRenderItem<Transaction> = ({
    item,
    index,
  }: {
    item: Transaction;
    index: number;
  }) => (
    <>
      {(index == 0 ||
        transactions[index - 1].date.getMonth() !=
          transactions[index].date.getMonth()) && (
        <List.Subheader style={styles.subheader}>
          {formatDateToMonthYearString(item.date)}
        </List.Subheader>
      )}
      <List.Item
        key={item.id}
        title={formatDateToDateTimeStringWithoutYear(item.date)}
        description={item.description}
        right={() => (
          <Title
            style={[
              styles.transactionAmount,
              item.type === "credit" ? styles.creditAmount : styles.debitAmount,
            ]}
          >
            {amountVisible
              ? (item.type === "credit" ? `+RM ` : `-RM `) + item.amount
              : "*****"}
          </Title>
        )}
        style={styles.transactionItem}
        onPress={() => navigateToDetailScreen(item)}
      />
    </>
  );

  const keyExtractor = (item: Transaction) => item.id.toString();

  return (
    <View style={styles.container}>
      {loading ? ( // Show loading indicator while fetching data
        <ActivityIndicator style={styles.loadingIndicator} />
      ) : transactions.length === 0 ? ( // Show empty message when there are no transactions
        <Text style={styles.emptyMessage}>No transactions available</Text>
      ) : (
        <List.Section>
          <FlatList
            data={transactions}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
            }
            ListFooterComponent={
              <View style={styles.transactionListFooter}></View>
            }
          />
        </List.Section>
      )}

      {/* Toggle Visibility Button */}
      <FAB
        style={styles.fab}
        icon={amountVisible ? "eye-off" : "eye"}
        onPress={toggleAmountVisibility}
        color="black"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  transactionItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ecf0f1",
  },
  transactionAmount: {
    fontSize: 18,
  },
  creditAmount: {
    color: "#59cd90", // Set credit transaction amount color to green
  },
  debitAmount: {
    color: "#ee6352", // Set debit transaction amount color to red
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff9ec",
  },
  transactionListFooter: {
    marginBottom: 70,
  },
  subheader: {
    backgroundColor: "#f0efeb", 
    padding: 8, 
    fontSize: 16,
  },
});

export default TransactionHistoryScreen;
