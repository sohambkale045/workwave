const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecret = "mynameisroahnsabalefmaharashtra"

router.post("/createuser",
    [
        body('email').isEmail(),
        body('name').isLength({ min: 5 }),
        body('password', 'Invalid password').isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            await User.create({
                name: req.body.name,
                password: hashedPassword,
                email: req.body.email,
                location: req.body.location
            });
            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    }
);

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Invalid password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ errors: "Invalid credentials" });
        }
        const data = {
            user:{
                id:user.id
            }
        }
        const authToken = jwt.sign(data,jwtSecret)
        res.json({ success: true,authToken:authToken});
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;
