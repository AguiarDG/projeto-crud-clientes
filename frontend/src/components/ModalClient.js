// Importações necessárias de componentes do Chakra UI, bibliotecas e utilidades
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	Button,
	FormControl,
	FormLabel,
	Input,
	Box,
	Grid,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify"; // Para exibir notificações
import axios from "axios"; // Para fazer requisições HTTP

/**
 * Componente ModalClient para cadastro/edição de clientes.
 * @param {boolean} isOpen - Define se o modal está aberto.
 * @param {function} onClose - Função para fechar o modal.
 * @param {object} onClientEdit - Cliente a ser editado, se for o caso.
 * @param {function} setOnClientEdit - Função para redefinir o cliente em edição.
 */
const ModalClient = ({ isOpen, onClose, onClientEdit, setOnClientEdit }) => {
	// Estado que armazena os dados do formulário
	const [formDataClient, setFormDataClient] = useState({
		codigo: "",
		nome: "",
		cpf_cnpj: "",
		cep: "",
		logradouro: "",
		endereco: "",
		numero: "",
		bairro: "",
		cidade: "",
		uf: "",
		complemento: "",
		fone: "",
		limite_credito: "",
		validade: "",
	});

	// Referência para o formulário
	const localref = useRef();

	// useEffect que preenche o formulário se estiver editando um cliente
	useEffect(() => {
		if (onClientEdit) {
			const client = {};

			client.codigo = onClientEdit.codigo;
			client.nome = onClientEdit.nome;
			client.cpf_cnpj = onClientEdit.cpf_cnpj;
			client.cep = onClientEdit.cep;
			client.logradouro = onClientEdit.logradouro;
			client.endereco = onClientEdit.endereco;
			client.numero = onClientEdit.numero;
			client.bairro = onClientEdit.bairro;
			client.cidade = onClientEdit.cidade;
			client.uf = onClientEdit.uf;
			client.complemento = onClientEdit.complemento;
			client.fone = onClientEdit.fone;
			client.limite_credito = onClientEdit.limite_credito;
			client.validade = onClientEdit.validade;

			setFormDataClient(client);
		}
	}, [onClientEdit]);

	// Função para a mudança de valores nos campos do formulário
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormDataClient((prev) => ({ ...prev, [name]: value }));
	};

	// Função para buscar e preencher os dados de endereço ao informar o CEP
	const handleCepChange = async (e) => {
		const value = e.target.value;
		setFormDataClient((prev) => ({
			...prev,
			cep: value,
		}));

		if (value.length === 8) {
			try {
				const { data } = await axios.get(
					`http://localhost:8800/api/clients/cep/${value}`,
				);

				if (data.erro) {
					toast.error("CEP não encontrado");
				} else {
					const cepData = data.data;

					// Atualiza apenas os campos necessários
					setFormDataClient((prev) => ({
						...prev,
						logradouro: cepData.logradouro,
						bairro: cepData.bairro,
						cidade: cepData.localidade,
						uf: cepData.uf,
						endereco: cepData.logradouro,
					}));
				}
			} catch (error) {
				toast.error("Erro ao buscar o CEP");
			}
		}
	};

	// Função de envio do formulário para o backend
	const handleSubmit = async (e) => {
		const client = localref.current;

		// Validação de campos vazios
		const hasEmptyField = Object.values(client).some((field) => {
			let result = false;
			if (
				field.name !== "complemento" &&
				field.name !== "limite_credito" &&
				field.name !== "validade"
			) {
				result = field.value?.trim() === "";
			}

			return result;
		});

		if (hasEmptyField) {
			toast.warn("Por favor, preencha todos os campos!");
			return;
		}

		// Formata os dados para o padrão esperado
		const fieldsToSendRequest = Array.from(client.elements).reduce(
			(field, element) => {
				if (element.name) {
					// Verifica se o elemento tem o atributo name
					field[element.name] = element.value; // Adiciona o valor ao novo objeto
				}
				return field;
			},
			{},
		);

		// Envia os dados para o backend, caso tenha um cliente para edição, será enviado o id do cliente na URL e os dados como parametro
		if (onClientEdit) {
			await axios
				.put(
					`http://localhost:8800/api/clients/${onClientEdit.id}`,
					fieldsToSendRequest,
				)
				.then(({ data }) => toast.success(data.msg))
				.catch(({ data }) => toast.error(data.msg));
		} else {
			await axios
				.post("http://localhost:8800/api/clients", fieldsToSendRequest)
				.then(({ data }) => toast.success(data.msg))
				.catch(({ data }) => toast.error(data.msg));
		}

		setOnClientEdit(null);

		onClose();
	};

	return (
		<>
			{/** Renderiza um Modal para cadastrar o cliente */}
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent minWidth={800}>
					{/** Cabeçalho do Modal */}
					<ModalHeader>Cadastro de Cliente</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<form ref={localref} onSubmit={handleSubmit}>
							{/** Campos do formulario */}
							<Grid templateColumns="repeat(3, 1fr)" gap={4}>
								<FormControl isRequired>
									<Box>
										<FormLabel>Codigo</FormLabel>
										<Input
											type="text"
											name="codigo"
											maxLength={15}
											value={formDataClient.codigo || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>Nome</FormLabel>
										<Input
											type="text"
											name="nome"
											maxLength={150}
											value={formDataClient.nome || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>CPF/CNPJ</FormLabel>
										<Input
											type="text"
											name="cpf_cnpj"
											maxLength={20}
											value={formDataClient.cpf_cnpj || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>Telefone/Celular</FormLabel>
										<Input
											type="tel"
											name="fone"
											value={formDataClient.fone || ""}
											onChange={handleInputChange}
											onInput={(e) => {
												if (e.target.value.length > 15)
													e.target.value = e.target.value.slice(0, 15);
											}}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>Cep</FormLabel>
										<Input
											type="number"
											name="cep"
											maxLength={100}
											value={formDataClient.cep || ""}
											onChange={handleCepChange}
											onInput={(e) => {
												if (e.target.value.length > 100)
													e.target.value = e.target.value.slice(0, 100);
											}}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>Logradouro</FormLabel>
										<Input
											type="text"
											name="logradouro"
											maxLength={100}
											value={formDataClient.logradouro || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>Endereco</FormLabel>
										<Input
											type="text"
											name="endereco"
											maxLength={120}
											value={formDataClient.endereco || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>Numero</FormLabel>
										<Input
											type="text"
											name="numero"
											maxLength={20}
											value={formDataClient.numero || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>Bairro</FormLabel>
										<Input
											type="text"
											name="bairro"
											maxLength={50}
											value={formDataClient.bairro || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>Cidade</FormLabel>
										<Input
											type="text"
											name="cidade"
											maxLength={60}
											value={formDataClient.cidade || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl isRequired>
									<Box>
										<FormLabel>UF</FormLabel>
										<Input
											type="text"
											name="uf"
											maxLength={2}
											value={formDataClient.uf || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
								<FormControl>
									<Box>
										<FormLabel>Complemento</FormLabel>
										<Input
											type="text"
											name="complemento"
											maxLength={150}
											value={formDataClient.complemento || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>

								<FormControl>
									<Box>
										<FormLabel>Limite de Crédito</FormLabel>
										<Input
											type="number"
											name="limite_credito"
											maxLength={12}
											value={formDataClient.limite_credito || ""}
											onChange={handleInputChange}
											onInput={(e) => {
												if (e.target.value.length > 12)
													e.target.value = e.target.value.slice(0, 12);
											}}
										/>
									</Box>
								</FormControl>
								<FormControl>
									<Box>
										<FormLabel>Validade</FormLabel>
										<Input
											type="date"
											name="validade"
											value={formDataClient.validade || ""}
											onChange={handleInputChange}
										/>
									</Box>
								</FormControl>
							</Grid>
						</form>
					</ModalBody>
					{/** Cabeçalho do Modal, onde contem os botões de ação */}
					<ModalFooter justifyContent="end">
						<Button
							colorScheme="green"
							mr={3}
							type="submit"
							onClick={handleSubmit}
						>
							Salvar
						</Button>
						<Button colorScheme="red" onClick={onClose}>
							Cancelar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ModalClient;
