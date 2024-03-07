const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    stripeSessionID: String,
    role: {
        type: String,
        default: 'USER'
    }
})

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;