const { user } = require("pg/lib/defaults");
const userRepo = require("../../../repositories/userRepo");
const UserServ = require("../../../services/userServ");

module.exports = {
    async register(req, res){
        const result = await UserServ.create(req);
        res.status(200).json({
            status: "OK",
            data: result,
            message: "User successfully created"
        })
    },

    async registerAdmin(req, res){
        try {
            const result = await UserServ.createAdmin(req);
            res.json({
            data: result,
            message: "Admin successfully created"
            })
        } catch (error) {
            res.json({
                message: "UNAUTHORIZED ACCESS TO CREATE AN ADMIN"
            })
        }
    },

    async registerSA(req, res){
        const result = await UserServ.createSA(req);
        res.status(200).json({
            status: "OK",
            data: result,
            message: "SuperAdmin successfully created"
        })
    },

    async login(req, res, next){
        try{
            const result = await UserServ.check(req, res);
            res.status(201).json({
                status: "OK",
                login: result,
                message: "Redirect to homepage"
            })
        }catch(err){
            console.log(err.message);
            res.status(404).json({
                message: "No User Found"
            });
        }
    },

    async authorize(req, res, next){
        try{
            const hasil = await UserServ.authorizeUser(req);
            if(!hasil.data){
                res.json({
                    message : "UNAUTHORIZED"
                });
            }
            req.nameAuthorize = hasil.data.name;
            req.roleAuthorize = hasil.data.userRoleId;
            req.roleId = hasil.data.id;
            req.hasil = hasil;
            next();
        }catch{
            console.log("ERROR GETTING CAR LIST");
            res.status(403).json({
                message: "ERROR AUTHORIZING"
            });
        }
    },

    async authorizeUsers(req, res){
        try{
            const hasil = await req.hasil;
            res.status(200).json({
                AccessedBy: hasil.data.name,
                Role: hasil.user[0].userRoles.name
            })
        }catch{
            res.status(404).json({
                message: "error on geting user details",
            })
        }
    },

    async authorizeAdmin(req, res, next){
        try{
            const hasil = await UserServ.authorizeAdmin(req);
            if(!hasil.data){
                res.json({
                    message : "UNAUTHORIZED"
                });
            }
            req.nameAuthorizeAdmin = hasil.data.name;
            req.roleAuthorizeAdmin = hasil.data.userRoleId;
            req.roleId = hasil.data.id;
            req.hasil = hasil;
            next();
        }catch{
            res.status(500).json({
                message: "Internal Server Error"
            })
        }
    },

    async authorizeSuperAdmin(req, res, next){
        try{
            const hasil = await UserServ.authorizeSA(req);
            if(!hasil.data){
                res.json({
                    message : "UNAUTHORIZED ACCESS TO CREATE AN ADMIN"
                });
            }
            req.nameAuthorizeSA = hasil.data.name;
            req.roleAuthorizeSA = hasil.data.useruserRoleId;
            req.roleId = hasil.data.id;
            next();
        }catch{
            res.status(403).json({
                message: "ERROR AUTHORIZING"
            });
        }
    },

    async deleteUser(req, res){
        try {
            const result = await UserServ.deleteUser(req.params.id)
            res.json({
                message: "User Berhasil di delete oleh admin"
            })
        } catch (error) {
            console.log(error);
            res.status(403).json({
                message: "ERROR AUTHORIZING"
            });
        }
    },

    async deleteAdmin(req, res){
        try {
            const result = await UserServ.deleteAdmin(req.params.id)
            res.json({
                message: "User Berhasil di delete oleh admin"
            })
        } catch (error) {
            console.log(error);
            res.status(403).json({
                message: "ERROR AUTHORIZING"
            });
        }
    },
}