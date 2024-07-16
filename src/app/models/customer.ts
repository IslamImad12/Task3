export interface Customer {
  id: number;
  name: string;
  transactionAmount?: number;
}

export interface CustomerTransaction {
  id?: string;
  transactionAmount?: number;
}
