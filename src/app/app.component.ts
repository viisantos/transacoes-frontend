import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'permission-api-frontend';
  in_login_route:any;
  current_route: any;

  ngOnInit(){

  }

  constructor(private authService: AuthService, private router: Router){}


    isLoggedIn(): boolean {
      this.current_route = this.router.url;
      this.in_login_route = this.current_route.includes('login');
      return this.authService._isLoggedIn();
    }

     logout():void {
      this.authService.logout().subscribe(response => {
        //console.log(response);
        if(response.status){
          this.authService.removeToken();
          this.router.navigate(['/login']);
        }else{
          if(!this.authService._isLoggedIn()){
            this.router.navigate(['/login']);
          }
        }
      });

    }
}
