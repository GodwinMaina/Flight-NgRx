import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginSuccess, User } from '../Interfaces';
import { Store } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { myLoginSuccess } from '../State/Reducers/user.reducer';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  user:LoginSuccess={
    message:'',
    name:'',
    role:'',
    token:''
  }

  constructor(private store:Store<{user:LoginSuccess}>){
    this.store.select(myLoginSuccess).subscribe(data=>{
      this.user = data;
    })
  }

}
