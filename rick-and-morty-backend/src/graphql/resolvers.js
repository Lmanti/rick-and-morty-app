const characterService = require('../services/characterService');

const resolvers = {
    Query: {
        characters: async (_, { filter }) => {
            return await characterService.getCharacters(filter || {});
        },
        character: async (_, { id }) => {
            return await characterService.getCharacterById(id);
        }
    }
};

module.exports = resolvers;