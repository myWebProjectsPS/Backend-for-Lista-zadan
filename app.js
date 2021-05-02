var express = require('express');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config=require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
    console.log('db connect');
})

var app = express();
app.use(cookieParser())
app.listen(8080, () => {
    console.log("server run on 8080")
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

var indexRouter = require('./routes/index');

app.use('/', indexRouter);

// app.get("/",(req,res)=>{
//     //res.send("ok")
//     console.log("slash")
//     res.json({
//                 hello: 'world'
//             })
// })






module.exports = app;