import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionHistoryScreen from "./src/transaction/components/TransactionHistoryScreen";
import { TransactionController } from "./src/transaction/interfaceAdapters/controllers/TransactionController";
import { GetTransactionsUseCaseImpl } from "./src/transaction/useCases/GetTransactions";
import { ReactNativePaperTransactionPresenter } from "./src/transaction/interfaceAdapters/presenters/TransactionPresenter";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionDetailScreen from "./src/transaction/components/TransactionDetailScreen";

const Stack = createStackNavigator();
const transactionController = new TransactionController(
  new GetTransactionsUseCaseImpl(),
  new ReactNativePaperTransactionPresenter()
);

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TransactionHistory">
          <Stack.Screen
            name="TransactionHistory"
            options={{ title: "Transaction History" }}
          >
            {(props) => (
              <TransactionHistoryScreen
                {...props}
                transactionController={transactionController}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="TransactionDetail"
            options={{ title: "Transaction Detail" }}
            component={TransactionDetailScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
