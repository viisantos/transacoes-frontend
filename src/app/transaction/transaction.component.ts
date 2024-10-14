import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { TransactionService } from '../services/transaction-service/transaction.service';
import { Transaction } from '../interfaces/transaction';

@Component({
  selector: 'app-transaction',
  standalone: false,
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css'
})
export class TransactionComponent implements OnInit{
  transactions: Transaction[] = [];
  filtered_Transactions: Transaction[] = [];
  dataSource: any;
  status: string = '';
  isVisible: boolean = false;
  displayedColumns: any[] = ["Tipo","Deacrição","Valor","Data"];

  constructor(private transactionService: TransactionService){}


  ngOnInit(): void {
    this.transactionService.getTransactions().subscribe((response: any )=> {
       console.log(response);
        this.transactions = response;
        this.filtered_Transactions = [...this.transactions];
        //this.filtered_Transactions = this.transactions;
    });
  }

  deleteTransaction(id: number): void {
    this.transactionService.deleteTransaction(id).subscribe((response: any) => {
      this.status = response.message;
      this.isVisible = true;
      this.filtered_Transactions = this.filtered_Transactions.filter(transaction => Number(transaction.id) !== id);
    });
  }

  closeDiv(){
    this.isVisible = false;
  }

    reverse_value: boolean = false;
    sort_value(key:any) {
        this.reverse_value = !this.reverse_value;
        if(this.reverse_value){
          this.filtered_Transactions = this.filtered_Transactions.sort((a, b) => a.transaction_value > b.transaction_value? 1 : -1);
        }else{
          this.filtered_Transactions = this.filtered_Transactions.sort((a, b) => b.transaction_value > a.transaction_value? 1 : -1);
        }

    }

    key_date: string = 'date';
    reverse_date: boolean = false;
    sort_date(key:any) {
      this.reverse_date = !this.reverse_date;
      if(this.reverse_date){
      this.filtered_Transactions = this.filtered_Transactions.sort((a, b) => a.transaction_date > b.transaction_date? 1 : -1);
      }else{
        this.filtered_Transactions = this.filtered_Transactions.sort((a, b) => b.transaction_date > a.transaction_date? 1 : -1);
      }
    }



  filterTransactions(filter:any) {
    if (filter === 'Todas') {
      this.filtered_Transactions = this.transactions;
    } else {
      this.filtered_Transactions = this.transactions.filter(
        transaction => transaction.transaction_type === filter
      );
    }
  }

  }
