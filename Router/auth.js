const express = require('express');
const router = express.Router();
const AuthController = require('../App/Controllers/authController');



router.post('/register', (req, res, next)=>{
    AuthController.register({req, res, next});
});


module.exports = router;

