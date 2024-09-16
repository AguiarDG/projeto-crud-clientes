import dayjs from "dayjs";

// Formata o campo CPF/CNPJ
export const formatCpfCnpj = (cpfCnpj) => {
	let cpfCnpjFormatted;

	if (cpfCnpj.length === 11) {
		cpfCnpjFormatted = formatCPF(cpfCnpj);
	} else if (cpfCnpj.length === 14) {
		cpfCnpjFormatted = formatCNPJ(cpfCnpj);
	} else {
		cpfCnpjFormatted = cpfCnpj;
	}

	return cpfCnpjFormatted;
};

// Formata o campo CPF
export const formatCPF = (cpf) => {
	return cpf
		.replace(/\D/g, "") // Remove tudo que não é dígito
		.replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto após os 3 primeiros dígitos
		.replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto após os próximos 3 dígitos
		.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca um hífen entre os 9 e 10 dígitos
};

// Formata o campo CNPJ
export const formatCNPJ = (cnpj) => {
	return cnpj
		.replace(/\D/g, "") // Remove tudo que não é dígito
		.replace(/(\d{2})(\d)/, "$1.$2") // Coloca um ponto após os 2 primeiros dígitos
		.replace(/(\d{3})(\d)/, "$1.$2") // Coloca um ponto após os próximos 3 dígitos
		.replace(/(\d{3})(\d)/, "$1/$2") // Coloca uma barra após os próximos 3 dígitos
		.replace(/(\d{4})(\d{1,2})$/, "$1-$2"); // Coloca um hífen após os 4 dígitos
};

export const formatDate = (dateString) => {
	return dayjs(dateString).format("DD/MM/YYYY");
};

// Função para formatar número de telefone
export const formatPhoneNumber = (phone) => {
	if (!phone) return "";

	const cleaned = `${phone}`.replace(/\D/g, "");
	const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);

	if (match) {
		return `(${match[1]}) ${match[2]}-${match[3]}`;
	}
	return phone;
};

export const formatCurrency = (value) => {
	if (value == null) return "";

	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(value);
};
