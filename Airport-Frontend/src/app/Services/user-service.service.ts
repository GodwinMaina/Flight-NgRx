import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http:HttpClient) { }

  login(Email:string,Password:string){
    return this.http.post('http://localhost:4000/auth/login',{Email,Password})
  }

  register(Name:string,Email:string,Password:string){
    console.log(Name,Email,Password)
    return this.http.post('http://localhost:4000/auth/register',{Name,Email,Password})
  }
}
