//require('dotenv').config() // commonJS
//import {} from 'dotenv/config' // module
import express from "express"
import sequelize from "./db.js"
import cors from 'cors'
//import userRouter from "./routes/docRouter.js"
import router from "./routes/index.js"
import models from './models/models.js'

const PORT = process.env.PORT || 8080

const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log("Ошибка", e)
    }
}

app.use(cors())
app.use(express.json())

app.use('/api', router)

start()
//models()