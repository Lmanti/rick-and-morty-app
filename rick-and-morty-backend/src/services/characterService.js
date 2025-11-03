const { Character, Gender, Status, Species, Location } = require('../db');
const { Op } = require('sequelize');
const { cacheKeyForFilters, setToRedis, getFromRedis } = require('../redis');

async function prepareWhereStatement(filters) {
    const where = {};

    if (filters.name) {
        where.name = { [Op.iLike]: `%${filters.name}%` };
    }
    if (filters.status) {
        const status = await Status.findOne({ where: { name: { [Op.iLike]: filters.status } } });
        where.statusId = status?.id || [];
    }
    if (filters.species) {
        const species = await Species.findOne({ where: { name: { [Op.iLike]: filters.species } } });
        where.speciesId = species?.id || [];
    }
    if (filters.gender) {
        const gender = await Gender.findOne({ where: { name: { [Op.iLike]: filters.gender } } });
        where.genderId = gender?.id || [];
    }
    if (filters.location) {
        const location = await Location.findOne({ where: { name: { [Op.iLike]: filters.location } }, include: ['residents'] });
        where.locationId = location?.id || [];
    }
    if (filters.origin) {
        const origin = await Location.findOne({ where: { name: { [Op.iLike]: filters.origin } }, include: ['natives'] });
        where.originId = origin?.id || [];
    }

    return where;
}

async function getCharacters(filters = {}) {
    const key = cacheKeyForFilters(filters);
    const cached = await getFromRedis(key);
    if (cached) {
        return JSON.parse(cached);
    }
    
    const where = await prepareWhereStatement(filters);

    const characters = await Character.findAll({
        where,
        order: [['name', 'ASC']],
        include: [
            { model: Gender, as: 'gender' },
            { model: Status, as: 'status' },
            { model: Species, as: 'species' },
            { model: Location, as: 'location' },
            { model: Location, as: 'origin' }
        ]
    });

    const plain = characters.map(c => c.get({ plain: true }));
    await setToRedis(key, plain);

    return plain;
}

async function getCharacterById(id) {
    const character = await Character.findOne({
        where: { id },
        include: [
            { model: Gender, as: 'gender' },
            { model: Status, as: 'status' },
            { model: Species, as: 'species' },
            { model: Location, as: 'location' },
            { model: Location, as: 'origin' }
        ]
    });
    return character ? character.get({ plain: true }) : null;
}

module.exports = {
    getCharacters,
    getCharacterById
};