import { createAction, props } from "@ngrx/store";
import { LoginSuccess, LoginUser, User } from "src/app/Interfaces";
// import { myLoginSuccess } from "../Reducers/user.reducer";




//actions have 2 part the type and the payload passed in as the props as secon argument
//first argument is the action
//the [Auth] is just a feature name andform part of the action type
//the action for eg are const Login,const LoginOK

//ACTION FORLOGGIN USER
export const login = createAction('[Auth] Login', props<{Email:string,Password:string}>())

//ACTION AFTER LOGGING IS SUCCESFULL
export const loginOK = createAction('[Auth] LoginOK', props<LoginSuccess>())

//ACTION FOR LOGIN FAILURE
export const loginFAIL = createAction('[Auth] LoginFAIL', props<{error:string}>())


//ACTION FOR LOGOUT
export const loginOUT = createAction('[Auth] LoginOUT')



export const register = createAction('[register] register', props<User>())

export const registerOK = createAction('[register] registerOK', props<{message:string}>())





















/*
export const login = createAction(
    '[Login Page] User Login',
    props<LoginUser>()
)

export const loginSuccess = createAction(
    '[Login Page] User Login Success',
    props<LoginSuccess>()
)

export const loginFailure = createAction(
    '[Login Page] User Login Failure',
    props<{ error: string }>()
)

export const logout = createAction(
    '[Logout Page] User Logout'
)

export const logoutSuccess = createAction(
    '[Logout Page] User Logout Success'
)

export const logoutFailure = createAction(
    '[Logout Page] User Logout Failure',
    props<{ error: string }>()
)

export const register = createAction(
    '[Register Page] User Register',
    props<User>()
)

export const registerSuccess = createAction(
    '[Register Page] User Register Success',
    props<{ message: string }>()
)

export const registerFailure = createAction(
    '[Register Page] User Register Failure',
    props<{ error: string }>()
)

export const getLogedInUser = createAction(
    '[Get Logged In User] Get Logged In User',
    props<LoginSuccess>()
)

export const UpdateUser = createAction(
    '[Update User] Update User',
    props<User>()
)

export const UpdateUserSuccess = createAction(
    '[Update User] Update User Success',
    props<{ message: string }>()
)

export const UpdateUserFailure = createAction(
    '[Update User] Update User Failure',
    props<{ error: string }>()
)
 */
