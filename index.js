// index.js
const express = require('express')
const axios = require('axios')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const upload = multer();
const swagger = require('swagger-ui-express')
const api = require('./swagger.json')
const helpers = require('./helpers')
const { Car } = require('./models')
const car = require('./models/car')
const {QueryTypes} = require('sequelize') 
PUBLIC_DIRECTORY = path.join(__dirname, 'public')
const app = express()

const Carcontroller = require("./controller/api/v1/CarController")
const UserController = require("./controller/api/v1/user")

app.use(express.static(PUBLIC_DIRECTORY));
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use("/api-docs", swagger.serve, swagger.setup(api))

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        console.log(file);
        cb(null, file.originalname)
    }
})

app.get("/api/cars", Carcontroller.list)
app.post("/api/cars", UserController.authorizeAdmin, Carcontroller.create)
app.put("/api/cars/update/:id", UserController.authorizeAdmin, Carcontroller.update)
app.delete("/api/cars/delete/:id", UserController.authorizeAdmin, Carcontroller.destroy);
app.get("/api/cars/:id", Carcontroller.show)
app.get("/api/cars/bringback/:id", UserController.authorizeAdmin, Carcontroller.restore)
app.post("/api/user/login", UserController.login)
app.post("/api/user/register", UserController.register)
app.post("/api/user/registerAdmin", UserController.authorizeSuperAdmin, UserController.registerAdmin)
app.delete("/api/user/delete/:id", UserController.authorize, UserController.deleteUser)
app.delete("/api/admin/delete/:id", UserController.authorizeSuperAdmin, UserController.deleteAdmin)
app.get("/api/user/data", UserController.authorize, UserController.authorizeUsers)

app.listen(3000, ()=>{
    console.log(`http://localhost:3000`);
    console.log(`http://localhost:3000/api-docs`);
})
