//const Pool = require("pg").Pool
import { Sequelize } from "sequelize"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

//console.log('process.env = ', process.env)
export default new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
   //"crm",
   //"postgres",
   //"root",
    {
        dialect: process.env.DB_DIALECT,//'postgres', 'sqlite'
        host: process.env.DB_HOST,//"localhost",//
        port: process.env.DB_PORT, //5432//
    }
)

