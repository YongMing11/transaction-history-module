import { Transaction } from "../entities/Transaction";
import { mockTransactions } from "./MockTransactionData";

export interface GetTransactionsUseCase {
  execute(): Promise<Transaction[]>;
}

// Example implementation (mock data)
export class GetTransactionsUseCaseImpl implements GetTransactionsUseCase {
  async execute(): Promise<Transaction[]> {
    // In a real-world scenario, this would make an API call or interact with a data source
    // For simplicity, returning mock data here
    return mockTransactions;
  }
}
