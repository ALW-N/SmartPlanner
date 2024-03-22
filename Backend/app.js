const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/task');

app.use(bodyParser.json());
// const mongoUrl = "mongodb+srv://alwintomy11:@Lwintoni321@cluster0.beer6ae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const mongoUrl = "mongodb+srv://admin:admin@cluster0.njeb9m7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const JWT_SECRET = "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jdsds039[]]pou89ywe";
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database Connected");
    })
    .catch((e) => {
        console.log(e);
    });

app.use('/task', taskRoutes);

app.listen(5001, () => {
    console.log("Node js Server Started");
})
