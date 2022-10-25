const UserRepo = require("../repositories/userRepo");
const auth = require("../controller/api/v1/auth");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const req = require("express/lib/request");
const userrole = require("../models/userrole");

module.exports = {
    async create(requestBody){
        const fname = requestBody.body.name;
        const email = requestBody.body.email;
        const pass = requestBody.body.password;

        const encryptedPassword = await auth.encryptPassword(pass)
        console.log(fname);
        return UserRepo.create({name: fname, email, encryptedPassword, userRoleId: 3});
    },

    async createAdmin(requestBody){
        const fname = requestBody.body.name;
        const lname = requestBody.body.lastname;
        const email = requestBody.body.email;
        const pass = requestBody.body.password;

        const encryptedPassword = await auth.encryptPassword(pass)
        console.log(fname);
        return UserRepo.create({name: fname, email, encryptedPassword, userRoleId: 2});
    },

    async createSA(requestBody){
        const fname = requestBody.body.name;
        const lname = requestBody.body.lastname;
        const email = requestBody.body.email;
        const pass = requestBody.body.password;

        const encryptedPassword = await auth.encryptPassword(pass)
        console.log(fname);
        return UserRepo.create({name: fname, email, encryptedPassword, userRoleId: 1});
    },

    async check(requestBody, response){
        try {
            const email = requestBody.body.email.toLowerCase();
        const pass = requestBody.body.password;

        const user = await UserRepo.findOne({where:{email}, include: ['userRoles']});

        if(!user){
            res.status(404).json({message: "Can't find that account"})
            return;
        }

        const isPasswordCorrect = await auth.comparePassword(user[0].encryptedPassword, pass);

        if(!isPasswordCorrect){
            res.status(401).json({message: "Can't find that account"});
            return;
        }

        const token = auth.createToken({
            id: user[0].id,
            email: user[0].email,
            name: user[0].name,
            role: user[0].userRoleId
        });

        const newToken = response.json({
            nama: user[0].name,
            ID: user[0].id,
            Identification: user[0].userRoles.name,
            token
        })

        return newToken;
        } catch (error) {
            console.log(error);
        }
    },

    async whoAmI(req, res){
        res.status(200).json(requestUser)
    },

    async authorize(req, res, next){
        try{
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token, process.env.JWT_SIGNATURE_KEY || "Rahasia"
            );

            requestUser = await UserRepo.findID(tokenPayload.id);
            user = await UserRepo.findOne({where:{id}, include: ['userRoles']})
            console.log(requestUser.dataValues.userRoleId);
            if(requestUser.userRoleId){
                return{
                    data: requestUser,
                    user: user
                }
            }
        }catch(err){
            return {
                data: null,
            };
        }
    },

    async authorizeAdmin(req, res, next){
        try{
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token, process.env.JWT_SIGNATURE_KEY || "Rahasia"
            );
            const id = tokenPayload.id;
            requestUser = await UserRepo.findID(tokenPayload.id, {include : 'userRoles'});
            user = await UserRepo.findOne({where:{id}, include: ['userRoles']})
            if(requestUser.userRoleId == 1 || requestUser.userRoleId == 2){
                return{
                    data: requestUser,
                    user: user,
                }
            }
        }catch(err){
            return {
                data: null,
            };
        }
    },

    async authorizeUser(req, res, next){
        try{
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token, process.env.JWT_SIGNATURE_KEY || "Rahasia"
            );
            const id = tokenPayload.id;
            requestUser = await UserRepo.findID(tokenPayload.id, {include : 'userRoles'});
            user = await UserRepo.findOne({where:{id}, include: ['userRoles']})
            if(requestUser.userRoleId){
                return{
                    data: requestUser,
                    user: user,
                }
            }
        }catch(err){
            return {
                data: null,
            };
        }
    },

    async authorizeSA(req, res, next){
        try{
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
                token, process.env.JWT_SIGNATURE_KEY || "Rahasia"
            );

            requestUser = await UserRepo.findID(tokenPayload.id);
            console.log("REQ USER", requestUser.userRoleId);
            if(requestUser.userRoleId == 1){
                return{
                    data: requestUser
                }
            }
        }catch(err){
            return {
                data: null,
            };
        }
    },

    async deleteUser(id){
        return UserRepo.deleteUser(id);
    },

    async deleteAdmin(id){
        return UserRepo.deleteAdmin(id);
    },


}