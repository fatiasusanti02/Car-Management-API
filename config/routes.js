const express = require('express');
const controllers = require("../controller")

const appRouter = express.Router();
appRouter.set(express.urlencoded({extended: true}));
appRouter.set(express.json());

appRouter.get("/api/cars", controllers.api.v1.CarController.list);
appRouter.post("/api/cars", controllers.api.v1.CarController.create);