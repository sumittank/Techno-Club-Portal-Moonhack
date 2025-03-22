const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header('Authorization');

        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({ message: '❌ No token, authorization denied' });
        }

        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trim();
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: '❌ Invalid token' });
        }


        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: '❌ User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: '⏳ Token expired, please login again' });
        }
        res.status(401).json({ message: '❌ Unauthorized' });
    }
};

module.exports = authMiddleware;

