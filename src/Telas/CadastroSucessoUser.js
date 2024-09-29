import React, { useEffect } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { useNavigation } from "@react-navigation/native";

function CadastroSucessoUser() {
    let fundoCabecalho = require("../img/cabecalho.png");
    let logo = require("../img/logo.png");
    let sucesso = require("../img/sucesso.png");
    const nav = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            nav.replace('Menu'); // Redireciona para Menu após 3 segundos
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

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
                <TouchableHighlight style={estilos.rodapeBotao} onPress={() => nav.navigate('Tela1')}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Logar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroSucessoUser;
