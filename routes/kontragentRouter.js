import Router from 'express'
const router = new Router()
import KontrController from "../controller/KontragentController.js"


//import authMiddleware from '../middleware/authMiddleware.js'
//router.get('/', authMiddleware,  KontrController.createKontragent)

router.post('/', KontrController.createKontragent)
router.get('/', KontrController.getAllKontragents)
router.post('/search', KontrController.searchKontragent)
router.get('/:id', KontrController.getOneKontragent)
router.put('/:id', KontrController.updateKontragent)
router.delete('/:id', KontrController.deleteKontragent)


export default router