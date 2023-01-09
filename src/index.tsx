import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { NotiStackProvider } from './context';
import { store } from './store';

const queryClient = new QueryClient();

const getLibrary = (provider: any) => {
  const lib = new ethers.providers.Web3Provider(provider);
  lib.pollingInterval = 5000;
  return lib;
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <NotiStackProvider>
              <App />
            </NotiStackProvider>
          </QueryClientProvider>
        </Provider>
      </Web3ReactProvider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
