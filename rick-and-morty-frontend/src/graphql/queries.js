import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters( $filter: CharacterFilter ) {
    characters(filter: $filter) {
      id
      name
      image
      status {
        name
      }
      species {
        name
      }
      gender {
        name
      }
      origin {
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

export const GET_FILTER_OPTIONS = gql`
  query GetFilterOptions {
    filterOptions {
      speciesOptions
      statusOptions
      genderOptions
      originOptions
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($characterId: Int!) {
    comments(characterId: $characterId) {
      id
      text
      author
      createdAt
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($input: CommentInput!) {
    addComment(input: $input) {
      id
      text
      author
      createdAt
    }
  }
`;