import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { EntradaTexto } from "./EntradaTexto";
import { Alerta } from "../componentes/Alerta";
import { buscarDadosUsuario, atualizarDadosUsuario } from "../servicos/requisicoesfirebase"; // Ajuste o caminho conforme necessário
import { auth } from "../database/firebaseconexao"; // Importar o auth do Firebase
import Cabecalho from "./Cabecalho";

function AtualizacaoUsuario({ navigation }) {
    const [dados, setDados] = useState({
        email: '',
        nome: '',
        endereco: {
            rua: '',
            bairro: '',
            cidade: '',
            cep: '',
        },
    });

    const [statusError, setStatusError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    useEffect(() => {
        const buscarDadosUsuario = async () => {
            const usuarioId = auth.currentUser?.uid; // Obtém o ID do usuário logado
            if (!usuarioId) {
                setMensagemError("Usuário não logado");
                return;
            }

            try {
                const usuarioData = await buscarDadosUsuario();
                if (usuarioData) {
                    setDados(usuarioData);
                } else {
                    setMensagemError("Usuário não encontrado");
                }
            } catch (error) {
                setMensagemError("Erro ao buscar dados: " + error.message);
            }
        };

        buscarDadosUsuario();
    }, []);

    const atualizarUsuario = async () => {
        try {
            const usuarioId = auth.currentUser?.uid; // Obtém o ID do usuário logado
            if (!usuarioId) {
                setMensagemError("Usuário não logado");
                return;
            }

            const resultado = await atualizarDadosUsuario({
                email: dados.email,
                nome: dados.nome,
                endereco: dados.endereco,
            });
            
            if (resultado === "sucesso") {
                setMensagemError("Dados atualizados com sucesso!");
                navigation.goBack(); // Navega de volta após a atualização
            } else {
                setMensagemError(resultado); // Mostra o erro retornado
            }
        } catch (error) {
            setMensagemError("Erro ao atualizar dados: " + error.message);
        }
    };

    const deslogar = async () => {
        try {
            await auth.signOut(); // Faz o logout do Firebase
            navigation.replace('Tela1'); // Navega para Tela1, substituindo a tela atual
        } catch (error) {
            console.error("Erro ao deslogar: ", error);
        }
    };
    
    return (
        <View style={estilos.fundo}>
            <Cabecalho logout={deslogar}/>
            <View>
                <Text style={estilos.titulo}>
                    Atualize seu Cadastro
                </Text>
            </View>
            <View style={estilos.corpoCadastroUsuario}>
                {/* Entradas de texto para dados do usuário */}
                <EntradaTexto
                    label='Nome'
                    value={dados.nome}
                    onChangeText={valor => setDados(prevDados => ({ ...prevDados, nome: valor }))}
                    error={statusError === 'nome'}
                    messageError={mensagemError}
                />
                <EntradaTexto
                    label='E-mail'
                    value={dados.email}
                    onChangeText={valor => setDados(prevDados => ({ ...prevDados, email: valor }))}
                    error={statusError === 'email'}
                    messageError={mensagemError}
                />
                <EntradaTexto
                    label='Rua'
                    value={dados.endereco.rua}
                    onChangeText={valor => setDados(prevDados => ({ ...prevDados, endereco: { ...prevDados.endereco, rua: valor } }))}
                    error={statusError === 'rua'}
                    messageError={mensagemError}
                />
                <EntradaTexto
                    label='Bairro'
                    value={dados.endereco.bairro}
                    onChangeText={valor => setDados(prevDados => ({ ...prevDados, endereco: { ...prevDados.endereco, bairro: valor } }))}
                    error={statusError === 'bairro'}
                    messageError={mensagemError}
                />
                <EntradaTexto
                    label='Cidade'
                    value={dados.endereco.cidade}
                    onChangeText={valor => setDados(prevDados => ({ ...prevDados, endereco: { ...prevDados.endereco, cidade: valor } }))}
                    error={statusError === 'cidade'}
                    messageError={mensagemError}
                />
                <EntradaTexto
                    label='CEP'
                    value={dados.endereco.cep}
                    onChangeText={valor => setDados(prevDados => ({ ...prevDados, endereco: { ...prevDados.endereco, cep: valor } }))}
                    error={statusError === 'cep'}
                    messageError={mensagemError}
                />
                <TouchableHighlight style={estilos.rodapeBotao} onPress={atualizarUsuario}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Atualizar</Text>
                </TouchableHighlight>
            </View>
            <Alerta
                mensagem={mensagemError}
                error={statusError === 'firebase'}
                setError={setStatusError}
            />
        </View>
    );
}

export default AtualizacaoUsuario;
