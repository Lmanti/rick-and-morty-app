const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Character {
    id: Int!
    rmId: Int!
    name: String!
    status: String
    species: String
    type: String
    gender: String
    origin: String
    location: String
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