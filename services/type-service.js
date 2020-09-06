const Type = require('../models/types');

const TypesJson = require('../data/types.json');

const loadTypes = () => {
    let allPromises = [];

    let i = 0;
    while (TypesJson[i] != undefined) {
        console.log("insert TypesJson: ", TypesJson[i]);
        const type = new Type({
            cname: TypesJson[i].cname,
            ename: TypesJson[i].ename,
            jname: TypesJson[i].jname,
        });
        allPromises.push(type.save());
        i++;
    }

    return Promise.all(allPromises);
};

module.exports = {
    loadTypes: loadTypes,
};