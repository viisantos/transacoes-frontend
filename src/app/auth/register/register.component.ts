import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router, RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,FormsModule } from '@angular/forms';
import { UserService } from '../../services/user-service/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit{
  errorMessage: string = '';
  status: any;
  isVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router){}

  protected registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void{

   }

   get f() { return this.registerForm.controls; }

  onSubmit(){
      if(!this.registerForm.value.password){
        this.errorMessage = "Campo senha não preenchido";
      }
      if(this.registerForm.valid){
          this.authService.register(this.registerForm.value).subscribe({
              next:(response: any) => {
                this.router.navigate(['/login']);
                alert('Cadastro realizado com sucesso!');
              },
              error: (e) => {
                //console.log(e);
                alert('Não foi possível realizar o cadastro.');
                this.errorMessage = e.error.message;
                //this.errorMessage = e;
              }
          });
        }

  }

  closeDiv() {
    this.isVisible = false;
  }



}
