const express = require("express");

const app = express();

const {userSignup , userSignIn}  = require('../controllers/userController');


const router = express.Router();

console.log("user Signup");

router.post('/signup', userSignup);
router.post('/signin' , userSignIn);


module.exports = router; 