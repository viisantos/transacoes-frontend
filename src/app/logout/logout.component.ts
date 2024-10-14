import { Component } from '@angular/core';
import { AuthService } from '../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: false,
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
    constructor(private authService: AuthService, private router: Router){
      this.logout();
    }

    logout(){
      this.authService.logout().subscribe({
        next: (response: any) => {
          console.log(response);
          this.router.navigate(['/login']);
          localStorage.removeItem('token');
        },
        error: (e) => {
          console.log(e);
        }
      });
    }
}
