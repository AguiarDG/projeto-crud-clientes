// Importação de componentes e ícones do Chakra UI.
import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

/**
 * Componente HeaderCustom que exibe um cabeçalho com um botão para alternar entre os modos claro e escuro.
 * Utiliza o Chakra UI para layout e estilização.
 */
const HeaderCustom = () => {
  // Hook do Chakra UI para gerenciar o modo de cor (claro ou escuro).
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      {/* Box que contém o cabeçalho, com mudança de cor de fundo conforme o modo de cor. */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        {/* Flex container para alinhar o conteúdo do cabeçalho. */}
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>Sistema de cadastro de Clientes</Box>

          {/* Botão para alternar entre os modos de cor */}
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {/* Exibe ícone da lua para modo claro e ícone do sol para modo escuro */}
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default HeaderCustom;
