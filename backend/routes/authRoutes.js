require('dotenv').config();
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const cookieParser = require('cookie-parser');

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;


router.use(cookieParser());
router.use(session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 } 
}));


const ADMIN_OFFICER_KEYS = {
    officer: process.env.UNIQUE_OFFICER_KEY,
    admin: process.env.UNIQUE_ADMIN_KEY
};

router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, uniqueKey } = req.body;



        if (role !== 'applicant' && ADMIN_OFFICER_KEYS[role] !== uniqueKey) {
            return res.status(403).json({ message: 'Invalid unique key!' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("❌ Email already exists:", email);
            return res.status(400).json({ message: 'User already exists' });
        }


        if (typeof password !== 'string' || password.trim() === '') {
            return res.status(400).json({ message: 'Invalid password' });
        }

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        if (!hashedPassword) {
            return res.status(500).json({ message: 'Password hashing failed' });
        }

        const user = new User({ name, email, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ message: '✅ User registered successfully!' });
    } catch (error) {
        console.error("❌ Registration Error:", error.message);
        res.status(500).json({ error: error.message });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });

        req.session.user = { id: user._id, name: user.name, role: user.role };

        res.cookie('token', token, { httpOnly: true, secure: false });
        res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/logout', (req, res) => {
    res.clearCookie('token');
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.json({ message: '✅ Logged out successfully!' });
    });
});

router.get('/protected-route', authMiddleware, (req, res) => {
    res.json({ message: '✅ Access granted!', user: req.user });
});

module.exports = router;
