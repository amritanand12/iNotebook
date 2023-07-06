const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "Harray is a good boy";

// ROUTE 1: create a user using post request ./api/auth/createUser : No login required
router.post('/createUser', 
    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 character').isLength({ min: 5 })
, async (req, res) => {
    let success = 'false';
    //if there are errors, then return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //Check whether an user exist with same email
    try {
        let existingUser = await User.findOne({ email: req.body.email });
        console.log(req.body);
        if (existingUser) {
            return res.status(200).json({ success, error: "Sorry User with same email exists" });
        }
        else {

            const salt = await bcrypt.genSalt(10);
            const securePassword = await bcrypt.hash(req.body.password, salt);//this hash function return promises hence we need to write await befor the function
            //We write await because if we donot write await in front of the function that return promises, that line of code will not be executed and the next line will start execute.
            // if we write await, the compiler will await for the line of code for its execution

            //Create a new user
            let user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: securePassword
            });

            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            // console.log(authtoken);
            success = 'true';
            res.json({ success, authtoken });//Server will send response the data of user
        }
    }
    catch (err) {
        console.error(errors.message);
        // console.log("THis is undefined")
        res.status(500).send("Internal server error");
    }
})


// ROUTE 2: check the user and login in using post request ./api/auth/loginUser : No login required
router.post('/loginUser', [
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password can not be empty').exists()
], async (req, res) => {

    let success = 'false';
    //if there are errors, then return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //Check whether an user exist with same email
    const { email, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (!user) {
            success = 'false'
            return res.status(400).json({ errors: "Please try to login with correct credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, errors: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(authtoken);
        success = 'true'
        res.json({ success, authtoken });//Server will send response the data of user
    }
    catch (err) {
        console.error(errors.message);
        res.status(500).send("Internal server error");
    }       
})

//ROUTE 3: routes for getting data from database using post request : login  required
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        console.log(user);
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;