const mongoose = require('../database');
const bcryptjs = require('bcryptjs');

const FonoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    telefone: {
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

FonoSchema.pre('save', async function (next) {
    const hash = await bcryptjs.hash(this.password, 10);
    this.password = hash;

    next();
});

const fono = mongoose.model('fono', FonoSchema, 'fono');


module.exports = fono;