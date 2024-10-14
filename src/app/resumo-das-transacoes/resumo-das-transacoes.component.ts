import { Component } from '@angular/core';
import { TransactionService } from '../services/transaction-service/transaction.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-resumo-das-transacoes',
  standalone: false,
  templateUrl: './resumo-das-transacoes.component.html',
  styleUrl: './resumo-das-transacoes.component.css'
})
export class ResumoDasTransacoesComponent implements OnInit {
  resumo: any;

  constructor(private transactionService: TransactionService){}

  ngOnInit(): void {
    this.transactionService.getSummary().subscribe((response: any )=> {
        console.log(response);
        this.resumo = response;
    });
  }
 

}
