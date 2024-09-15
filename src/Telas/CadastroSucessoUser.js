import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { useNavigation } from "@react-navigation/native";

function CadastroSucessoUser() {
    let fundoCabecalho = require("../img/cabecalho.png");
    let logo = require("../img/logo.png");
    let sucesso = require("../img/sucesso.png");
    const nav = useNavigation();

    function acessarMenu() {
        // Após o cadastro, redireciona para o DrawerNavigator
        nav.replace('DrawerNavigator'); // Replace limpa o histórico de navegação anterior
    }

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalho}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
                <Image style={estilos.logo} source={logo} />
            </View>
            <View style={estilos.corpo}>
                <Image style={estilos.sucesso} source={sucesso} />
                <Text style={estilos.titulo}>Cadastro efetuado com sucesso!</Text>
            </View>
            <View style={estilos.rodape}>
                <TouchableHighlight style={estilos.rodapeBotao} onPress={acessarMenu}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Acessar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroSucessoUser;
