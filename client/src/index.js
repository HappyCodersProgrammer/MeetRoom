import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import {QueryClient, QueryClientProvider,} from 'react-query'

const queryClient = new QueryClient()

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </QueryClientProvider>
);


