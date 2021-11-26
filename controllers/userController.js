
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // check if errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json({ errors: errors.array() })
    }

    // Extract email & psw
    const { email, password } = req.body;
    
    try {

        // Verify that the registered user is unique.
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'The user already exists' });
        }
        
        // Creates the new user
        user = new User(req.body);

        // Hash the password
        const salt = await bcryptjs.genSalt(10);

        user.password = await bcryptjs.hash(password, salt);

        // Save user
        await user.save();

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

        

    }catch (error) {
        console.log(error);
        res.status(400).send('There is an error');
    }
}