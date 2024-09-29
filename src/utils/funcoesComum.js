export const alteraDados = (variavel, valor, dados, setDados) => {
    if (variavel.includes('.')) {
        const [campo, subCampo] = variavel.split('.');
        setDados(prev => ({
            ...prev,
            [campo]: {
                ...prev[campo],
                [subCampo]: valor,
            },
        }));
    } else {
        setDados({
            ...dados,
            [variavel]: valor,
        });
    }
};
