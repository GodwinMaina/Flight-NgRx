import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { ErrorComponent } from 'src/app/error/error.component';
import { Store } from '@ngrx/store';
import { LoginUser } from 'src/app/Interfaces';
import * as UserActions from '../../State/Actions/user.actions'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,ErrorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup
  error=null
  constructor(private fb:FormBuilder, private api:AuthenticationService, private auth :AuthService,
    private router:Router,private store : Store<{user:LoginUser}>
    ){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      Email:[null, [Validators.required, Validators.email]],
      Password:[null, Validators.required]
    })
  }

  submitForm(){
    if(this.form.valid){
      this.store.dispatch(UserActions.login({Email:this.form.value.Email,Password:this.form.value.Password}))
      this.auth.login()
      this.router.navigate(['/book'])

    }
  }


  Close(){
    this.error=null
  }


}

/*

onSubmit() {
  if (this.loginForm.valid) {
    console.log('Form submitted successfully');

    this.api.loginUser(
      this.loginForm.value.email,
      this.loginForm.value.password).subscribe(

      (res:any) => {
        console.log(res);
        console.log(res.error);
        console.log(res.message);

        if(res.error){
          console.log(res);
          this.userNotFound=res.error;

          setTimeout(() => {
            this.loginForm.reset();
            this.userNotFound = '';
          }, 3000);

        }

        else {

          this.showSuccessMessage = true;
          this.successMessage = res.message;

        console.log('happy');

        const type= res.UserType
        const fname= res.firstname
         res.photo
        //  let isProfiled = res.isProfiled

        //  if (res.email='godwin@gmail.com'){
        //   localStorage.setItem('adminEmail', res.email='godwin@gmail.com')
        //  }

        let email = res.email
        localStorage.setItem('EMAIL',email)

        let specialistID=res.specialist_id
        localStorage.setItem('specialistID',specialistID)

         let clientID=res.client_id
         localStorage.setItem('clientID',clientID)

        // const email= res.email
        const token = res.token
        localStorage.setItem('token',token)

         res.client_id
         res.specialist_id
         const admin = res.isAdmin
         console.log(admin);



         res.phone
        // const isAdmin = res.isAdmin;

        if (type === "Specialist") {
          this.router.navigate(['/dashboard/specialist']);
        }

        else if (type === "Client" && !admin) {
          this.router.navigate(['/dashboard/client']);

        } else if (type === "Client" && admin) {
          this.router.navigate(['/dashboard/admin']);

          // let adminEmails = localStorage.getItem('adminEmail')
          // console.log(adminEmails);


        } else {
          this.router.navigate(['/NotFound']);
        }

        }

        this.loginForm.reset();
      },

      (error) => {
        console.error('Error:', error);
      }
    );


  } else {
    console.log('Form has errors');
  }
}
 */
