import React from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'; 
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('./Dashboard'), {
  ssr: false,
});

const DashboardProvider = () => {
  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>
  );
};

export default DashboardProvider;