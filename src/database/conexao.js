import sqlite3 from 'sqlite3';
 
const SQLite = sqlite3.verbose();
 
function execute(command, params, method = 'all') {
    return new Promise((resolve, reject) => {
        db[method](command, params, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result);
        });
    });
}
 
const db = new SQLite.Database('.src/database/runtracking.db', SQLite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ' + err.message);
    } else {
        console.log('Conexão ao banco de dados estabelecida com sucesso.');
    }
});
 
export { db, execute };
 