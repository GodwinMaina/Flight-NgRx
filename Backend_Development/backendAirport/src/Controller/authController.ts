import { RequestHandler,Request,Response } from 'express'
import {v4 as uid} from 'uuid'
import { LoginSchema, RegistrationSchema } from '../validators/validators'
import { DecodedData, User } from '../Models'
import Bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import path from 'path'
import jwt from 'jsonwebtoken'
import { DatabaseHelper} from '../dbHelpers/dbHelpers'

const  _db = new DatabaseHelper()
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const SECRETKEY = 'sfh182345ertyh'


interface ExtendedRequest extends Request{
    body:{Name:string ,Email:string,Password:string, ConfirmPassword:string}
    info?:DecodedData
}
export async function RegisterUser(req:ExtendedRequest, res:Response){
try {
    const Id =uid()
    const{Name,Email,Password} = req.body
    console.log(req.body)
    const {error} =RegistrationSchema.validate(req.body)
    if(error){
        return res.status(422).json(error.details[0].message)
    }
    const hashedPassword= await Bcrypt.hash(Password,10)
    ///check if email exist
    await _db.exec('RegisterUser', {Id,Name:Name,Email:Email, Password:hashedPassword})
    return res.status(201).json({message:'NEW User registered'})

} 
catch (error) {
     res.status(500).json(error) 
}
}


export async function loginUser(req:ExtendedRequest, res:Response){
try {
    const{Email,Password} = req.body

    const {error} =LoginSchema.validate(req.body)
    if(error){
        return res.status(422).json(error.details[0].message)
    }

    else{

   
    const user:User[]= await (await _db.exec('getUserByEmail', {Email:Email} )).recordset

        if(!user[0]){
         return res.status(404).json({error:'User Not found'})
        }
    const valid= await Bcrypt.compare(Password, user[0].Password)
    if(!valid){
        return res.status(404).json({error:'User Not found'})
    }

    const payload= user.map(item=>{
        const {Password,...rest}=item
        return rest
    })
    const token = jwt.sign(payload[0], process.env.SECRETKEY as string ||  SECRETKEY , {expiresIn:'3600s'})
    return res.status(200).json({message:'User Loggedin!!!', token, role:user[0].Role, name:user[0].Name})
    }
} catch (error) {
    res.status(500).json(error) 
}
}


export async function Homepage(req:ExtendedRequest,res:Response) {
    try {
      if(req.info){
        return res.status(200).json(`Welcome ${req.info.Name}`)
      }  
    } catch (error) {
        
    }
}