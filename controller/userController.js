//const {User, Basket} = require('../models/models')

//{where: {email: {[Op.like]: "email"}}}

//User.findAll({ where: { id: [1, 2] } })

//User.findAll({ where: [{ id: 1 }, { id: 2 }] })

/************************************* 
//Operator LIKE
//[Op.like]: '%hat'

//In SQL
//LIKE '%hat'

//https://sequelize.org/docs/v6/core-concepts/model-querying-finders/
const {count, rows} = await Project.findAndCountAll({
  where: {
    title: {
      [Op.like]: 'foo%'
    }
  },
  offset: 10,
  limit: 2
});
console.log(count);
console.log(rows);
************************************/



import ApiError from '../error/ApiError.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Table from '../models/models.js'

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        'secr_kelog', // process.env.SECRET_KEY
        {expiresIn: '24h'}
    )
}

class UserController {
// POST  http://localhost:8080/api/user/registration
//  
    async registration(req, res, next) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await Table.User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Table.User.create({email, role, password: hashPassword})
        //const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

// POST  http://localhost:8080/api/user/login    
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await Table.User.findOne(
            {where: {email}}
            
            )
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

// GET  http://localhost:8080/api/user/auth
// userRouter.js - router.get('/auth', authMiddleware, userController.check)
// 1. authMiddleware.js - указать токен в заголовке.
//{Authorization: Bearer eyJhbGciOiJI}
// 2. async check(req, res, next) {...} 
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

export default new UserController()
