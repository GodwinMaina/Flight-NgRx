import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoginUser, User } from 'src/app/Interfaces';
import * as UserActions from '../../State/Actions/user.actions'

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  form!:FormGroup
  constructor(private fb:FormBuilder, private router:Router,private store : Store<{user:User}>){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Name:[null, Validators.required],
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required]
    })
  }
  submitForm(){
    if(this.form.valid){
      console.log(this.form.value)
      this.store.dispatch(UserActions.register({Name:this.form.value.Name,Email:this.form.value.Email,Password:this.form.value.Password}))
      this.router.navigate([''])
    }
  }
}
