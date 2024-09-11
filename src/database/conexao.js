const db = new SQLite.openDatabase ('./src/database/testeSqlite3', SQLite.OPEN_READWRITE, (err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados: ' + err.message);
    } else {
        console.log('Conexão ao banco de dados estabelecida com sucesso.');
    }
});

export { db, execute };
 