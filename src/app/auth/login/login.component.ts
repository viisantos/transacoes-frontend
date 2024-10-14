import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})

export class LoginComponent {
  errorMessage: string = '';

  constructor(private authService: AuthService, private router:Router){}

  protected loginForm = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  });

  get f() { return this.loginForm.controls; }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.authService.setToken(response.message);
          this.router.navigate(['/transacoes']);
        },

        error: (e) => {
           this.errorMessage = 'Email ou senha inválidos';
        }
    });
  }
}

/*
openRegister(){
  this.router.navigate(['/registrar']);
}*/


/*
  login(){
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/roles']);
      },

      error: (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    });

  }*/
}


