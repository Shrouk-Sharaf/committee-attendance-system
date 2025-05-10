const express = require('express');
const router = express.Router();
const Member = require('../models/member');

const isauthenticated = (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    jwt.verify(token, 'mysecret', (err, decoded) => {
        if (err) {
        return res.status(403).json({ message: 'Forbidden' });
        }
        req.user = decoded;
        next();
    });
}