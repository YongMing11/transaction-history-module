import React, { useEffect, useState } from "react";
import { ListRenderItem, View, StyleSheet } from "react-native";
import { TransactionController } from "../interfaceAdapters/controllers/TransactionController";
import { List, Divider, Title, FAB } from "react-native-paper";
import { Transaction } from "../entities/Transaction";
import { FlatList, RefreshControl } from "react-native-gesture-handler";
import { authenticate, enableBiometrics } from "../../shared/biometrics/BiometricsService";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../shared/navigation/NavigationTypes";

interface Props {
  transactionController: TransactionController;
}

const TransactionHistoryScreen: React.FC<Props> = ({
  transactionController,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [amountVisible, setAmountVisible] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const fetchTransactions = async () => {
    try {
      await transactionController.getTransactions();
      setTransactions(transactionController.getPresentedTransactions());
    } catch (error) {
      console.error("Error fetching transactions:", error);
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
    navigation.navigate("TransactionDetail", { transaction });
  };

  useEffect(() => {
    fetchTransactions();
  }, [transactionController, amountVisible]);

  const renderItem: ListRenderItem<Transaction> = ({ item }: { item: Transaction }) => (
    <List.Item
      key={item.id}
      title={new Date(item.date).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}
      description={item.description}
      right={() => (
        <Title style={[styles.transactionAmount, item.type === "credit" ? styles.creditAmount : styles.debitAmount]}>
          {amountVisible ? (item.type === "credit" ? `+RM ` : `-RM `)+item.amount : '*****'}
        </Title>
      )}
      style={styles.transactionItem}
      onPress={() => navigateToDetailScreen(item)}
    />
  );

  const keyExtractor = (item: Transaction) => item.id.toString();

  return (
    <View style={styles.container}>
      <List.Section>
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      </List.Section>

      {/* Toggle Visibility Button */}
      <FAB
        style={styles.fab}
        icon={amountVisible ? "eye-off" : "eye"}
        onPress={toggleAmountVisibility}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", 
  },
  subheader: {
    color: "#3498db",
  },
  transactionItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: "#ecf0f1",
  },
  transactionAmount: {
    fontSize: 18,
  },
  creditAmount: {
    color: "#2ecc71", // Set credit transaction amount color to green
  },
  debitAmount: {
    color: "#e74c3c", // Set debit transaction amount color to red
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#e74c3c", 
  },
});

export default TransactionHistoryScreen;
