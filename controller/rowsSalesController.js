import Table from '../models/models.js'

class RowsController {
// 13:36
//http://localhost:8080/api/rows POST
	async createRows(req, res) {
 
		try {
			const {productId, amount, price, sum, documentOrderId} = req.body
			const rows = await Table.Sales_table.create({
				productId, amount, price, sum, documentOrderId,			
				})
				
					//++
				const priceP = await Table.Prise_product.findOne({
						where: {productId},
		
				})
					
				//console.log("productId", productId)
				
				//console.log("amount", amount)
				//console.log("priceP", priceP)	
				
				const remainder = priceP.amount - amount
				//console.log("remainder", remainder)

				
				const updPrice = await Table.Prise_product.update(
					{ amount: remainder },
					{where: {productId},}
					)	
				console.log("updPrice", updPrice)	
			// ??? получить price  	по productId и из amount вычесть. Записать
			return res.json(rows)
		} catch (e) {
			return res.json(e)
		}		
	}

// В разработке, пока нет надобности	
// GET 	http://localhost:8080/api/rows
	async getAllRowses(req, res) {
        try {			
			//const params = req.params
			const { documentOrderId } = req.query
			//console.log("documentOrderId", documentOrderId)
			const rows = await Table.Sales_table.findAll({ where: {documentOrderId,},//documentOrderId
				include: [{
				required: true,
				//	all: true,
				//where: {id: 1},
				attributes: ['id','name', 'artikul',],
				association: 'Products'
				}]
			
			})
       		
			return res.json(rows)
		} catch (e) {
			return res.json(e)
		}
	}
	
// GET http://localhost:8080/api/rows/17	
	async getRows(req, res) {		
		try {
			const {id} = req.params
			
			const rows = await Table.Sales_table.findAll(
			{ where: {documentOrderId: id,},
				include: [{
				required: true,
				//	all: true,
				attributes: ['id','name', 'artikul',],
				association: 'Products'
				}]
				
			})		
	


				//НЕ работает ???  attributes: ['id', 'amount', 'price', 'sum', 'documentOrderId',]
			if(docs){
       			return res.json(rows)
			} else {
				return res.json({message: "Товар не найден с таким id."})
			}
		} catch (e) {
			return res.json(e)
		}
	}
//	 В разработке, пока нет надобности	
//http://localhost:8080/api/rows/2 PUT
async updateRows(req, res) {
	try {
		const {id} = req.params
		const docs = await Table.Sales_table.update(
			{documentOrderId: 1,},
			{where: { documentOrderId: id },},
		)
		return res.json(docs)
	} catch (e) {
			return res.json(e)
	}
}
	
	
	
	
//http://localhost:8080/api/rows/2	DELETE
	async deleteRow(req, res) {
		try {
			const {id} = req.params
			const docs = await Table.Sales_table.destroy(
			{
                where: {documentOrderId: id},
            },
			)
       		return res.json(docs)
		} catch (e) {
			return res.json(e)
		}
	}
	}



export default new RowsController()
