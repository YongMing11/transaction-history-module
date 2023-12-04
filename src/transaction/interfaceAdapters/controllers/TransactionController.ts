import { Transaction } from '../../entities/Transaction';
import { GetTransactionsUseCase } from '../../useCases/GetTransactions';
import { TransactionPresenter } from '../presenters/TransactionPresenter';

export class TransactionController {
  constructor(
    private readonly getTransactionsUseCase: GetTransactionsUseCase,
    private readonly transactionPresenter: TransactionPresenter
  ) {}

  async getTransactions(): Promise<void> {
    try {
      // Use case call to fetch transactions
      const transactions = await this.getTransactionsUseCase.execute();
      // Pass transactions to presenter
      this.transactionPresenter.present(transactions);
    } catch (error) {
      console.error('Error in getTransactions:', error);
    }
  }

  getPresentedTransactions(): Transaction[] {
    // Delegate to the presenter to get the presented transactions
    return this.transactionPresenter.getPresentedTransactions();
  }
}