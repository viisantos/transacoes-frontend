import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private http:HttpClient) { }

  _isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  setToken(token: any): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): any {
    return localStorage.getItem('auth_token');
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  private readonly apiUrl = 'http://localhost:8000/api';

  register(user:any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/save`, user, { headers });
  }

  login(credentials: any): Observable<any>{
     return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logout(): Observable<any>{
    return this.http.get(`${this.apiUrl}/logout`);
  }
}
