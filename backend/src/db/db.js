const mongoose = require('mongoose');
const ConnectToDB = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('Connected to db');
        })
        .catch((error) => {
            console.log('Error connecting database', error);
        });
}

module.exports = ConnectToDB;