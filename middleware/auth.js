const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Read the token from header
    const token = req.header('x-auth-token');

    // Check if there is no token
    if(!token) {
        return res.status(401).json({ msg: 'There is not a token, no valid permission !' });

    }

    // Validate token

    try {
        const encryption = jwt.verify(token, process.env.SECRET);
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: 'No valid token !' });
    }
}