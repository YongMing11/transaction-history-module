import * as SecureStore from "expo-secure-store";
import { Transaction } from "../entities/Transaction";
import { AuthenticationError } from "../../shared/errorBoundary/AuthenticationError";

export interface GetTransactionsUseCase {
  execute(): Promise<Transaction[]>;
}

// Implementation (mock api)
export class GetTransactionsUseCaseImpl implements GetTransactionsUseCase {
  private async getSessionToken(): Promise<string | null> {
    try {
      // Retrieving the session token from secure storage
      return await SecureStore.getItemAsync("SESSION_TOKEN_KEY");
    } catch (error) {
      throw new Error("Error retrieving session token");
    }
  }

  async execute(): Promise<Transaction[]> {
    try {
      const sessionToken = await this.getSessionToken();

      const response = await fetch(
        "https://656d32d5bcc5618d3c22e352.mockapi.io/api/transactions",
        {
          headers: {
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          // Handle unauthorized (authentication failure) here and redirect to the login screen
          throw new AuthenticationError("Authentication failed. Redirecting to login screen.");
        } else {
          // If not successful for other reasons, handle the error (e.g., network error)
          throw new Error(`Failed to fetch data. Status: ${response.status}`);
        }
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
