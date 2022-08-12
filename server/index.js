const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes.js');

app.use(cors());
app.use(express.json());
app.use(routes);
mongoose.connect("mongodb://localhost:27017/recipe-blog")
                .then(console.log('DB connected'))
                .catch(err => console.log(err))

app.listen(4000, () => console.log(`App is running on port 'http://localhost:4000'`))
