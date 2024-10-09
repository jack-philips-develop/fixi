const jwt = require('jsonwebtoken');
const sk = require('../../config/jwt')

function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, sk.jwtToken, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token' });
        }

        req.userId = decoded.userId;
        next();
    });
}

module.exports = verifyToken;