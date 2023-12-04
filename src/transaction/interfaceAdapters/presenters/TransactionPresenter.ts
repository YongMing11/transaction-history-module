import { Transaction } from '../../entities/Transaction';

export interface TransactionPresenter {
  present(transactions: Transaction[]): void;
  getPresentedTransactions(): Transaction[];
}

export class TransactionPresenterImpl implements TransactionPresenter {
  private presentedTransactions: Transaction[] = [];

  present(transactions: Transaction[]): void {
    if(!transactions) return;
    // Format and display transactions using React Native Paper components
    transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
    this.presentedTransactions = transactions;
  }

  getPresentedTransactions(): Transaction[] {
    return this.presentedTransactions;
  }
}
