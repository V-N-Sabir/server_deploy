import Router from "express"


const router = new Router()

import PriceController from "../controller/priceController.js"

// Вставить токен в заголовок
import authMiddleware from '../middleware/authMiddleware.js'


router.post('/', PriceController.createPrice)
//router.get('/', authMiddleware,  userController.getAllDocs)
router.get('/', PriceController.getAllPrice)
router.post('/search', PriceController.searchProduct)
router.get('/:id', PriceController.getOnePrice)
router.put('/:id', PriceController.updatePrice)
router.delete('/:id', PriceController.deletePrice)
 



export default router