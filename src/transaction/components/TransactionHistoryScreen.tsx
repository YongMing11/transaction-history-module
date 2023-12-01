import React, { useEffect, useState } from "react";
import { ListRenderItem, View } from "react-native";
import { TransactionController } from "../interfaceAdapters/controllers/TransactionController";
import { List, Divider, Title } from "react-native-paper";
import { Transaction } from "../entities/Transaction";
import { FlatList, RefreshControl } from "react-native-gesture-handler";

interface Props {
  transactionController: TransactionController;
}

const TransactionHistoryScreen: React.FC<Props> = ({
  transactionController,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTransactions = async () => {
    try {
      // Fetch transactions using the controller
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

  useEffect(() => {
    fetchTransactions();
  }, [transactionController]);

  const renderItem: ListRenderItem<Transaction> = ({ item }: { item: Transaction }) => (
    <List.Item
      key={item.id}
      // format the date from ISO 8601 into DD Feb YYYY, XX:XXAM/PM
      title={new Date(item.date).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}
      description={item.description}
      right={() => <Title>{item.type=="credit"?"+RM ":"-RM "}{item.amount}</Title>}
      style={{ borderBottomWidth: 0.5, borderBottomColor: "lightgrey" }}
      />
  );

  const keyExtractor = (item: Transaction) => item.id.toString();

  return (
    <View>
      <List.Section>
        <List.Subheader>Recent Transactions</List.Subheader>
        <Divider />
        <FlatList
          data={transactions}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          // onEndReachedThreshold={0.1} // Trigger onEndReached when 10% from the end
          // onEndReached={onEndReached}
        />
      </List.Section>
    </View>
  );
};

export default TransactionHistoryScreen;
