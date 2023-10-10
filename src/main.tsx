import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { chakraTheme } from './config/chakraTheme';
import { CurrentUserProvider } from './context/AuthProvider';
import { router } from './routes/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CurrentUserProvider>
      <ChakraProvider theme={chakraTheme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </CurrentUserProvider>
  </React.StrictMode>
)
