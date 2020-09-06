const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const type = new Schema({
    cname: String,
    ename: String,
    jname: String,
});

let Type = mongoose.model('Type', type);

module.exports = Type;