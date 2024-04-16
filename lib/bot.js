const puppeteer = require('puppeteer');
//const cron = require('node-cron');
const { url } = require('inspector');
const fs = require('fs').promises;
//const {TimeoutError} = require('puppeteer/Errors');

/*
const user = "mcarrolldev@gmail.com";
const password = "BotUserDev505#"

// If Tom Brown CourtNum = 1-4
// If Four Oaks CourtNum = 1-6
const TimeSlot = 8;
const CourtNum = 4;

// Tom Brown or Four Oaks
const WhichCourt="Four Oaks"
*/


//save cookie function
const saveCookie = async (page) => {
    const cookies = await page.cookies();
    const cookieJson = JSON.stringify(cookies, null, 2);
    await fs.writeFile('cookies.json', cookieJson);
}

//load cookie function
const loadCookie = async (page) => {
    const cookieJson = await fs.readFile('cookies.json');
    const cookies = JSON.parse(cookieJson);
    await page.setCookie(...cookies);
}

async function initBrowser(userSubmitted, passwordSubmitted, WhichCourt, TimeSlot, CourtNum){
    const browser = await puppeteer.launch({headless: false, slowMo: 20});
    const page = await browser.newPage();
    console.log('Browser opened!')

    // NEED THESE ON FIRST RUN
    // const cookies = await page.cookies();   
    // await fs.writeFile('./cookies.json', JSON.stringify(cookies, null, 2));
    
    try {
        await loadCookie(page);
    } catch (e) {
        console.log('No cookies found');
    }
    // await loadCookie(page);
    await page.goto('https://app.courtreserve.com/Online/Account/Login/7975?isMobileLayout=False');
    //await saveCookie(page);
    if(page.url() == "https://app.courtreserve.com/Online/Account/Login/7975?isMobileLayout=False"){
        await logIn(page, userSubmitted, passwordSubmitted, WhichCourt, TimeSlot, CourtNum);
    }
    else{
        await reserve(page);
    }
    //await logIn(page);
    await browser.close();
}


async function logIn(page, userSubmitted, passwordSubmitted, WhichCourt, TimeSlot, CourtNum){
    const dateTimeStart = new Date();
    console.log(`Start Time: ${dateTimeStart.toTimeString()}`);
    console.log(page.url());
    try {
        await page.focus('input[name="UserNameOrEmail"]')

    } catch (error) {
        console.log('Error: ', error)
    }

    await page.focus('input[name="UserNameOrEmail"]')

    console.log(userSubmitted, passwordSubmitted)

    await page.keyboard.type(userSubmitted)
    await page.focus('input[name=Password')
    await page.keyboard.type(passwordSubmitted);
    await page.keyboard.press('Enter');
    await page.waitForNavigation({waitUntil: 'networkidle2'});
    //await saveCookie(page);
   // await page.screenshot({ path: 'loggedin.png' })
    console.log('Logged in!');
    await reserve(page, WhichCourt, TimeSlot, CourtNum);
 
}

async function reserve(page, WhichCourt, TimeSlot, CourtNum){
    console.log('starting reservation');

    // goes to page
    if(WhichCourt == "Tom Brown"){
        await page.goto('https://app.courtreserve.com/Online/Reservations/Bookings/7975?sId=12131');    }
    else if(WhichCourt == "Four Oaks"){
        await page.goto('https://app.courtreserve.com/Online/Reservations/Bookings/7975?sId=13515');    }
    console.log('went to page');
   
    const dateTimeObject = new Date();
    console.log(`Date: ${dateTimeObject.toDateString()}`);
    console.log(`Time: ${dateTimeObject.toTimeString()}`);


    // wait for here button
     //await page.waitForSelector('#ReservationOpenTimeDispplay > span > a', {timeout: 5_000});
     try {
        await page.waitForSelector('#ReservationOpenTimeDispplay > span > a', {timeout: 30_000});
        await page.evaluate(()=> document.querySelector('#ReservationOpenTimeDispplay > span > a').click())

    } catch (e) {
            console.log('here button not displayed/clicked')
          // Do something if this is a timeout.
      }
    
     // click here
     // await page.evaluate(()=> document.querySelector('#ReservationOpenTimeDispplay > span > a'))


    // TESTING
    // await page.evaluate(()=>document.querySelector('#CourtsScheduler > div > span.k-scheduler-navigation.k-button-group > button.k-button.k-button-md.k-rounded-md.k-button-solid.k-button-solid-base.k-icon-button.k-nav-next').click())
    // await page.evaluate(()=>document.querySelector('#CourtsScheduler > div > span.k-scheduler-navigation.k-button-group > button.k-button.k-button-md.k-rounded-md.k-button-solid.k-button-solid-base.k-icon-button.k-nav-next').click())
    // await page.evaluate(()=>document.querySelector('#CourtsScheduler > div > span.k-scheduler-navigation.k-button-group > button.k-button.k-button-md.k-rounded-md.k-button-solid.k-button-solid-base.k-icon-button.k-nav-next').click())
    // await page.evaluate(()=>document.querySelector('#CourtsScheduler > div > span.k-scheduler-navigation.k-button-group > button.k-button.k-button-md.k-rounded-md.k-button-solid.k-button-solid-base.k-icon-button.k-nav-next').click())
    // await page.evaluate(()=>document.querySelector('#CourtsScheduler > div > span.k-scheduler-navigation.k-button-group > button.k-button.k-button-md.k-rounded-md.k-button-solid.k-button-solid-base.k-icon-button.k-nav-next').click())
    // await page.evaluate(()=>document.querySelector('#CourtsScheduler > div > span.k-scheduler-navigation.k-button-group > button.k-button.k-button-md.k-rounded-md.k-button-solid.k-button-solid-base.k-icon-button.k-nav-next').click())
    // await page.evaluate(()=>document.querySelector('#CourtsScheduler > div > span.k-scheduler-navigation.k-button-group > button.k-button.k-button-md.k-rounded-md.k-button-solid.k-button-solid-base.k-icon-button.k-nav-next').click())

    await delay(2000);
    
    // wait for court scheduler
    await page.waitForSelector('xpath=//*[@id="CourtsScheduler"]', { timeout: 10_000 });


    console.log(TimeSlot, CourtNum)
    await page.evaluate((TimeSlot, CourtNum)=>{
        console.log(TimeSlot, CourtNum)
        document.querySelector('#CourtsScheduler > table > tbody > tr:nth-child(2) > td:nth-child(2) > div > table > tbody > tr:nth-child(' + TimeSlot + ') > td:nth-child(' + CourtNum + ') > span > button').click();
    }, TimeSlot, CourtNum);


    await page.waitForSelector('#reservation-general-info', {timeout: 30_000});
    // OPENS DROPDOWN FOR RESERVATION TYPE
    await page.evaluate(()=>document.querySelector('#reservation-general-info > div > div:nth-child(2) > div > div > span > button').click())
    // wait for drop down

    await page.waitForSelector('#ReservationTypeId-list > div.k-list-content.k-list-scroller', {timeout: 15_000});
    
    // NEW LINE to make sure doubles is loaded.
    await page.waitForSelector('#ReservationTypeId_listbox > li:nth-child(2)', {timeout: 15_000});

    // select doubles
    // first test failed here. click was null
    await page.evaluate(()=>document.querySelector('#ReservationTypeId_listbox > li:nth-child(2)').click())

    // wait for duration to update
    await page.waitForSelector('#EndTime', {timeout: 10_000})
    await delay(2000);
    await page.evaluate(()=>document.querySelector('#Duration_listbox').click())

    await delay(2000);

    // save
    await page.evaluate(()=>document.querySelector('#createReservation-Form > div.modal-footer-container > div > button.btn.btn-primary.btn-submit').click())
    

    const dateTimeEnd = new Date();
    console.log(` End Time: ${dateTimeEnd.toTimeString()}`);
    await delay(4000);

    const dateTimeAfter = new Date();
    console.log(`Date: ${dateTimeAfter.toDateString()}`);
    console.log(`Time: ${dateTimeAfter.toTimeString()}`);

    return "success";

}



function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }


module.exports = { initBrowser };