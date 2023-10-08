import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { chakraTheme } from './config/chakraTheme';
import { router } from './routes/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
)
