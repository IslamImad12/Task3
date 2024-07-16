import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { Transaction } from 'src/app/models/transaction';
import { DataService } from 'src/app/services/data.service';
import { CustomerGraphComponent } from '../customer-graph/customer-graph.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
})
export class CustomerTableComponent implements OnInit {
  constructor(private _DataService: DataService, public dialog: MatDialog) {}

  // for table data
  customers: Customer[] = [];
  private _transactions: Transaction[] = [];
  customerTransaction: { [key: string]: number } = {};

  // for filter feature by name
  filteredCustomers: Customer[] = [];
  customerSearchInput: string = '';

  // for filter feature amount
  minAmountRange: number = 0;
  maxAmountRange: number = 10000;
  amountRange: number = 0;

  // displaying a chart for a selected customer
  selectedCustomerTransactions: Transaction[] = [];

  ngOnInit(): void {
    this._DataService.getCustomers().subscribe((data) => {
      // console.log(data);
      this.customers = data;
      this._calculateTransaction();

      this.filterCustomers(); // Apply initial filter

      // this.filteredCustomers = this.customers;
    });

    this._DataService.getTransactions().subscribe((data) => {
      this._transactions = data;
      this._calculateTransaction();
      // console.log(this.customerTransaction);
      this.filterCustomers(); // Apply initial filter
    });
  }

  private _calculateTransaction(): void {
    let maxAmount = 0;

    this.customerTransaction = this.customers.reduce((amounts, customer) => {
      // to calculate total amount for each customer
      const totalAmount = this._transactions
        .filter((transaction) => transaction.customer_id === customer.id)
        .reduce((sum, transaction) => sum + transaction.amount, 0);

      amounts[customer.id] = totalAmount;
      maxAmount = Math.max(maxAmount, totalAmount);
      return amounts;
    }, {} as { [key: string]: number });

    this.maxAmountRange = maxAmount;
  }

  filterCustomers(): void {
    this.filteredCustomers = this.customers.filter((customer) => {
      const matchesName = customer.name
        .toLowerCase()
        .includes(this.customerSearchInput.toLowerCase());
      const totalAmount = this.customerTransaction[customer.id] || 0;
      const matchesAmount = totalAmount >= this.amountRange;
      return matchesName && matchesAmount;
    });
  }

  showChart(customer: Customer): void {
    this.selectedCustomerTransactions = this._transactions.filter(
      (transaction) => transaction.customer_id === customer.id
    );
    this.dialog.open(CustomerGraphComponent, {
      width: '600px',
      data: {
        transactions: this.selectedCustomerTransactions,
      },
    });
  }
}
