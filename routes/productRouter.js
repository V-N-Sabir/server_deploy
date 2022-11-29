import Router from "express"


const router = new Router()

import salesController from "../controller/productController.js"

// Вставить токен в заголовок
import authMiddleware from '../middleware/authMiddleware.js'
//router.get('/', authMiddleware,  salesController.getAllDocs)

//router.post('/', authMiddleware, salesController.createProduct) // 
router.post('/', salesController.createProduct) // 
//router.post('/one', salesController.createOneProduct)
router.post('/search', salesController.searchProduct)
router.get('/',  salesController.getAllProduct)
router.get('/:id', salesController.getOneProduct)
router.put('/:id', salesController.updateProduct)
router.delete('/:id', salesController.deleteProduct)
 



export default router