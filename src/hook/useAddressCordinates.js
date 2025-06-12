import { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { countries } from '../libs/constants';
import { useGetCoordinatesByAddressQuery } from '../services/geoAPi';


// Debounce helper
function useDebouncedValue(value, delay = 1000) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

// Hook
export function useAddressCoordinates(control) {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [address, setAddress] = useState('');

  const [country, city] = useWatch({
    control,
    name: ['country', 'city'],
  });

  // Convert country code to name
  const getCountryNameByCode = (code) => {
    const country = countries.find(c => c.code === code);
    return country ? country.name : '';
  };

  useEffect(() => {
    const countryName = getCountryNameByCode(country);
    setSelectedCountry(countryName);
    if (city && countryName) {
      setAddress(`${city}, ${countryName}`);
    }
  }, [country, city]);

  const debouncedAddress = useDebouncedValue(address);
  const queryResult = useGetCoordinatesByAddressQuery(debouncedAddress, {
    skip: !debouncedAddress,
  });

  return {
    selectedCountry,
    setSelectedCountry,
    setAddress,
    address,
    debouncedAddress,
    ...queryResult,
  };
}
