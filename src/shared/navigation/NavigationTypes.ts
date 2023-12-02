import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Transaction } from "../../transaction/entities/Transaction";
import { TransactionController } from "../../transaction/interfaceAdapters/controllers/TransactionController";

export type RootStackParamList = {
  TransactionHistory: { transactionController: TransactionController };
  TransactionDetail: { transaction: Transaction };
};

export type TransactionHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransactionHistory"
>;

export type TransactionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "TransactionDetail"
>;
