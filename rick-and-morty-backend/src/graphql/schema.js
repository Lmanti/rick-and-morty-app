const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Location {
        id: ID!
        name: String!
        url: String!
    }

    type Species {
        id: ID!
        name: String!
        characters: [Character]
    }

    type Status {
        id: ID!
        name: String!
        characters: [Character]
    }

    type Gender {
        id: ID!
        name: String!
        characters: [Character]
    }
        
    type Character {
        id: Int!
        rmId: Int!
        name: String!
        status: Status
        species: Species
        type: String
        gender: Gender
        origin: Location
        location: Location
        image: String
        episodeCount: Int
    }

    input CharacterFilter {
        name: String
        status: String
        species: String
        gender: String
        origin: String
    }

    type Query {
        characters(filter: CharacterFilter): [Character!]!
        character(id: Int!): Character
    }
`;

module.exports = typeDefs;