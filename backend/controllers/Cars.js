const repositoryCars = require('../repository/cars/Cars');
const asyncHandler = require('express-async-handler');

/* 
asyncHandler(async (req, res, next) => {
    const bar = await foo.findAll();
    res.send(bar)
}) 
*/

class Cars {

    add = asyncHandler(async (req, res) => {
        if (!req.body.manufacturer) {
            res.status(400);
            throw new Error('Miss manufacturer field');
        }
        const car = await repositoryCars.save(req.body, req.user._id);
        res.status(201).json({
            message: "Success",
            code: 201,
            data: {
                car
            }
        })

    })

    async getAll(req, res) {
        try {
            const cars = await repositoryCars.getAll(req.user._id);
            res.status(200).json({
                message: "Success",
                code: 200,
                data: {
                    cars,
                    quantity: cars.length
                },
            })
        } catch (error) {
            console.log(error.message.red);
        }
    }

    getOne(req, res) {
        res.send("get the car");
    }

    update(req, res) {
        res.send("update  cars");
    }

    remove(req, res) {
        res.send("remove the car");
    }
}

module.exports = new Cars();