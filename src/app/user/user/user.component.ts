import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service/user.service';
import { User } from '../../interfaces/user';


@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit{
  users: User[] = [];
  status: string = '';
  isVisible: boolean = false;


  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
        this.users = data;
    });
  }


  closeDiv(){
    this.isVisible = false;
  }

}
