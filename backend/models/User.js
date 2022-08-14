const { model, Schema } = require('mongoose');
// user
const userSchema = Schema({
    userName: String,
    userEmail: {
        type: String,
        unique: true,
    },
    userPassword: String,
    token: {
        type: String,
        default: null,
    },
    hobbies: [],

    // userRoles: [],
}, {
    timestamps: true,
    versionKey: false,
})

module.exports = model('user', userSchema);