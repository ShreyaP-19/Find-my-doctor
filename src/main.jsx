import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import MainRoute from './MainRoute';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <MainRoute/>  
  </BrowserRouter>
  </React.StrictMode>
);
