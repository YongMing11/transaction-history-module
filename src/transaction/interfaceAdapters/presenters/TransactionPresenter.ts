import { Transaction } from '../../entities/Transaction';

export interface TransactionPresenter {
  present(transactions: Transaction[]): void;
  getPresentedTransactions(): Transaction[];
}

export class ReactNativePaperTransactionPresenter implements TransactionPresenter {
  private presentedTransactions: Transaction[] = [];

  present(transactions: Transaction[]): void {
    // Format and display transactions using React Native Paper components
    transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.presentedTransactions = transactions;
  }

  getPresentedTransactions(): Transaction[] {
    return this.presentedTransactions;
  }
}
