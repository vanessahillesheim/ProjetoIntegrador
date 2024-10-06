import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { estilos } from "../styleSheet/estilos";
import { auth } from "../database/firebaseconexao";

export default function Cabecalho({ navigation, logout }) { // Adicionando navigation aqui
    let fundoCabecalho = require("../img/cabecalho.png");
    let icone = require("../img/icone.png");
    const [usuario, setUsuario] = useState(null); // Estado para armazenar o usuário autenticado

    useEffect(() => {
        // Função para escutar as mudanças no estado de autenticação
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUsuario(user); // Atualiza o estado com o usuário autenticado ou null
        });

        // Limpa a inscrição quando o componente desmonta
        return () => unsubscribe();
    }, []);

    function deslogar() {
        auth.signOut();
        navigation.navigate('Tela1'); 
    }
    
    function irParaMenu() {
        navigation.navigate('Menu'); // Navegação para a tela de Menu
    }

    

    return (
        <View style={estilos.cabecalho}>
            <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
            <View style={{ position: 'absolute', top: 10, left: 10, flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={irParaMenu}>
                <Image style={{ width: 40, height: 40, borderRadius: 50, left: 10 }}name={'Menu'} source={icone} />
                </TouchableOpacity>
            </View>
            <View style={{
                position: 'absolute',
                top: 20,
                right: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{ color: 'white', marginRight: 50 }}>
                    {usuario ? usuario.email : 'Usuário não logado'}
                </Text>
                <TouchableOpacity style={estilos.cabecalhoBotoes} onPress={deslogar}>
                    <Icon name={'log-out'} size={18} color={"#fff"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
