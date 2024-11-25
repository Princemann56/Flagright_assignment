const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
    const { userID, password, role } = req.body;
    try {
        const userExists = await User.findOne({ userID });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ userID, password, role: role || 'user' });


        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.login = async (req, res) => {
    const { userID, password } = req.body;

    try {
        const user = await User.findOne({ userID });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            { user: { userID: user.userID, role: user.role } },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
