const express = require('express');
var bodyParser = require('body-parser');
const route = require('./routes/route.js');
const cors = require('cors');
const mongoose = require('mongoose')
const app = express();
require('dotenv').config();


app.use(bodyParser.json());
app.use(cors({
  origin:'https://shortlinxfront.vercel.app'// Replace with your actual frontend port
}));
app.use(bodyParser.urlencoded({ extended: true }));

console.log('mongodb+srv://'+process.env.MONGOUSER+':'+process.env.MONGOPASSWORD+'@cluster0.raflcmc.mongodb.net/?appName=Cluster0')

mongoose.connect('mongodb+srv://'+process.env.MONGOUSER+':'+process.env.MONGOPASSWORD+'@cluster0.raflcmc.mongodb.net/?appName=Cluster0', { useNewUrlParser: true })
    .then(() => console.log('mongodb running on cluster ✔'))
    .catch(err => console.log(err))


app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port 🎧' + (process.env.PORT || 3000))
});
