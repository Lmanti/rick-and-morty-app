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

    type FilterOptions {
        speciesOptions: [String!]!
        statusOptions: [String!]!
        genderOptions: [String!]!
        originOptions: [String!]!
    }
    
    enum SortOrder {
        ASC
        DESC
    }

    input CharacterFilter {
        name: String
        status: String
        species: String
        gender: String
        origin: String
        sort: SortOrder
    }

    type Query {
        characters(filter: CharacterFilter): [Character!]!
        character(id: Int!): Character
        filterOptions: FilterOptions!
    }
`;

module.exports = typeDefs;