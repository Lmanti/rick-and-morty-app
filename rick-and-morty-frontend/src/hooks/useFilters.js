import { useEffect, useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_FILTER_OPTIONS } from '../graphql/queries';

export const useFilters = () => {
  const [filtersSections, setFiltersSections] = useState([]);
  const { loading, error, data: filterOptionsData } = useQuery(GET_FILTER_OPTIONS);
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    if (!filterOptionsData?.filterOptions) return;
    const options = filterOptionsData.filterOptions;
    const sections = [];

    if (options.speciesOptions.length > 0) {
      sections.push({
        key: 'species',
        label: 'Species',
        options: options.speciesOptions.map(species => ({
          value: species,
          label: species
        }))
      });
    }

    if (options.statusOptions.length > 0) {
      sections.push({
        key: 'status',
        label: 'Status',
        options: options.statusOptions.map(status => ({
          value: status,
          label: status
        }))
      });
    }

    if (options.genderOptions.length > 0) {
      sections.push({
        key: 'gender',
        label: 'Gender',
        options: options.genderOptions.map(gender => ({
          value: gender,
          label: gender
        }))
      });
    }

    if (options.originOptions.length > 0) {
      sections.push({
        key: 'origin',
        label: 'Origin',
        options: options.originOptions.map(origin => ({
          value: origin,
          label: origin
        }))
      });
    }

    sections.push({
      key: 'sort',
      label: 'Sort',
      options: [
        { value: 'ASC', label: 'A-Z' },
        { value: 'DESC', label: 'Z-A' }
      ]
    });

    setFiltersSections(sections);

    const initialFilters = sections.reduce((acc, section) => {
      acc[section.key] = section.key === 'sort' ? 'ASC' : '';
      return acc;
    }, {});
    
    setActiveFilters(initialFilters);
  }, [filterOptionsData]);

  const updateFilter = useCallback((key, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters(prev =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === 'sort' ? 'ASC' : '';
        return acc;
      }, {})
    );
  }, []);

  return {
    activeFilters,
    setActiveFilters,
    updateFilter,
    clearFilters,
    filterSections: filtersSections || [],
    loading,
    error
  };
};