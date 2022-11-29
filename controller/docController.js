import Table from '../models/models.js'
import sequelize from "sequelize"
class UserController {
// 13:36
//http://localhost:8080/api/doc POST
	async createDoc(req, res) {
 
		try {
			const {name, kontragentId, userId, date_doc,statusDocumentId} = req.body
			const doc = await Table.Document_order.create(
				{name, 
				kontragentId, 
				userId: userId,
				date_doc: date_doc,//new Date(),
				statusDocumentId,
				}
				)
			return res.json(doc)
		} catch (e) {
			return res.json(e)
		}		
	}
	
//GET http://localhost:8080/api/doc?limit=3&page=1	
// для front-end - {"count": 10,"rows": [{....},{....}]} count - для отображения кнопок
// router.get('/', authMiddleware,  userController.getAllDocs)
// Вставить токен в заголовок.
	async getAllDocs(req, res) {
		try {	
			let {limit, page} = req.query	
			limit = limit || 5 // На каждой странице
			page = page || 1
			let offset = page * limit - limit
			let docs;	
			//findAll({ limit: 10, order: [['updatedAt', 'DESC']]}) //'ASC'
			//Новые (изменённые) документы первые
			docs = await Table.Document_order.findAndCountAll({
				limit, offset, order: [['updatedAt', 'DESC']],
				include: [{
					//required: true,
					//where: {id: 1},
					attributes: ['id','name', 'inn', 'number_phone',],
					association: "Kontragent"
					}]
			})
       		return res.json(docs)
		} catch (e) {
			return res.json(e)
		}
	}
	
//GET http://localhost:8080/api/doc/1
	async getOneDoc(req, res) {
		
		try {
			const {id} = req.params
			//console.log("id= ", id)
			const docs = await Table.Document_order.findOne( 
			{
             where: {id},
			include: [{
				//required: true,
				//where: {id: 1},
				attributes: ['id','name', 'inn', 'number_phone',],
				association: "Kontragent"
				}]
			},
			
			)
       		return res.json(docs)
		} catch (e) {
			return res.json(e)
		}
	}



/*
Table.Document_order.findAll({
  attributes: {
    include: [
      [
        sequelize.literal(`(
          SELECT *
          FROM kontragents AS kontragents
          WHERE
            kontragents.id = 1
        )`),
        'name',
      ],
    ],
  },
  order: [
    [sequelize.literal('laughReactionsCount'), 'DESC']
  ],
})
*/


//Сделеать все поля или удалять все данные и записывать новые 	
//PUT //http://localhost:8080/api/doc/2	
//await User.upsert({ id: 3, lastName: "Doe", });
	async updateDoc(req, res) {
		try {	
		const {id} = req.params
		const {name, date_doc,statusDocumentId,  kontragentId,userId} = req.body
		//console.log("req.body", req.body)
		//console.log("id", id)
		const docs = await Table.Document_order.update(			
			//{kontragentId: 7,},
				{name,  date_doc,statusDocumentId,  kontragentId,userId},//date_doc,statusDocumentId,  kontragentId,userId
				{where: { id: id },},

		)
		return res.json(docs)
	} catch (e) {
		return res.json(e)
	}
	}
	
	
	
	
	
	async deleteDoc(req, res) {
		try {
			const {id} = req.params
			//console.log("id= ", id)
			const docs = await Table.Document_order.destroy(
			{
                where: {id},
            },
			)
       		return res.json(docs)
		} catch (e) {
			return res.json(e)
		}
	}
	}



export default new UserController()
