import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
import dynamic from 'next/dynamic';

const AddContact = dynamic(() => import('./AddContact'), {
  ssr: false,
});

const AddContactProvider = () => {
  return (
    <Provider store={store}>
      <AddContact />
    </Provider>
  );
};

export default AddContactProvider;