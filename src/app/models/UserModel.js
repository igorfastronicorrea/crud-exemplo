const mongoose = require('../database');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String,
    }
},
    {
        versionKey: false
    }
)

UserSchema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

    next();
});

const user = mongoose.model('users', UserSchema, 'users');


module.exports = user;