import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { OrderModule } from 'ngx-order-pipe';
import { ToastrModule } from 'ngx-toastr';

/*guards*/
import { CanActivateAuthGuard } from './guards/auth/auth.guard';
import { CanActivateRegisterGuard } from './guards/register/register-guard.guard';

/*Componentes*/
//import { AppMasterComponent } from './app-master/app-master.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './logout/logout.component';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { UserComponent } from './user/user/user.component';
import { ResumoDasTransacoesComponent } from './resumo-das-transacoes/resumo-das-transacoes.component';

/*Serviços*/
import { TransactionService } from './services/transaction-service/transaction.service';
import { AuthService } from './services/auth-service/auth.service';



const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  children: [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    // Outras rotas públicas
  ]},
  { path: 'logout', component:LogoutComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'usuarios', canActivate:([CanActivateAuthGuard]), component: UserComponent },
  { path: 'cadastrar' ,canActivate:([CanActivateRegisterGuard]), component: RegisterComponent },
  { path: 'transacoes', canActivate:([CanActivateAuthGuard]), component: TransactionComponent },
  { path: 'resumo', canActivate:([CanActivateAuthGuard]), component: ResumoDasTransacoesComponent },
  { path: 'criartransacao' , canActivate:([CanActivateAuthGuard]), component: TransactionFormComponent },
  { path: 'transacoes/edit/:id', canActivate:([CanActivateAuthGuard]), component: TransactionFormComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    RouterOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatTableModule,
    OrderModule,
    ToastrModule.forRoot(),
    [RouterModule.forRoot(routes)]
  ],
  declarations: [
    //AppMasterComponent,
    AppComponent,
    LogoutComponent,
    TransactionComponent,
    TransactionFormComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    ResumoDasTransacoesComponent
  ],
  exports: [RouterModule],
  providers: [
    AuthService,
    provideHttpClient(
      withInterceptors([
        (req, next) => {
            const authToken = localStorage.getItem('auth_token');
            if(authToken != null){
                const cloned = req.clone({
                  withCredentials: true,
                  setHeaders: {
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': `Bearer ${authToken}`
                  }
                });
                return next(cloned);
            } else {
              return next(req);
          }
        }
      ])
    ),
    TransactionService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
