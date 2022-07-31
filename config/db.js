
const { connect } = require('mongoose');

const connectDB = async () => {
    try {
        const db = await connect(process.env.MONGODB_URI);
        console.log(`MongoDB is connected on HOST ${db.connection.host} on port ${db.connection.port} DB_name ${db.connection.name}`.cyan.italic.underline);
    } catch (error) {
        console.log(error.message.red);
    }
}

module.exports = connectDB;
