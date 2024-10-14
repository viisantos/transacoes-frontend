import { TransactionService } from '../services/transaction-service/transaction.service';
import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators as V,FormsModule } from '@angular/forms';
import { Transaction } from '../interfaces/transaction';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-role-form',
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent implements OnInit{
  transaction: Transaction = {id:0, transaction_type:'',transaction_description:'',transaction_value:0,transaction_date:new Date()};
  isNew: boolean = true;
  status: string = '';
  isVisible: boolean = false;
  transactionId: any;

  types: any = [{id:'Entrada', name:'Entrada'},
                {id:'Saída',name:'Saída'}];

  constructor(
    private transactionService: TransactionService,
    private route: ActivatedRoute,
    private router: Router
  ){}


  protected transactionForm = new FormGroup({
    transaction_type: new FormControl([V.required,V.pattern('^[a-zA-Z ]*'), V.minLength(3), V.maxLength(200)]),
    transaction_description: new FormControl([V.required,V.pattern('^[a-zA-Z ]*'), V.minLength(3), V.maxLength(200)]),
    transaction_value: new FormControl([V.required, V.min(1), V.max(1000000), V.pattern('^[0-9]*')]),
    transaction_date: new FormControl([V.required, V.pattern('^\\d{2}-\\d{2}-\\d{4}$'),]),
  });

  get f() { return this.transactionForm.controls; }

  ngOnInit(): void{
    this.transactionId = this.route.snapshot.params['id'];
    if(this.transactionId){
      this.isNew = false;
      this.transactionService.getTransaction(this.transactionId).subscribe(data => {
        this.transaction = data;
        this.transactionForm.patchValue({
          transaction_type: data.transaction_type,
          transaction_description: data.transaction_description,
          transaction_value: data.transaction_value,
          transaction_date: data.transaction_date
        });
      });
    }else{
      this.transactionForm.reset();
    }
  }

  onSubmit(): void {
    if(this.isNew){
      if(this.transactionForm.valid){
        this.transactionService.createTransaction(this.transactionForm.value).subscribe({
        next: (response: any) => {
          //console.log("resposta do store : ", response);
          //this.status = response.message;
          //this.isVisible = true;
          if(!response.success){
            alert(""+response.message);
          }else{
            alert("Transação cadastrada com sucesso!");
          }
          this.router.navigate(['/transacoes']);

        },

        error: (e) => {
          console.log("excecao :",e);
          alert(e.error.message);
        }
      });
    }
    }else{
      this.transactionId = Number(this.route.snapshot.params['id']);
      if(this.transactionId){
        if(this.transactionForm.valid){
          this.transactionService.updateTransaction(this.transactionId, this.transactionForm.value).subscribe((response) => {
            //console.log("resposta do update : ",response);
            //this.status = response.message;
            //this.isVisible = true;
            if(!response.success){
              alert(""+response.message);
            }else{
              alert("Transação atualizada com sucesso!");
            }
            this.router.navigate(['/transacoes']);
          });
        }
      }
    }
  }

  closeDiv() {
    this.isVisible = false;
  }
}
