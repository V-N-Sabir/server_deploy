import jwt from 'jsonwebtoken'

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer token_asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, 'secr_kelog') // process.env.SECRET_KEY
        // Сделать проверку на decoded. Если волиден token - тогда next() иначе выдать ошибку.
        req.user = decoded
        //console.log('req.user', req.user)
        next()
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
};
