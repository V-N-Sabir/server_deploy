import Router from "express"


const router = new Router()

import userController from "../controller/docController.js"

// Вставить токен в заголовок
import authMiddleware from '../middleware/authMiddleware.js'


router.post('/', userController.createDoc)
//router.get('/', authMiddleware,  userController.getAllDocs)
router.get('/', userController.getAllDocs)
router.get('/:id', userController.getOneDoc)
router.put('/:id', userController.updateDoc)
router.delete('/:id', userController.deleteDoc)
 



export default router
