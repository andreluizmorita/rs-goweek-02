const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

try {
    mongoose.connect('mongodb://goweek:goweek123@ds155293.mlab.com:55293/goweek-dia-02', {
        useNewUrlParser: true
    }).then(() => {
        console.log("Connected to Database");
    }).catch((err) => {
        console.log("Not Connected to Database ERROR! ", err);
    });
} catch (error) {
    console.log(error);
}

app.use((req, res, next) => {
    req.io = io;

    return next();
});

app.use(cors());
app.use(express.json());
app.use(require('./routes'));

server.listen(3001, () => {
    console.log(':) Server started on http://localhost:3001');
});