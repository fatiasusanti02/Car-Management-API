const CarRepo = require('../repositories/mainRepo')
const res = require('express/lib/response');

module.exports = {
    async create(requestBody){
        return CarRepo.create(requestBody);
    },

    update(id, requestBody){
        return CarRepo.update(id, requestBody)
    },

    delete(id){
        return CarRepo.delete(id)
    },

    async list(){
        try {
            const Cars = await CarRepo.findAll();
            const CarCounts = await CarRepo.getTotalCars();

            return {
                data : Cars,
                count : CarCounts,
            }
        } catch (error) {
            throw error;
        }
    },

    get(id){
        return CarRepo.find(id);
    },

    async restore(id){
        try {
            result = await CarRepo.bringback(id);
            find = await CarRepo.find(id);
            return{
                result: result,
                hasil: find
            }
        } catch (error) {
            return error
        }
    }
}