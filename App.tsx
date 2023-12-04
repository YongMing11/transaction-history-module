import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TransactionHistoryScreen from "./src/transaction/components/TransactionHistoryScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import TransactionDetailScreen from "./src/transaction/components/TransactionDetailScreen";
import LoginScreen from "./src/authentication/components/LoginScreen";
import * as Sentry from "@sentry/react-native";
import { TransactionProvider } from "./src/transaction/context/TransactionContext";
import ErrorBoundary from "./src/shared/errorBoundary/ErrorBoundary";

// Initialize Sentry
Sentry.init({
  dsn: "https://9da6d1893e4d9a2bbf0857df5c3996ac@o4506330453835776.ingest.sentry.io/4506330456326144",
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ErrorBoundary>
      <TransactionProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="TransactionHistory"
              options={{ title: "Transaction History" }}
              component={TransactionHistoryScreen}
            />
            <Stack.Screen
              name="TransactionDetail"
              options={{ title: "Transaction Detail" }}
              component={TransactionDetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TransactionProvider>
      </ErrorBoundary>
    </SafeAreaView>
  );
};

export default App;
