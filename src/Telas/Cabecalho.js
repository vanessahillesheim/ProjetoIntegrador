import React from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { estilos } from "../styleSheet/estilos";
import { auth } from "../database/firebaseconexao";

export default function Cabecalho({ logout}) {
    let fundoCabecalho = require("../img/cabecalho.png");
    const usuario = auth.currentUser;

    return (
        <View style={estilos.cabecalho}>
            <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />

            {/* Contêiner para o texto e o botão */}
            <View style={{ position: 'absolute', right: 10, top: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ color: 'white', marginRight: 50 }}>
                    {usuario ? usuario.email : 'Usuário não logado'}
                </Text>

                <TouchableOpacity style={estilos.cabecalhoBotoes} onPress={logout}>
                    <Icon name={'log-out'} size={18} color={"#fff"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
