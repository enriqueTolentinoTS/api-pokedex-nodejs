const pokemonService = require("../services/pokemon-service");
const typeService = require("../services/type-service");

module.exports = (app) => {
    app.get('/pokemons', (req, res) => {
        console.log("Consultando todos los Pokemons");
        pokemonService.findAll().then((result) => {
            return res.status(200).json(result);
        }).catch( (err) => {
            return res.status(500).send(err);
        });
    });

    app.get('/pokemons/:id', (req, res) => {
        console.log("Consultando el pokemon: ", req.params.id);

        pokemonService.findById(req.params.id).then((result) => {
            return res.status(200).json(result);
        }).catch((err) => {
            return res.status(500).send(err);
        })
    });

    app.get('/load-database', (req, res) => {
        // Create collection in DB

        console.log('/load-database');
        typeService.loadTypes().then(() => {
            pokemonService.loadPokemons()
        }).then(() => {
            return res.json({});
        })
        .catch((err) => {
            console.log(err);
        });
    });
};