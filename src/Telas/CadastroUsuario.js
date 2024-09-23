<<<<<<< HEAD
import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'; // Ícone da câmera
import { estilos } from "../styleSheet/estilos";
import CxTxTUser from "./CxTxTUser";
import { useNavigation } from "@react-navigation/native";
import database from "../database/firebaseconexao";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from 'react-native-image-picker'; // Biblioteca para selecionar imagem

function CadastroUsuario() {
    const nav = useNavigation();
    let fundoCabecalho = require("../img/cabecalho.png");

    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');
    const [foto, setFoto] = useState(null); // Estado para armazenar a foto

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
                senha: senha,
                foto: foto // Adicione a URL da foto no banco de dados
            });
            nav.navigate('CadastroSucessoUser');
        } catch (error) {
            console.error("Erro ao adicionar documento: ", error);
        }
    }

    // Função para abrir a galeria ou câmera
    const abrirGaleriaOuCamera = () => {
        ImagePicker.launchImageLibrary({ mediaType: 'photo' }, response => {
            if (response.assets) {
                setFoto(response.assets[0].uri); // Armazena o URI da imagem selecionada
            }
        });
    };

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
                <TouchableOpacity onPress={abrirGaleriaOuCamera} style={estilos.cameraIcon}>
                    <Icon name="camera" size={20} color="#12B1F5" />
                    <Text>  Adicionar Foto</Text>
                </TouchableOpacity>
                {foto && (
                    <Image source={{ uri: foto }} style={{ width: 100, height: 100, marginTop: 10 }} />
                )}
            </View>
            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight style={estilos.rodapeBotao} onPress={cadastroSucesso}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Entrar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroUsuario;
=======
import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importe o ícone
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
    const [foto, setFoto] = useState(null); // Estado para armazenar a foto

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
                senha: senha,
                foto: foto // Adicione a URL da foto no banco de dados
            });
            nav.navigate('CadastroSucessoUser');
        } catch (error) {
            console.error("Erro ao adicionar documento: ", error);
        }
    }

    // Função para abrir a galeria ou câmera
    const abrirGaleriaOuCamera = () => {
        // Implemente aqui a lógica para abrir a galeria ou câmera
        // Você pode usar bibliotecas como react-native-image-picker para isso
    };

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
                <TouchableOpacity onPress={abrirGaleriaOuCamera} style={estilos.cameraIcon}>
                    <Icon name="camera" size={30} color="#000" />
                    <Text>Adicionar Foto</Text>
                </TouchableOpacity>
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
>>>>>>> 7445952cd1ba76e126cb4c5471bc8e60f9c7d606
