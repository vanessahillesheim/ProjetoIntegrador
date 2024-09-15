import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import CxTxTUser from "./CxTxTUser";
import { useNavigation } from "@react-navigation/native";
import database from "../database/firebaseconexao";
import { collection, addDoc } from "firebase/firestore";

function CadastroUsuario() {
    const nav = useNavigation();
    let fundoCabecalho = require("../img/cabecalho.png");

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');

    const arraypHol = ['Digite o seu nome', 'qual a sua idade', 'CPF:999.999.999-00', 'Digite seu e-mail', 'Digite seu número de celular', 'Digite sua senha'];
    const arrayaCap = ['characters', 'none', 'none', 'none', 'none', 'none'];
    const arraycMax = ['30', '2', '14', '50', '50', '5'];
    const arraykTyp = ['default', 'number-pad', 'number-pad', 'email-address', 'phone-pad', 'default'];
    const arrayEdit = ['true', 'true', 'true', 'true', 'true', 'true'];
    const arraysegT = ['false', 'false', 'false', 'false', 'false', 'true'];
    const arraymLin = ['false', 'false', 'false', 'false', 'false', 'false'];
    let campos = [];

    for (let i = 0; i < arraypHol.length; i++) {
        campos.push(<CxTxTUser
            key={i}
            pHol={arraypHol[i]}
            aCap={arrayaCap[i]}
            cMax={arraycMax[i]}
            kTyp={arraykTyp[i]}
            edit={arrayEdit[i]}
            segT={arraysegT[i]}
            mLin={arraymLin[i]}
            onChangeText={text => {
                if (i === 0) setNome(text);
                if (i === 1) setIdade(text);
                if (i === 2) setCpf(text);
                if (i === 3) setEmail(text);
                if (i === 4) setCelular(text);
                if (i === 5) setSenha(text);
            }}
        />);
    }

    async function cadastroSucesso() {
        try {
            await addDoc(collection(database, 'usuarios'), {
                nome: nome,
                idade: idade,
                cpf: cpf,
                email: email,
                celular: celular,
                senha: senha
            });
            nav.navigate('CadastroSucessoUser');
        } catch (error) {
            console.error("Erro ao adicionar documento: ", error);
        }
    }

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalhoCadastro}>
                <View>
                    <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                </View>
            </View>
            <View style={estilos.corpoCadastro}>
                <Text style={estilos.titulo}>Preencha seu cadastro:</Text>
                {campos}
            </View>
            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={cadastroSucesso}
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Entrar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroUsuario;
