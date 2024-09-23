import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { estilos } from "../styleSheet/estilos";
import CxTxTUser from "./CxTxTUser";
import { useNavigation } from "@react-navigation/native";
import database from "../database/firebaseconexao";
import { doc, updateDoc, getDoc } from "firebase/firestore";

function CadastroUsuarioAtualizacao({ route }) {
    const nav = useNavigation();
    let fundoCabecalho = require("../img/cabecalho.png");

    const { userId } = route.params; // Recebe o ID do usuário pela rota

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');
    const [foto, setFoto] = useState(null);

    useEffect(() => {
        // Função para buscar os dados do usuário no Firestore e preencher os estados
        const buscarDadosUsuario = async () => {
            const userDoc = await getDoc(doc(database, 'usuarios', userId));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setNome(userData.nome);
                setIdade(userData.idade);
                setCpf(userData.cpf);
                setEmail(userData.email);
                setCelular(userData.celular);
                setSenha(userData.senha);
                setFoto(userData.foto);
            }
        };

        buscarDadosUsuario();
    }, [userId]);

    const arraypHol = ['Digite o seu nome', 'Qual a sua idade', 'CPF: 999.999.999-00', 'Digite seu e-mail', 'Digite seu número de celular', 'Digite sua senha'];
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
            value={i === 0 ? nome : i === 1 ? idade : i === 2 ? cpf : i === 3 ? email : i === 4 ? celular : senha}
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

    async function atualizarCadastro() {
        try {
            await updateDoc(doc(database, 'usuarios', userId), {
                nome: nome,
                idade: idade,
                cpf: cpf,
                email: email,
                celular: celular,
                senha: senha,
                foto: foto // Atualiza a foto, caso seja modificada
            });
            nav.navigate('PerfilAtualizadoSucesso');
        } catch (error) {
            console.error("Erro ao atualizar documento: ", error);
        }
    }

    const abrirGaleriaOuCamera = () => {
        // Lógica para abrir galeria ou câmera para selecionar nova foto
    };

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalhoCadastro}>
                <View>
                    <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                </View>
            </View>
            <View style={estilos.corpoCadastro}>
                <Text style={estilos.titulo}>Atualize seu cadastro:</Text>
                {campos}
                <TouchableOpacity onPress={abrirGaleriaOuCamera} style={estilos.cameraIcon}>
                    <Icon name="camera" size={20} color="#12B1F5" />
                    <Text>  Atualizar Foto</Text>
                </TouchableOpacity>
            </View>
            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={atualizarCadastro}
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Atualizar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroUsuarioAtualizacao;
