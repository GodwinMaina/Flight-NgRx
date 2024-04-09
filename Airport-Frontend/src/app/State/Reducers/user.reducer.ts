import { createReducer ,createSelector, on, createFeatureSelector} from '@ngrx/store';
import { User,LoginSuccess } from 'src/app/Interfaces';
import * as UserActions from '../Actions/user.actions'



//the shape of the state
//defines structure of the data related to authentication that will be store in the store.
export interface UserInterface{
    user:User,
    error:string,
    loginOK:LoginSuccess,
    loginFAIL:string,
    registerOK:string,
    registerFAIL:string

}

//INITIAL STATE OF UserInterface
const initialState:UserInterface={
    user:{
        Name:'',
        Email:'',
        Password:'',
    },
    error:'',
    loginOK:{
        message:'',
        token:'',
        role:'',
        name:''
    },
    loginFAIL:'',
    registerOK:'',
    registerFAIL:''
}


const userSliceState= createFeatureSelector<UserInterface>('user')

export const myUser= createSelector(userSliceState, state=>state.user)

export const myLoginSuccess= createSelector(userSliceState, state=>state.loginOK)

export const myLoginError= createSelector(userSliceState, state=>state.loginFAIL)

export const myRegisterSuccess= createSelector(userSliceState, state=>state.registerOK)

export const myRegisterError= createSelector(userSliceState, state=>state.registerFAIL)




//reducer takes 2 arguments the initial state and the on function
//initialstate is the state before any actions are dispatched
//on function takes 2 parameters that is
// 1.action type like UserActions.loginFAIL and the
// 2.callback function that receives current state and action payload and returns new state
export const userReducer=createReducer(
    initialState,
    on(UserActions.loginOK,(state,action)=>{
        return{
            ...state,
            loginOK:action
        }
    }
    ),
    on(UserActions.loginFAIL,(state,action)=>{
        return{
            ...state,
            loginFAIL:action.error
        }
    }
    ),


    on(UserActions.loginOUT,(state)=>{
      return{
          ...state,
          loginOUT:initialState
      }
  }
  ),


    on(UserActions.registerOK,(state,action)=>{
        return{
            ...state,
            registerOK:action.message
        }
    }
    ),
)


