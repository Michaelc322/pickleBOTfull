const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, loginUser, verifyUser, resetPassword, forgotPassword, authenticateToken } = require('../controllers/authController');


// middleware

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
);

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/auth/user/', authenticateToken, verifyUser);

router.post('/reset-password/:token', authenticateToken, resetPassword);
router.post('/forgot-password', forgotPassword);


module.exports = router;