const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {User} = require('./../models/user');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { AUTH_TOKEN, bonusAmount } = require('../constants');

async function signIn(req,res) {

    const authCredentials = req.header['Authorization'];
    const decodedString = atob(authCredentials);
    const email = decodedString.split(":")[0];
    const password = decodedString.split(":")[1];
    const {error} = validateAuthBody(req.body);
    if(error) {
        return res.status(400).send(`Bad Request ${error}`);
    }

    let user = await User.findOne({email});

    if(!user) {
        return res.status(401).send('Unauthorized User');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        return res.status(401).send('Unauthorized User');
    }

    const token = jwt.sign({_id: user._id, name: `${user.firstName} ${user.lastName}`, isAdmin: user.isAdmin, walletMoney: user.walletMoney }, '1@3456Qw-');
    res.header(AUTH_TOKEN, token).send({
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        isAuthenticated: true
    });
}

async function signUp(req,res) {

    const {error} = validateUser(req.body);
    const {error: passwordError} = validatePassword(req.body);
    if(error) {
        return res.status(400).send(`Bad Request ${error}`);
    }
    if(passwordError) {
        return res.status(400).send(`${passwordError}`);
    }

    let user = await User.findOne({email: req.body.email});

    if(user) {
        return res.status(400).send('Email already exists');
    }

    let userPhone = await User.findOne({mobileNo: req.body.mobileNo});

    if(userPhone) {
        return res.status(400).send('Number already exists');
    }

    try {
        const user = new User({...req.body, password: await generateHash(req.body.password), walletMoney: bonusAmount});
        const response = await user.save();
        res.send(_.pick(response, ['firstName', 'lastName', 'email', '_id']));
    } catch(ex) {
        res.status(400).send(ex.message);
    }
}

module.exports = {
    signUp,
    signIn
};
