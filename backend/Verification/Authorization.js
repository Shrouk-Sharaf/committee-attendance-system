const express = require('express');
const Member = require('../models/member');
const jwt = require('jsonwebtoken');

const isauthorized = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, 'mysecret', (err, user) => {
        if(err){
            res.status(403).json({ message: 'Forbidden' });
        }
        // console.log(user)
        req.user = user;
    });
        next();

}


const isadmin = async (req, res, next) => {
    console.log(req.user);
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();                       
};

module.exports = {
    isauthorized,
    isadmin
}