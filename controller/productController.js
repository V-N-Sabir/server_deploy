
import Table from '../models/models.js'

import {Op} from 'sequelize'

class SalesController { 


// 13:36
//http://localhost:8080/api/product POST
//[{"name": "tiktok@mail.ru","artikul": "12345"}] - req.body
async createProduct(req, res) {

    try {
		const arrays = req.body
		//console.log("arrays.products", arrays.products)
		const result = arrays.products.map((products) => { 		  
			return Table.Product.create({ 
					name: products.name, 
					artikul: products.artikul, attributes: ['id','name', 'artikul',]})   
		  })

      Promise.all(result).then(results => {
        return res.json(results)
      })      

    } catch (e) {
        return res.json(e)
    }		
}
/*
// http://localhost:8080/api/product/one POST
async createOneProduct(req, res) {

    try {
		const {name, artikul} = req.body
		const product = await Table.Product.create({name, artikul}) 
		return res.json(product)
    } catch (e) {
        return res.json(e)
    }		
}
*/
//GET http://localhost:8080/api/product
async getAllProduct(req, res) {
    try {	   
		let {limit, page} = req.query	
		limit = limit || 5 // На каждой странице
		page = page || 1
		let offset = page * limit - limit
		let products;	
        products = await Table.Product.findAndCountAll({ limit, offset, 
			attributes: ['id','name', 'artikul'], order: [['updatedAt', 'DESC']]})
           return res.json(products)
    } catch (e) {
        return res.json(e)
    }
}

//http://localhost:8080/api/product/2
async getOneProduct(req, res) {
    
    try {
        const {id} = req.params
        const product = await Table.Product.findOne( 
        {
            where: {id},
        },
        )
           return res.json(product)
    } catch (e) {
        return res.json(e)
    }
}


//PUT //http://localhost:8080/api/product/2	
//await User.upsert({ id: 3, lastName: "Doe", });
async updateProduct(req, res) {
    try {	
    const {id} = req.params
    const {name, artikul} = req.body
    const product = await Table.Product.update(
        { name, artikul, },
        {where: { id: id },},
    )
    return res.json(product)
} catch (e) {
    return res.json(e)
}
}



//DELETE //http://localhost:8080/api/product/2	
async deleteProduct(req, res) {
    try {
        const {id} = req.params
        const product = await Table.Product.destroy(
        {
            where: {id},
        },
        )
           return res.json(product)
    } catch (e) {
        return res.json(e)
    }
}
//POST //http://localhost:8080/api/product/search
//const product = await Table.Product.findAndCountAll({
//    attributes: ['name', 'artikul']});
async searchProduct(req, res) {
    try {
        let {name} = req.query	
        const {rows, count} = await Table.Product.findAndCountAll({
             where: {name: {[Op.substring]: name }},
           // offset: 10,
            limit: 10
          });
         // console.log("count =", count);
          //console.log("rows = ", rows);
          return res.json(rows)
    } catch (e) {
        return res.json(e)
    }
}

}




export default new SalesController()