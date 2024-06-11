import { useEffect, useRef } from 'react';

const useGooglePlacesAutocomplete = (onAddressChange) => {
  const addressInputRef = useRef(null);

  useEffect(() => {
    if (addressInputRef.current) {
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

        onAddressChange(place.formatted_address);
      });
    }
  }, [onAddressChange]);

  return addressInputRef;
};

export default useGooglePlacesAutocomplete;