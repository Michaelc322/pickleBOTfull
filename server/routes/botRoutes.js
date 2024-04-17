const express = require('express');
const router = express.Router();
const cors = require('cors');
const { reserveCourt } = require('../controllers/botController');

router.use(
    cors({
        credentials: false,
        origin: 'https://pickleapi.vercel.app'
    })
);

router.post('/picklebot/activate', reserveCourt)


module.exports = router;