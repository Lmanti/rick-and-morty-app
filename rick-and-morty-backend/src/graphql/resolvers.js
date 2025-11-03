const characterService = require('../services/characterService');
const filterService = require('../services/filtersService');
const commentService = require('../services/commentService');

const resolvers = {
    Query: {
        characters: async (_, { filter }) => await characterService.getCharacters(filter || {}),
        character: async (_, { id }) => await characterService.getCharacterById(id),
        filterOptions: async () => await filterService.getFilterOptions(),
        comments: async (_, { characterId }) => await commentService.getCommentsForCharacter(characterId)
    },
    Mutation: {
        addComment: async (_, { input }) => await commentService.addComment(input)
    },
    Character: {
        gender: (parent) => parent.gender,
        status: (parent) => parent.status,
        species: (parent) => parent.species,
        origin: (parent) => parent.origin,
        location: (parent) => parent.location,
        comments: async (parent) => await commentService.getCommentsForCharacter(parent.id)
    }
};

module.exports = resolvers;