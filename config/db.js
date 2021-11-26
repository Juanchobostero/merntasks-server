const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            //useUnifyTopology: true, //dice que no está soportado
            //useFindAndModify: false //fijate si este te pela, o te dice que no es soportado.
        });
        console.log('db connected');
    } catch (error) {
        console.log("There was an error, this is the catch of DB.js: ", error);
        process.exit(1);
    }
}

module.exports = connectDB;