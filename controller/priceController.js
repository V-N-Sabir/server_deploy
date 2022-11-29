import Table from '../models/models.js'
import sequelize from "sequelize"
import {Op} from 'sequelize'

class PriceController {
    // 13:36
    //http://localhost:8080/api/price POST
        async createPrice(req, res) {
     
            try {
                const {productId, price, amount, } = req.body
                const doc = await Table.Prise_product.create(
                    {productId, price, amount}
                    )
                return res.json(doc)
            } catch (e) {
                return res.json(e)
            }		
        }
        
    //GET http://localhost:8080/api/price?limit=3&page=1	
        async getAllPrice(req, res) {
            try {	
                let {limit, page} = req.query	
                limit = limit || 5 // На каждой странице
                page = page || 1
                let offset = page * limit - limit
                let docs;	
                docs = await Table.Prise_product.findAndCountAll({
                    limit, offset, order: [['updatedAt', 'DESC']],
                    attributes: ['amount','price','productId',],
                    include: [{
                        //required: true,
                        //where: {id: 1},
                        attributes: ['name', 'artikul'],
                        association: "ProductPrise"
                        }]
                })
                   return res.json(docs)
            } catch (e) {
                return res.json(e)
            }
        }
        
    //GET http://localhost:8080/api/price/1
        async getOnePrice(req, res) {
            
            try {
                const {id} = req.params
                //console.log("id= ", id)
                const docs = await Table.Prise_product.findOne( 
                {
                 where: {id},
                include: [{
                    //required: true,
                    //where: {id: 1},
                    attributes: ['id','name'],
                    association: "ProductPrise"
                    }]
                },
                
                )
                   return res.json(docs)
            } catch (e) {
                return res.json(e)
            }
        }
    
    
   
    
    //PUT //http://localhost:8080/api/price/2	
    //await User.upsert({ id: 3, lastName: "Doe", });
        async updatePrice(req, res) {
            try {	
            const {id} = req.params
            const {price, amount, } = req.body
            //console.log("req.body", req.body)
            //console.log("id", id)
            const docs = await Table.Prise_product.update(			

                    {price, amount, },
                    {where: { id: id },},
    
            )
            return res.json(docs)
        } catch (e) {
            return res.json(e)
        }
        }
        
		 // POST http://localhost:8080/api/price/search/?name=W
		 //http://localhost:8080/api/product/search?name=${name}
		 async searchProduct(req, res) {
			try {
				let {name} = req.query	
				console.log("name",name) //{rows, count}
				console.log("req.query",req.query)
				const kontragent = await Table.Prise_product.findAll({
					attributes: ['id','price', 'amount', 'productId',],
					 //where: { name: {[Op.substring]: name} },
					  include: [{
							//required: true,
							where:  { name: {[Op.substring]: name}},
							attributes: ['id','name'],
							association: "ProductPrise"
							}]
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
        
        
        
        async deletePrice(req, res) {
            try {
                const {id} = req.params
                //console.log("id= ", id)
                const docs = await Table.Prise_product.destroy(
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
    
    
    
    export default new PriceController()
    