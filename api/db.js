import mysql from "mysql";

// Cria a conexão com o banco de dados
export const db = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_DATABASE,
	timezone: process.env.DATABASE_TIMEZONE,
});

// Realiza a conexão com o banco de dados e imprime uma mensagem caso haja um erro
db.connect((err) => {
	if (err) throw err;
	console.log("Conectado ao banco de dados!");
});
