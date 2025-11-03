import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters( $filter: CharacterFilter ) {
    characters(filter: $filter) {
      id
      name
      image
      species {
        name
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($characterId: Int!) {
    character(id: $characterId) {
      id
      name
      image
      status {
        name
      }
      species {
        name
      }
      type
      gender {
        name
      }
      origin {
        name
      }
      location {
        name
      }
      episodeCount
    }
  }
`;