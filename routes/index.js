import Router from 'express'
const router = new Router()

import UserRouter from '../routes/userRouter.js'

import docRouter from './docRouter.js'
import RowsController from '../routes/rowRouter.js'
import KontrRouter from '../routes/kontragentRouter.js'
import ProductRouter from './productRouter.js'
import statusRouter from './statusRouter.js'
import priceProduct from './priceRouter.js'
  //test
router.use('/user', UserRouter)

router.use('/product', ProductRouter)
router.use('/kontragent', KontrRouter)

router.use('/doc', docRouter)
router.use('/rows', RowsController)

router.use('/status', statusRouter)

router.use('/price', priceProduct)



export default router