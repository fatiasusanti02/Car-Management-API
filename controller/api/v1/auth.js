const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { resolve } = require('path')

function encryptPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, encryptedPassword)=>{
            if(!!err){
                reject(err);
                return;
            }

            resolve(encryptedPassword)
        })
    })
}

function comparePassword(encryptedPassword, password){
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect)=>{
            if(!!err){
                reject(err);
                return;
            }

            resolve(isPasswordCorrect)
        })
    })
}

function createToken(payload){
    return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || 'Rahasia')
}

module.exports={encryptPassword, comparePassword, createToken}