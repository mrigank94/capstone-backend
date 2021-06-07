const mongoose = require('mongoose');
const Joi = require('joi');
const passwordComplexity = require("joi-password-complexity");

const User = mongoose.model('user', new mongoose.Schema({
                    firstName: {
                        type: String,
                        required:true,
                        minLength: 5,
                        maxLength: 50,
                    },
                    lastName: {
                        type: String,
                        required:true,
                        minLength: 5,
                        maxLength: 50,
                    },
                    email: {
                        type: String,
                        required: true,
                        unique: true,
                        minLength: 5,
                        maxLengh: 255
                    },
                    password: {
                        type: String,
                        required: true,
                        minLength: 5,
                        maxLength: 1024
                    },
                    isAdmin: {
                        type: Boolean, 
                        default: false
                    },
                    mobileNo: {
                        type: Number,
                        min: 1000000000,
                        unique: true
                    },
                    walletMoney: {type: Number, default: 0}
                }));


module.exports = {User};