import { execute } from '../database/conexao';

async function insertUsuario(nome, idade, cpf, email, celular, senha) {
    const comando = `
        INSERT INTO usuario (nome, idade, cpf, email, celular, senha)
        VALUES (?, ?, ?, ?, ?, ?);
    `;
    const params = [nome, idade, cpf, email, celular, senha];

    console.log('Comando:', comando);
    console.log('Parâmetros:', params);

    try {
        await execute(comando, params, 'run');
        console.log('Usuário inserido com sucesso.');
    } catch (error) {
        console.error('Erro ao inserir usuário:', error.message);
    }
}

export { insertUsuario };
