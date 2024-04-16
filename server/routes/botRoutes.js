const express = require('express');
const router = express.Router();
const cors = require('cors');
const { reserveCourt } = require('../controllers/botController');

router.use(
    cors({
        credentials: false,
        origin: 'http://localhost:5173'
    })
);

router.post('/picklebot/activate', reserveCourt)


module.exports = router;