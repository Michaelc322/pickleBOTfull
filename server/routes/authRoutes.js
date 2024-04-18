const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, verifyUser, resetPassword, forgotPassword, authenticateToken, logoutUser } = require('../controllers/authController');

// middleware

router.use(
    cors({
        credentials: true,
        origin: 'https://pickle-bo-tfull.vercel.app'
    })
);

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/auth/user/', authenticateToken, verifyUser);

router.post('/reset-password/:token', resetPassword);
router.post('/forgot-password', forgotPassword);
router.get('/auth/logout', logoutUser);

module.exports = router;