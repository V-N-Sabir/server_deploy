import Router from 'express'
const router = new Router()
import RowsController from "../controller/rowsSalesController.js"

router.post('/', RowsController.createRows)
router.get('/', RowsController.getAllRowses)
router.get('/:id', RowsController.getRows)
router.put('/:id', RowsController.updateRows)
router.delete('/:id', RowsController.deleteRow)


export default router