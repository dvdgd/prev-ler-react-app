import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { chakraTheme } from './config/chakraTheme';
import { CurrentUserProvider } from './context/AuthProvider';
import { Router } from './routes/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme} resetCSS>
      <BrowserRouter>
        <CurrentUserProvider>
          <Routes>
            <Route path="/*" element={<Router />} />
          </Routes>
        </CurrentUserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
)
