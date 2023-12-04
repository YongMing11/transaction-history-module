import { Transaction } from "../entities/Transaction";

export interface GetTransactionsUseCase {
  execute(): Promise<Transaction[]>;
}

// Implementation (mock api)
export class GetTransactionsUseCaseImpl implements GetTransactionsUseCase {
  async execute(): Promise<Transaction[]> {
    try {
      const response = await fetch(
        "https://656d32d5bcc5618d3c22e352.mockapi.io/api/transactions"
      );

      if (!response.ok) {
        // If not successful, handle the error (e.g., network error)
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }

      const responseData: any[] = await response.json();

      // Validate the structure of the raw data
      if (!Array.isArray(responseData)) {
        throw new Error("Invalid data structure");
      }

      const mockTransactions: Transaction[] = responseData.map((data: any) => {
        return {
          id: data.id,
          amount: data.amount,
          date: new Date(data.date),
          description: data.description,
          type: data.type,
          merchant: data.merchant,
        };
      });
      return mockTransactions;
    } catch (error) {
      // Handle network errors and other potential issues
      console.error("Error fetching data:", error);
      // Propagate the error to the caller
      throw error; 
    }
  }
}
