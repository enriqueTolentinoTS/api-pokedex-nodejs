const Pokemon = require('../models/pokemon');
const Type = require('../models/types');
const PokemonsJson = require('../data/pokedex.json');

const findAll = () => {
    return Pokemon.find({}).populate('type').exec();
}

const findById = (id) => {
    return Pokemon.find({id: id}).populate('type').exec();
}

const updateById = (id, body) => {
    return Pokemon.findOneAndUpdate({id: id}, body, {new: true}).populate('type').exec();
}

const create = (req) => {
    const newPokemon = new Pokemon(req);
    return newPokemon.save();
}

const removeById = (id) => {
    return Pokemon.remove({id: id}).exec;
}

const loadPokemons = () => {
    let allPromises = [];

    let j = 0;
    while (PokemonsJson[j] != undefined) {
        console.log("insert PokemonsJson: ", PokemonsJson[j]);
        let allPromises = [];
        let Poke = PokemonsJson[j];

        Type.findOne({
            cname: Poke.type[0]
        }).exec().then((typeFound) => {
            let pokemon = new Pokemon({
                base: {
                    Attack: Poke.base.Attack,
                    Defense: Poke.base.Defense,
                    HP: Poke.base.HP,
                    SpAtk: Poke.base['Sp.Atk'],
                    SpDef: Poke.base['Sp.Def'],
                    Speed: Poke.base.Speed,
                },
                cname: Poke.cname,
                ename: Poke.ename,
                id: Poke.id,
                jname: Poke.jname,
                skills: {
                    egg: Poke.skills.egg,
                    level_up: Poke.skills.level_up,
                    tm: Poke.skills.tm,
                    transfer: Poke.skills.transfer,
                    tutor: Poke.skills.tutor,
                },
                type: typeFound._id
            });
            if (Poke.type[1]) {
                Type.findOne({
                    cname: Poke.type[1]
                }).exec().then((typeFound2) => {
                    return Pokemon.updateOne({
                        id: Poke.id
                        }, { $push: { type: typeFound2._id }
                    })
                })
            }
            return allPromises.push(pokemon.save());
        }).catch((err) => {
            return console.log(err);
        })
        j++;
    };
    return Promise.all(allPromises);
};

module.exports = {
    findAll: findAll,
    findById: findById,
    updateById: updateById,
    create: create,
    removeById: removeById,
    loadPokemons: loadPokemons
}