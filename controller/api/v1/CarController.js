const CarService = require("../../../services/mainServ")
const multer = require('multer')

module.exports = {
    list(req, res){
        CarService
        .list()
        .then(({data, count}) => {
            res.json({
                status: "OK",
                data: {car : data},
                meta: {total : count},
            })
        })
        .catch((err)=>{
            return err;
        })
    },

    create(req, res){
        const storage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, 'public/images')
            },
            filename: function(req, file, cb){
                console.log(file);
                cb(null, file.originalname)
            }
        })
        let upload = multer({storage:storage}).single('image');
        upload(req, res, function(err){
            CarService
        .create({
            nama: req.body.nama,
            sewa: req.body.sewa,
            ukuran: req.body.ukuran,
            image: req.file ? req.file.originalname : '',
            createdBy: req.roleId
        })
        .then((car) => {
            res.status(201).json({
                status: "OK",
                data: car
            })
        })
        .catch((err)=>{
            res.status(422).json({
                status: "FAIL",
                message: err.message
            })
        })
        })
    },

    async Update(req, res, next){
        const who = await req.roleId;
        CarService
        .update(req.params.id, req.body, {
            deletedBy: who,
            deletedAt: new Date()
        })
        .then(()=>{
            next();
        })
        .catch((err)=>{
            res.status(422).json({
                status: "FAIL",
                message: err.message
            })
        })
    },

    update(req, res){
        const storage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, 'public/images')
            },
            filename: function(req, file, cb){
                console.log(file);
                cb(null, file.originalname)
            }
        })
        let upload = multer({storage:storage}).single('image');
        upload(req, res, function(err){
            CarService
        .update(req.params.id, {
            nama: req.body.nama,
            sewa: req.body.sewa,
            ukuran: req.body.ukuran,
            imgae: req.file.originalname,
            updatedBy: req.roleId,
        })
        .then(()=>{
            res.status(200).json({
                status: "OK"
            })
        })
        .catch((err)=>{
            res.status(422).json({
                status: "FAIL",
                message: err.message
            })
        })
        })
    },

    show(req, res){
        CarService
        .get(req.params.id)
        .then((car)=>{
            res.status(200).json({
                status: "OK",
                data: car
            })
        })
        .catch((err)=>{
            res.status(422).json({
                status: "FAIL",
                message: err.message
            })
        })
    },

    destroy(req, res){
        const storage = multer.diskStorage({
            destination: function(req, file, cb){
                cb(null, 'public/images')
            },
            filename: function(req, file, cb){
                console.log(file);
                cb(null, file.originalname)
            }
        })
        let upload = multer({storage:storage}).single('image');
        upload(req, res, function(err){
            CarService.update(req.params.id, {
                deletedBy: req.roleId
            }).then(()=>{
                CarService
                .delete(req.params.id)
                .then(()=>{
                    res.status(204).end()
                })
                .catch((err)=>{
                    res.status(422).json({
                        status: "FAIL",
                        message: err.message
                    })
                })
            })
        })
    },

    setPost(req, res, next){
        CarService.get(req.params.id)
        .then((car)=>{
            if(!car){
                res.status(404).json({
                    status: "FAIL",
                    message: "Post not found"
                })

                return;
            }

            req.car = car;
            next()
        })
        .catch((err)=>{
            res.status(404).json({
                status: "FAIL",
                message: "Post not found"
            })
        })
    },

    async restore(req, res){
            try {
                result = await CarService.restore(req.params.id); 
                if(!result){
                    res.status(404).json({
                        message: "An error has occured"
                    })
                }
                res.status(200).json({
                    result: result
                })
            } catch (error) {
                res.status(500).json({
                    message: "something is wrong with the server",
                    error: error
                })
            }
    }
}