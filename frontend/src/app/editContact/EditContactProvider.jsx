import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
import dynamic from 'next/dynamic';

const EditContact = dynamic(() => import('./EditContact'), {
  ssr: false,
});

const EditContactProvider = () => {
  return (
    <Provider store={store}>
      <EditContact />
    </Provider>
  );
};

export default EditContactProvider;