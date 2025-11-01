const characterService = require('../services/characterService');

const resolvers = {
    Query: {
        characters: async (_, { filter }) => await characterService.getCharacters(filter || {}),
        character: async (_, { id }) => await characterService.getCharacterById(id)
    },
    Character: {
        gender: (parent) => parent.gender,
        status: (parent) => parent.status,
        species: (parent) => parent.species,
        origin: (parent) => parent.origin,
        location: (parent) => parent.location 
    }
};

module.exports = resolvers;