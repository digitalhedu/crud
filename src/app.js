const express = require("express")
const {resolve} = require('path')
const method = require('method-override')
const public = require("./modules/public")
const{port,start}=require("./modules/port")
const uploads = require("./modules/uploads")
const app = express();

app.listen(port, start());
app.set ('views', resolve(__dirname, 'views'));
app.set("view engine", "ejs");

app.use (public);
app.use (uploads);
app.use(express.urlencoded({extended:false})); //  req.body y el req.query
app.use(express.json())
app.use(method('m')); // En la url poner ?m=DELETE

app.use(require("./routes/main.routes"))
app.use('/products',require('./routes/products.routes'))