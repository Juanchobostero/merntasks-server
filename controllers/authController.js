const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    // check if errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extract email & psw
    const { email, password } = req.body;

    try {
         // Verify that is an registered user
         let user = await User.findOne({ email });
         if(!user) {
             return res.status(400).json({ msg: 'The user not exists !' })
         }

         // Verify the password
         const passOk = await bcryptjs.compare(password, user.password);
         if(!passOk) {
             return res.status(400).json({ msg: 'Incorrect Password !' });
         }

         // If all is ok...
         // create and sign the token
        const payload = {
            user: {
                id: user.id
            }
        };

        // sign the token
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // expires in 1 hour
        }, (error, token) => {
            if(error) throw error;

            // Confirmation message
            res.json({ token });
        });
    } catch (error) {
        console.log(error);
    }
}

// Gets authenticated user
exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({ user });
    }catch (error) {
        console.log(error);
        response.status(500).json({ msg: 'There was an error !' });
    }
}