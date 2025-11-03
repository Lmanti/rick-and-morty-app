import { useQuery } from '@apollo/client';
import { GET_CHARACTERS } from '../graphql/queries';
import { useFiltersContext } from '../context/FiltersContext';

export const useCharacters = () => {
  const { activeFilters } = useFiltersContext();

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: {
      filter: {
        name: activeFilters.name || undefined,
        status: activeFilters.status || undefined,
        gender: activeFilters.gender || undefined,
        species: activeFilters.species || undefined,
        origin: activeFilters.origin || undefined,
        sort: activeFilters.sort || undefined
      }
    },
    notifyOnNetworkStatusChange: true
  });

  return {
    characters: data?.characters || [],
    loading,
    error
  };
};