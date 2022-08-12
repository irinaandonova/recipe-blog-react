const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./router.js')

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/zooland")
        .then(() =>console.log('DB connected'))
        .catch(console.error)
        
app.use(routes);

app.listen(4000, console.log(`Application is running on http://localhost:4000`));