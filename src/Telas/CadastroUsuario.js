import React, { useState } from "react";
import { View, Text, TouchableHighlight, Image } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { EntradaTexto } from "./EntradaTexto";
import { cadastrar } from "../servicos/requisicoesfirebase";
import { Alerta } from "../componentes/Alerta";
import { alteraDados } from "../utils/funcoesComum";

function CadastroUsuario({ navigation }) {
    const fundoCabecalho = require("../img/cabecalho.png"); // Movido para o escopo correto

    const [dados, setDados] = useState({
        email: '',
        senha: '',
        confirmaSenha: '',
    });

    const [statusError, setStatusError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

   

    async function realizarCadastro() {
        if (dados.email === '') {
            setMensagemError('Preencha o seu e-mail');
            setStatusError('email');
            return;
        } else if (dados.senha === '') {
            setMensagemError('Preencha sua senha');
            setStatusError('senha');
            return;
        } else if (dados.confirmaSenha === '') {
            setMensagemError('Confirme sua senha');
            setStatusError('confirmaSenha');
            return;
        } else if (dados.confirmaSenha !== dados.senha) {
            setMensagemError('A senha não confere!');
            setStatusError('confirmaSenha');
            return;
        } else{

        const resultado = await cadastrar(dados.email, dados.senha);
        setStatusError('firebase')
        if (resultado === 'sucesso') {
            setMensagemError('Usuário cadastrado com sucesso!');
            // Limpa os dados usando setDados
            setDados({
                email: '',
                senha: '',
                confirmaSenha: '',
            });
            navigation.navigate('CadastroSucessoUser'); // Correção aqui
        } else {
            setMensagemError(resultado);
        }
    }
}

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalho}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
            </View>
            <View style={estilos.corpoCadastro}>
                <Text style={estilos.titulo}>Preencha seu cadastro:</Text>
                <View style={{ paddingTop: 80 }}>
                    <EntradaTexto
                        label='e-mail'
                        value={dados.email}
                        onChangeText={valor => alteraDados('email', valor, dados, setDados)}
                        error={statusError === 'email'}
                        messageError={mensagemError}
                    />
                    <EntradaTexto
                        label='senha'
                        value={dados.senha}
                        onChangeText={valor => alteraDados('senha', valor, dados, setDados)}
                        error={statusError === 'senha'}
                        messageError={mensagemError}
                        secureTextEntry={true} // Ativa o comportamento de senha
                    />
                    <EntradaTexto
                        label='confirmar senha'
                        value={dados.confirmaSenha}
                        onChangeText={valor => alteraDados('confirmaSenha', valor, dados, setDados)}
                        error={statusError === 'confirmaSenha'}
                        messageError={mensagemError}
                        secureTextEntry={true} // Ativa o comportamento de senha
                    />
                </View>
            </View>
            <View style={estilos.rodapeCadastro}>
                <Alerta
                    mensagem={mensagemError}
                    error={statusError === 'firebase'} // Corrigido para 'firebase'
                    setError={setStatusError}
                />
                <TouchableHighlight style={estilos.rodapeBotao} onPress={realizarCadastro}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Cadastrar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroUsuario;
