const { Character } = require('../db');
const { Op } = require('sequelize');
const { cacheKeyForFilters, setToRedis, getFromRedis } = require('../redis')

async function getCharacters(filters = {}) {
    const key = cacheKeyForFilters(filters);
    const cached = await getFromRedis(key);
    if (cached) {
        return JSON.parse(cached);
    }
    
    const where = {};
    if (filters.name) {
        where.name = { [Op.iLike]: `%${filters.name}%` };
    }
    if (filters.status) {
        where.status = filters.status;
    }
    if (filters.species) {
        where.species = filters.species;
    }
    if (filters.gender) {
        where.gender = filters.gender;
    }
    if (filters.origin) {
        where.origin = { [Op.iLike]: `%${filters.origin}%` };
    }

    const characters = await Character.findAll({ where, order: [['name', 'ASC']] });

    const plain = characters.map(c => c.get({ plain: true }));
    await setToRedis(key, plain);

    return plain;
}

async function getCharacterById(id) {
    const character = await Character.findOne({ where: { id } });
    return character ? character.get({ plain: true }) : null;
}

module.exports = {
    getCharacters,
    getCharacterById
};