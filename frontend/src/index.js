import React from 'react';
import ReactDOM from 'react-dom/client';
import { ColorModeScript } from '@chakra-ui/react';
import './index.css';
import App from './App';
import theme from './theme';
import { ChakraProvider } from '@chakra-ui/react';

// Cria a raiz do React na div com o id 'root' (normalmente no arquivo public/index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

// O método render monta o componente principal da aplicação e exibe na página.
root.render(
  <React.StrictMode>
    {/* ChakraProvider fornece o contexto do Chakra UI, que contém o tema e os componentes do Chakra para a aplicação */}
    <ChakraProvider theme={theme}>
      {/* ColorModeScript define o modo de cor inicial da aplicação (neste caso, 'dark' - modo escuro) */}
      <ColorModeScript initialColorMode={'dark'} />

      {/* Componente principal da aplicação, definido no arquivo App.js */}
      <App />

    </ChakraProvider>
  </React.StrictMode>
);
