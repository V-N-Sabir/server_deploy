import Table from '../models/models.js'


class StatusController {
// 13:36
//POST http://localhost:8080/api/status
    async createStatus(req, res) {
 
		try {		
			const {name} = req.body
			const statusD = await Table.Status_Document.create({name})
			return res.json(statusD)
		} catch (e) {
			return res.json(e)
		}		
	}

    
// get http://localhost:8080/api/status
    async getAllStatus(req, res) {
        try {			
			const statusD = await Table.Status_Document.findAll(
			{attributes: ['id','name']})
       		return res.json(statusD)
		} catch (e) {
			return res.json(e)
		}

    }

// GET http://localhost:8080/api/status/1	    
    async getOneStatus(req, res) {
        try {
			const {id} = req.params
			const statusD = await Table.Status_Document.findOne(
				{ where: {id}, },
			)
			if(statusD){
       			return res.json(statusD)
			} else {
				return res.json({message: "Статус не найден с таким id."})
			}
		} catch (e) {
			return res.json(e)
		}     

    }

//http://localhost:8080/api/status/${id}`
//http://localhost:8080/api/status/2 PUT
    async updateStatus(req, res) {
        try {
            const {id} = req.params
			//console.log("id= ", id)
            const {name} = req.body
            const statusD = await Table.Status_Document.update(
                { name },
                {where: { id: id },},
            )
            return res.json(statusD)
        } catch (e) {
                return res.json(e)
        }  

    }

//http://localhost:8080/api/status/2	DELETE    
    async deleteStatus(req, res) {
        try {
			const {id} = req.params
			const statusD = await Table.Status_Document.destroy(
			{
                where: {id},
            },
			)
       		return res.json(statusD)
		} catch (e) {
			return res.json(e)
		}
	

    }




}

export default new StatusController()