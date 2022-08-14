// const Cat = mongoose.model('Cat', { name: String });
const { model, Schema } = require('mongoose');

//manufacturer mersedes
//title gls
//year 2022
//color grey
//price 120 000

const carSchema = Schema({
    manufacturer: String,
    title: String,
    year: Number,
    color: String,
    price: Number,
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    }
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('car', carSchema);