import Table from '../models/models.js'
import {Op} from 'sequelize'
//const { Op } = require('sequelize')
class KontragentController {
// 13:36
//POST http://localhost:8080/api/kontragent
    async createKontragent(req, res) {
 
		try {
			
			const {name, inn, number} = req.body
			const kontr = await Table.Kontragent.create({name, inn, number_phone: number})
			return res.json(kontr)
		} catch (e) {
			return res.json(e)
		}		
	}

    
// get http://localhost:8080/api/kontragent 
    async getAllKontragents(req, res) {
        try {		
			let {limit, page} = req.query	
			limit = limit || 5 // На каждой странице
			page = page || 1
			let offset = page * limit - limit
			let kontr;	
			kontr = await Table.Kontragent.findAndCountAll(
			{limit, offset, attributes: ['id','name', 'inn', 'number_phone',], order: [['updatedAt', 'DESC']]})
       		return res.json(kontr)
		} catch (e) {
			return res.json(e)
		}

    }

// GET http://localhost:8080/api/kontragent/1	    
    async getOneKontragent(req, res) {
        try {
			const {id} = req.params
			const kontr = await Table.Kontragent.findOne(
				{ where: {id}, },
			)
			if(kontr){
       			return res.json(kontr)
			} else {
				return res.json({message: "Контрагент не найден с таким id."})
			}
		} catch (e) {
			return res.json(e)
		}     

    }

//http://localhost:8080/api/kontragent/${id}`
//http://localhost:8080/api/kontragent/2 PUT
    async updateKontragent(req, res) {
        try {
            const {id} = req.params
			//console.log("id= ", id)
            const {name, inn, number} = req.body
            const kontr = await Table.Kontragent.update(
                {name, inn, number_phone: number,},
                {where: { id: id },},
            )
            return res.json(kontr)
        } catch (e) {
                return res.json(e)
        }  

    }

//http://localhost:8080/api/kontragent/2	DELETE    
    async deleteKontragent(req, res) {
        try {
			const {id} = req.params
			const kontr = await Table.Kontragent.destroy(
			{
                where: {id},
            },
			)
       		return res.json(kontr)
		} catch (e) {
			return res.json(e)
		}
	

    }

//POST //http://localhost:8080/api/kontragent/search?name=name
//const product = await Table.Product.findAndCountAll({
//    attributes: ['name', 'artikul']});
async searchKontragent(req, res) {
    try {
        let {name} = req.query	
		//console.log("name",name) //{rows, count}
        const kontragent = await Table.Kontragent.findAll({
             where: { name: {[Op.substring]: name} },
           // offset: 10,
           // limit: 10
          });
         // console.log("count =", count);
          //console.log("rows = ", rows);
          return res.json(kontragent)
    } catch (e) {
        return res.json(e)
    }
}

/*
where: {
    authorId: {
      [Op.eq]: 2,
    },
  },
*/

}

export default new KontragentController()