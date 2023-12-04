export interface Transaction {
  id: number;
  amount: number;
  date: Date;
  description: string;
  type: "debit" | "credit";
  merchant: string;
}

export interface TransactionDetail {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
  merchant: string;
}
