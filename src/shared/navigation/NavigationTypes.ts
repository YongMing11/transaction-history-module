import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { TransactionDetail } from "../../transaction/entities/Transaction";
import { TransactionController } from "../../transaction/interfaceAdapters/controllers/TransactionController";

export type RootStackParamList = {
  Login: undefined;
  TransactionHistory: { transactionController: TransactionController };
  TransactionDetail: { transactionDetail: TransactionDetail };
};

export type TransactionHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "TransactionHistory"
>;

export type TransactionDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "TransactionDetail"
>;
