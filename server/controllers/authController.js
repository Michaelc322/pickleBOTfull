const User = require('../models/user')
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Register endpoint
const registerUser = async(req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body;
        // Check if name was entered
        if(!firstName || !lastName){
            return res.json({
                error: 'Name is required'
            })
        };
        // Check if password is good
        if(!password || password.length < 7){
            return res.json({
                error: 'Password should be at least 7 characters long'
            })
        };

        // Check if email is unique
        const exist = await User.findOne({email})
        if(exist){
            return res.json({
                error: 'An account with this email already exists'
            })
        }

        const hashedPassword = await hashPassword(password)
        // Create user in database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        return res.json(user)
    }
    catch(error){
        console.log(error);
        return res.json({
            error: 'An error occurred during registration'
        });
    }
}

// Login endpoint
const loginUser = async(req, res) => {
    try
    {
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'Incorrect email or password'
            })
        }
        
        // check if passwords match
        const match = await comparePassword(password, user.password)
        if(match){
            const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '6h'}, {httpOnly: true});
           // res.cookie('token', token, {httpOnly: true, maxAge: 360000});
            res.json({user, token});
                
        }

        if(!match){
            return res.json({
                error: 'Incorrect email or password'
            })
            
        }

    } catch (error) {
        return res.status(401).json(error);
    }
}

const authenticateToken = async(req, res, next)=>{
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if(token == null) return res.sendStatus(401);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            console.log(token);
            if(err) return res.sendStatus(403);
            req.user = user;
            next();
            
        });

    } catch (error) {
        return res.json({status: false, message: "Invalid token"})
    }
}


const forgotPassword = async(req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.json({
                error: 'User not registered'
            })
        }

        const token = jwt.sign({email: user.email, id: user._id}, process.env.JWT_SECRET, {expiresIn: '15m'});

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            auth: {
              user: 'picklebotreset@gmail.com',
              pass: process.env.RESET_PASSWORD
            }
          });

          var mailOptions = {
            from: 'picklebotreset@gmail.com',
            to: email,
            subject: 'pickleBOT - Reset Account Password Link',
            html: `
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 10px; font-family: Poppins, sans-serif; text-align: center;">
                <img src="cid:pickleballLogo" alt="pickleBOT Logo" style="display: block; margin: 0 auto; max-width: 200px;"/>
                <h1 style="color: #fff;">pickleBOT</h1>
                <h3 style="color: #fff; margin-top: 10px;">Click the button below to reset your password</h3>
                <p><a href="http://localhost:5173/reset-password/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
            </div>
            `,
            attachments: [{
                filename: 'pickleball.png',
                path: './serverAssets/images/pickleball.png',
                cid: 'pickleballLogo'
              }]
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
              return res.json({
                  error: 'An error occurred while sending the email'
              })
            } else {
              return res.json({
                  message: 'Email sent successfully'
              })
            }
          
        })



    } catch (error) {
        console.log(error);
    }

}

const resetPassword = async(req, res) => {
    const {token, password} = req.body;

    if(token){
        try {
            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            const id = decodedData.id;
    
            const hashedPassword = await hashPassword(password)
    
            await User.findByIdAndUpdate({_id: id}, {password: hashedPassword});
            return res.status(200).json({message: 'Password changed successfully'})
        } catch (error) {
            return res.status(400).json({error: 'An error occurred while resetting the password'})
        }
    }
}

const verifyUser = async(req, res) => {
    console.log("verifying user")
    try {
        const user = req.user.user;
        return res.json(user);
    } catch (error) {
        return res.json({error: 'An error occurred while verifying the user'})
    }
}


module.exports = {
    registerUser,
    loginUser,
    authenticateToken,
    resetPassword,
    forgotPassword,
    verifyUser
}