// Importações de ícones e componentes do Chakra UI, além de bibliotecas auxiliares.
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
	Table,
	Thead,
	Tr,
	Th,
	Tbody,
	Td,
	useBreakpointValue,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import axios from "axios"; // Biblioteca para realizar requisições HTTP.
import { toast } from "react-toastify"; // Biblioteca para exibir alertas.
import {
	formatDate,
	formatCpfCnpj,
	formatPhoneNumber,
	formatCurrency,
} from "../utils"; // Funções auxiliares de formatação.
import React, { useState } from "react";

/**
 * Componente Grid que renderiza uma tabela de clientes e oferece ações de edição e exclusão.
 * @param {Array} clients - Lista de clientes a serem exibidos na tabela.
 * @param {Function} setClients - Função para atualizar a lista de clientes após uma ação (edição ou exclusão).
 * @param {Function} setOnClientEdit - Função para definir o cliente a ser editado.
 * @param {Function} onOpenEdit - Função para abrir o modal de edição.
 */
const Grid = ({ clients, setClients, setOnClientEdit, onOpenEdit }) => {
	// Gerenciamento do estado e controle de modais.
	const { isOpen, onOpen, onClose } = useDisclosure(); // Hook do Chakra UI para controlar o estado do AlertDialog.
	const [deleteDataClient, setDeleteDataClient] = useState(null); // Estado para armazenar o cliente a ser excluído.
	const cancelRef = React.useRef(); // Referência para o botão de cancelamento no modal de exclusão.

	// Determina se a interface está em modo mobile ou desktop com base no tamanho da tela.
	const isMobile = useBreakpointValue({
		base: true,
		lg: false,
	});

	/**
	 * Função para buscar os dados de um cliente e abrir o formulário de edição.
	 * @param {number} clientId - ID do cliente a ser editado.
	 */
	const handleEdit = async (clientId) => {
		const { data } = await axios.get(
			`http://localhost:8800/api/clients/${clientId}`,
		); // Faz a requisição para obter os dados do cliente.

		setOnClientEdit(data.data); // Define o cliente a ser editado.
	};

	/**
	 * Função para preparar a exclusão de um cliente, abrindo o modal de confirmação.
	 * @param {Object} client - Objeto do cliente a ser excluído.
	 */
	const handleDelete = async (client) => {
		setDeleteDataClient(client); // Define o cliente a ser excluído.
		onOpen(); // Abre o modal de confirmação.
	};

	/**
	 * Função para confirmar e executar a exclusão de um cliente.
	 */
	const confirmDelete = async () => {
		try {
			await axios
				.delete(`http://localhost:8800/api/clients/${deleteDataClient.id}`) // Requisição para excluir o cliente.
				.then(({ data }) => {
					const newArray = clients.filter(
						(client) => client.id !== deleteDataClient.id,
					); // Atualiza a lista de clientes excluindo o cliente.

					setClients(newArray); // Define a nova lista de clientes.
					toast.success(data.msg); // Exibe uma mensagem de sucesso.
				})
				.catch(({ data }) => toast.error(data.msg)); // Exibe uma mensagem de erro caso falhe.

			setOnClientEdit(null);
		} catch (error) {
			toast.error("Falha ao tentar deletar cliente");
		} finally {
			onClose(); // Fecha o modal de exclusão.
		}
	};

	return (
		<>
			{/* Renderiza uma tabela para exibir a lista de clientes. */}
			<Table mt="6">
				<Thead>
					<Tr>
						{/* Colunas da tabela */}
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							#
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Codigo
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Nome
						</Th>
						<Th w={isMobile ? 50 : 500} fontSize="15px">
							CPF/CNPJ
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Telefone
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							CEP
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Logradouro
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Endereço
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Numero
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Bairro
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Cidade
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							UF
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Complemento
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Limite de Credito
						</Th>
						<Th maxW={isMobile ? 50 : 500} fontSize="15px">
							Validade
						</Th>
						<Th p={5} />
						<Th p={5} />
					</Tr>
				</Thead>
				<Tbody>
					{/* Mapeia a lista de clientes para criar as linhas da tabela. */}
					{clients.map((item) => (
						<Tr key={item.id} cursor="pointer " _hover={{ bg: "gray.100" }}>
							<Td maxW={isMobile ? 5 : 500}>{item.id}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.codigo}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.nome}</Td>
							<Td maxW={isMobile ? 5 : 500}>{formatCpfCnpj(item.cpf_cnpj)}</Td>
							<Td maxW={isMobile ? 5 : 500}>{formatPhoneNumber(item.fone)}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.cep}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.logradouro}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.endereco}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.numero}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.bairro}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.cidade}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.uf}</Td>
							<Td maxW={isMobile ? 5 : 500}>{item.complemento}</Td>
							<Td maxW={isMobile ? 5 : 500}>
								{item.limite_credito > 0
									? formatCurrency(item.limite_credito)
									: ""}
							</Td>
							<Td maxW={isMobile ? 5 : 500}>
								{item.validade && item.validade !== "0000-00-00"
									? formatDate(item.validade)
									: ""}
							</Td>
							<Td p={0}>
								<EditIcon
									fontSize={20}
									onClick={() => [handleEdit(item.id), onOpenEdit()]}
								/>
							</Td>
							<Td p={0}>
								<DeleteIcon fontSize={20} onClick={() => handleDelete(item)} />
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>

			{/* Modal de confirmação de exclusão */}
			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Confirm Delete
						</AlertDialogHeader>

						<AlertDialogBody>
							{deleteDataClient
								? `Deseja realmente deletar o cliente #${deleteDataClient.id} - ${deleteDataClient.nome}`
								: "Carregando..."}
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="red" onClick={confirmDelete} ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default Grid;
