import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private router: Router) { }

  getTransactions(): Observable<any>{
   return this.http.get<any>(`${this.apiUrl}/transacoes`);
  }

  getTransaction(id:number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/transacoes/${id}`);
  }

  getSummary(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/resumo`);
  }

  createTransaction(transaction:any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/transacoes`, transaction);
  }

  updateTransaction(id: number, transaction:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/transacoes/${id}`, transaction);
  }

  deleteTransaction(id: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/transacoes/${id}`);
  }


}
