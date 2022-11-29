//const Router = require('express')
//const router = new Router()
//const userController = require('../controllers/userController')
//const authMiddleware = require('../middleware/authMiddleware')

import Router from 'express'
const router = new Router()

import userController from '../controller/userController.js'
import authMiddleware from '../middleware/authMiddleware.js'


router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

export default router