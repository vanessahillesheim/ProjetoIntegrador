import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { estilos } from "../styleSheet/estilos";
import { auth } from "../database/firebaseconexao";

export default function Cabecalho({ logout }) {
    let fundoCabecalho = require("../img/cabecalho.png");
    const [usuario, setUsuario] = useState(null); // Estado para armazenar o usuário autenticado

    useEffect(() => {
        // Função para escutar as mudanças no estado de autenticação
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUsuario(user); // Atualiza o estado com o usuário autenticado ou null
        });

        // Limpa a inscrição quando o componente desmonta
        return () => unsubscribe();
    }, []);

    return (
        <View style={estilos.cabecalho}>
            <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />

            {/* Contêiner para o texto e o botão */}
            <View style={{ position: 'absolute', right: 10, top: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
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
