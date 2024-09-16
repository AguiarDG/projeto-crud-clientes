import { Box, Flex, Button, useDisclosure, Input } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import ModalClient from './components/ModalClient';
import Grid from './components/Grid';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import HeaderCustom from './components/HeaderCustom';

const App = () => {
  // Hook para controle de abertura/fechamento do modal
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Estado que vai armazenar a lista de clientes
  const [clients, setClients] = useState([]);
  // Estado que vai armazenar o cliente que está sendo editado
  const [onClientEdit, setOnClientEdit] = useState(null);
  // Estado do campo de busca da grid
  const [searchGrid, setSearchGrid] = useState('');

  // Função que busca os clientes cadastrados no banco de dados via API
  const getClients = useCallback(async () => {
    try {
      const res = await axios.get('http://localhost:8800/api/clients');

      if (res.data.success) {
        setClients(res.data.data);
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  }, []);

  // Hook de efeito para buscar os clientes toda vez que o modal for fechado
  useEffect(() => {
    if (!isOpen) getClients();
  }, [isOpen, getClients]);

  // Função que filtra os clientes com base no termo de busca (nome, código, cidade ou CEP)
  const filteredClients = clients.filter(
    client =>
      client.nome.toLowerCase().includes(searchGrid.toLowerCase()) ||
      client.codigo.toString().includes(searchGrid) ||
      client.cidade.toLowerCase().includes(searchGrid.toLowerCase()) ||
      client.cep.toString().includes(searchGrid)
  );

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      fontSize="15px"
      fontFamily="poppins"
    >
      <Box maxW="90%" w="100%" h="100vh" px={2}>
        {/* Componente de cabeçalho personalizado */}
        <HeaderCustom />

        {/* Campo de input para busca na grid */}
        <Input
          placeholder="Pesquise pelo código, nome, cidade ou cep"
          value={searchGrid}
          onChange={e => setSearchGrid(e.target.value)}
          mt={5}
          mb={5}
        />

        {/* Botão para abrir o modal e adicionar um novo cliente */}
        <Button
          colorScheme="blue"
          onClick={() => [setOnClientEdit({}), onOpen()]}
          mt={5}
        >
          Novo Cliente
        </Button>

        {/* Modal para adicionar/editar cliente */}
        {isOpen && (
          <ModalClient
            isOpen={isOpen}
            onClose={onClose}
            onClientEdit={onClientEdit}
            setOnClientEdit={setOnClientEdit}
          />
        )}

        {/* Grid que exibe os clientes cadastrados */}
        <Box overflowY="auto" height="calc(100% - 100px)">
          <Grid
            clients={filteredClients}
            setClients={setClients}
            onOpenEdit={onOpen}
            setOnClientEdit={setOnClientEdit}
          />
        </Box>
      </Box>
      {/* Componente para exibir notificações de toast */}
      <ToastContainer
        autoClose={3000}
        position="bottom-left"
        style={{ zIndex: 1500 }}
      />
    </Flex>
  );
};

export default App;
