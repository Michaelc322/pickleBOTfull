const bot = require('../../lib/bot');

const reserveCourt = async (req, res) => {
    const { userSubmitted, passwordSubmitted, WhichCourt, TimeSlot, CourtNum } = req.body;

        //await bot.setParams(userSubmitted, passwordSubmitted, WhichCourt, TimeSlot, CourtNum);
    
        await bot.initBrowser(userSubmitted, passwordSubmitted, WhichCourt, TimeSlot, CourtNum);
    
        return res.status(200).json({message: 'Court Reserved Successfully'});


}

module.exports = { reserveCourt } 