export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: "debit" | "credit";
  merchant: string;
}
