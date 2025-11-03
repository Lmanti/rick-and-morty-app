import { useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { selectActiveFilters, setFilterSections } from '../redux/slices/filterSlice';
import { GET_CHARACTERS } from '../graphql/queries';

export const useCharacters = () => {
  const dispatch = useAppDispatch();
  const activeFilters = useAppSelector(selectActiveFilters);

  const { loading, error, data/*, refetch*/ } = useQuery(GET_CHARACTERS, {
    variables: {
      filter: {
        name: activeFilters.name || undefined,
        status: activeFilters.status || undefined,
        gender: activeFilters.gender || undefined,
        species: activeFilters.species || undefined,
        origin: activeFilters.origin || undefined,
      }
    },
    notifyOnNetworkStatusChange: true
  });

  const filterOptions = useMemo(() => {
    if (!data?.characters) {
      return {
        species: [],
        status: [],
        gender: [],
        origin: []
      };
    }

    const characters = data.characters;

    const uniqueSpecies = [...new Set(
      characters.map(c => c.species?.name).filter(Boolean)
    )];
    
    const uniqueStatus = [...new Set(
      characters.map(c => c.status?.name).filter(Boolean)
    )];
    
    const uniqueGender = [...new Set(
      characters.map(c => c.gender?.name).filter(Boolean)
    )];
    
    const uniqueOrigin = [...new Set(
      characters.map(c => c.origin?.name).filter(Boolean)
    )];

    return {
      species: uniqueSpecies.sort(),
      status: uniqueStatus.sort(),
      gender: uniqueGender.sort(),
      origin: uniqueOrigin.sort()
    };
  }, [data]);

  useEffect(() => {
    const sections = [];

    if (filterOptions.species.length > 0) {
      sections.push({
        key: 'species',
        label: 'Species',
        options: filterOptions.species.map(species => ({
          value: species,
          label: species
        }))
      });
    }

    if (filterOptions.status.length > 0) {
      sections.push({
        key: 'status',
        label: 'Status',
        options: filterOptions.status.map(status => ({
          value: status,
          label: status
        }))
      });
    }

    if (filterOptions.gender.length > 0) {
      sections.push({
        key: 'gender',
        label: 'Gender',
        options: filterOptions.gender.map(gender => ({
          value: gender,
          label: gender
        }))
      });
    }

    if (filterOptions.origin.length > 0) {
      sections.push({
        key: 'origin',
        label: 'Origin',
        options: filterOptions.origin.map(origin => ({
          value: origin,
          label: origin
        }))
      });
    }

    dispatch(setFilterSections(sections));
  }, [filterOptions, dispatch]);

  return {
    characters: data?.characters || [],
    loading,
    error
  };
};