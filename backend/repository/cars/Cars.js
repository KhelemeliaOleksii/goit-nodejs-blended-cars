const modelCars = require('../../models/Cars');

class Cars {
    async save(data, id) {
        try {
            const car = await modelCars.create({ ...data, user: id });
            return car;
        } catch (error) {
            console.log(error.message.red);
        }
    }
    async getAll(id) {
        try {
            const cars = await modelCars.find({ user: id });
            return cars;
        } catch (error) {
            console.log(error.message);
        }
    }
}
module.exports = new Cars();