const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokemon = new Schema({
    base: {
        Attack: Number,
        Defense: Number,
        Hp: Number,
        SpAtk: Number,
        SpDef: Number,
        Speed: Number
    },
    cname: String,
    ename: String,
    id: Number,
    jname: String,
    skills: {
        egg: [Number],
        level_up: [Number],
        tm: [Number],
        transfer:[Number],
        tutor: [Number]
    },
    type: [{type:Schema.Types.ObjectId, ref: 'Type'}]
});

let Pokemon = mongoose.model('Pokemon', pokemon);
module.exports = Pokemon;