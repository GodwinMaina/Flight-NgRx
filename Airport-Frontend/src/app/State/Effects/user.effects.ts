import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, mergeMap, of, tap } from "rxjs";
import { UserServiceService } from "src/app/Services/user-service.service";
import * as UserActions from '../Actions/user.actions'
import { User,LoginUser } from "src/app/Interfaces";
import { Router } from "@angular/router";



@Injectable()

export class UserEffects{

        constructor(private userService:UserServiceService,private actions$:Actions, private router:Router){}

        login=createEffect(()=>{
            return this.actions$.pipe(
                ofType(UserActions.login),
                mergeMap((action:LoginUser)=>{
                return this.userService.login(action.Email,action.Password).pipe(
                        map((successResponse:any)=>{

                            localStorage.setItem('token',successResponse.token)
                            console.log(successResponse);



                            return UserActions.loginOK({message:successResponse.message,token:successResponse.token,role:successResponse.role,name:successResponse.name})

                        }),
                        catchError(error=>of(UserActions.loginFAIL({error:error.message}))),

                    )
                })
            )
        })

        register = createEffect(()=>{
        return this.actions$.pipe(
            ofType(UserActions.register),
            concatMap((action:User)=>{
                return this.userService.register(action.Name,action.Email,action.Password).pipe(
                    map(successResponse=>{
                        console.log(successResponse)
                        return UserActions.registerOK({message:'User Registered Successfully'})
                    }),
                )
            })
        )
        })

    }
