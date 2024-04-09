import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginSuccess, User } from 'src/app/Interfaces';
import { myLoginSuccess } from 'src/app/State/Reducers/user.reducer';

@Component({
  selector: 'app-update-user',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user : LoginSuccess={
    message:'',
    name:'',
    role:'',
    token:''
  }


  updateUserForm = this.fb.group({
    name: new FormControl('',[Validators.required,Validators.minLength(3)]),
    role : new FormControl('',[Validators.required,Validators.minLength(3)])
  })

  constructor(private store : Store<{user:User}>,private fb : FormBuilder){
    this.store.select(myLoginSuccess).subscribe(data=>{
      this.user = data as LoginSuccess;
      this.updateUserForm.patchValue({
        name: this.user.name,
        role : this.user.role,
      })

    })
  }
  ngOnInit(): void {
    
  }

  onSubmit(){
    console.log(this.updateUserForm.value);
  }



}
