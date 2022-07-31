const modelCars = require('../../models/Cars');

class Cars {
    async save(data) {
        try {
            const car = await modelCars.create({ ...data });
            return car;
        } catch (error) {
            console.log(error.message.red);
        }
    }
    async getAll() {
        try {
            const cars = await modelCars.find({});
            return cars;
        } catch (error) {
            console.log(error.message);
        }
    }
}
module.exports = new Cars();