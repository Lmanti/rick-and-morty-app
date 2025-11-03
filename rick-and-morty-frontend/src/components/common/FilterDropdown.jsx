import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const FilterDropdown = ({ isOpen, onClose, anchorRef, sections, activeFilters, onApplyFilters }) => {
  const dropdownRef = useRef(null);
  const [tempFilters, setTempFilters] = useState({});

  useEffect(() => {
    if (isOpen) {
      setTempFilters(activeFilters || {});
    }
  }, [isOpen, activeFilters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        anchorRef.current &&
        !anchorRef.current.contains(event.target)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, anchorRef]);

  const handleTempFilterChange = (key, value) => {
    setTempFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    Object.entries(tempFilters).forEach(([key, value]) => {
      onApplyFilters(key, value);
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-[70vh] overflow-y-auto" >
      <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white">
        <h2 className="text-base font-semibold">Filters</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600" >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="p-4 space-y-4">
        {
          sections.map((section) => {
            const totalOptions = section.options.length + 1;
            const gridCols = totalOptions <= 3 ? 'grid-cols-2' : 'grid-cols-3';
            return (
              <div key={section.key}>
                <label className="block text-xs font-medium text-gray-600 mb-2"> {section.label} </label>
                <div className={`grid ${gridCols} gap-2`}>
                  <button onClick={() => handleTempFilterChange(section.key, '')} className={`px-3 py-2 rounded-md text-xs font-medium transition-colors ${ tempFilters[section.key] === '' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`} >
                    All
                  </button>
                  {
                    section.options.map((option) => (
                      <button key={option.value} onClick={() => handleTempFilterChange(section.key, option.value)} className={`px-3 py-2 rounded-md text-xs font-medium transition-colors truncate ${ tempFilters[section.key] === option.value ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200' }`} title={option.label} >
                        {option.label}
                      </button>
                    ))
                  }
                </div>
              </div>
            );
          })
        }
      </div>
      <div className="p-4 border-t sticky bottom-0 bg-white">
        <button onClick={handleApplyFilters} className="w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:bg-primary-dark transition-colors" >
          Filter
        </button>
      </div>
    </div>
  );
};