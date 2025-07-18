const express = require('express');
const ConnectToDB = require('./db/db.js')
require('dotenv').config();

const app = express();
app.use(express.json());


// routes
const songRoutes = require('./routes/song.route.js')
app.use('/', songRoutes);



ConnectToDB();
app.listen(3000, () => {
    console.log('Server is running on port 3000');

})