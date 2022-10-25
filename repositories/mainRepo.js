const {Car} = require("../models")

module.exports = {
    create(createArgs){
        return Car.create(createArgs)
    },

    update(id, updateArgs){
        return Car.update(updateArgs, {
            where: {
                id
            },
        })
    },

    delete(id){
        return Car.destroy({
            where: {id}
        });
    },

    find(id){
        return Car.findByPk(id);
    },

    findAll(){
        return Car.findAll();
    },

    getTotalCars(){
        return Car.count();
    },

    bringback(id){
        return Car.restore(id);
    }
}