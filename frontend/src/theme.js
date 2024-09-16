import { extendTheme } from '@chakra-ui/react';

// Adiciona configurações de customização ao Theme do Chakra UI
const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
  components: {
    Table: {
      variants: {
        striped: {
          th: {
            bg: 'gray.800', // Altera a cor do cabeçalho da tabela
          },
          tr: {
            _hover: {
              bg: 'gray.700', // Cor de fundo ao passar o mouse
            },
          },
        },
      },
    },
  },
  colors: {
    gray: {
      50: '#f5f5f5',
      100: '#e0e0e0',
      200: '#c2c2c2',
      300: '#a3a3a3',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
  },
};

// Atribui as configurações a função extendTheme para customização
const theme = extendTheme({ config });

export default theme;
