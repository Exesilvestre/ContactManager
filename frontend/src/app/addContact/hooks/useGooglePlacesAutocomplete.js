import { useEffect, useRef } from 'react';

const useGooglePlacesAutocomplete = (onInputChange) => {
  const addressInputRef = useRef(null);

  useEffect(() => {
    const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
      fields: ['formatted_address'],
      types: ['address'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (!place.formatted_address) {
        console.error("No address available for input");
        return;
      }

      onInputChange({
        target: {
          name: "address",
          value: place.formatted_address,
        }
      });
    });
  }, [onInputChange]);

  return addressInputRef;
};

export default useGooglePlacesAutocomplete;