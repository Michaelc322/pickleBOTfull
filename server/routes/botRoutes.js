const express = require('express');
const router = express.Router();
const cors = require('cors');
const { reserveCourt } = require('../controllers/botController');


// cors uses origin from front end url
router.use(
    cors({
        credentials: true,
        origin: 'https://thepicklebot.vercel.app'
    })
);

router.post('/picklebot/activate', reserveCourt)


module.exports = router;