/* import dotenv from 'dotenv'
import path from 'path'

// process.env.DB_USER as string
// process.env.DB_PWD as string
// process.env.DB_NAME as string 
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
export const sqlConfig = {

  user: 'sa',
  password: 'on07mawa',
  database:'AirPort',
  server: '54.92.74.57',

  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  options: {
    encrypt: false, // for azure
    trustServerCertificate: false // change to true for local dev / self-signed certs
  }
} */


import dotenv from 'dotenv'



dotenv.config();

console.log(process.env.DB_NAME);


// 
export const sqlConfig = {
  user: process.env.DB_USER as string || 'sa',
  password: process.env.DB_PWD as string || '#Atopwudan@10$',
  database: process.env.DB_NAME as string || 'AIRPORT',
  server: process.env.SERVER as string || 'DESKTOP-399MC6B',

    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },

    options:{
        encrypt: false,
        trustServerCertificate: true
    }
}

console.log(sqlConfig);
console.log('sqlConfig');