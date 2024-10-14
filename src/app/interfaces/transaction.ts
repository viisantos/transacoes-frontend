export interface Transaction {
  id: number;
  transaction_type: string;
  transaction_description: string;
  transaction_value: number;
  transaction_date: Date;
}
