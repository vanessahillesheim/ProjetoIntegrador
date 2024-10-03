import React, { useEffect, useState } from "react"; // Mantenha apenas esta importação
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native"; // Adicione TouchableOpacity aqui
import { estilos } from "../styleSheet/estilos";
import { useNavigation } from "@react-navigation/native";
import { auth } from "../database/firebaseconexao";
import Icon from 'react-native-vector-icons/Feather'; // Certifique-se de que o Icon está importado corretamente

function Menu() {
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

    const nav = useNavigation();

    function calendario() {
        nav.navigate('Calendario');
    }
    function novacorrida() {
        nav.navigate('CadastroCorrida');
    }

    function listaCorridas() {
        nav.navigate('ListaCorridas');
    }

  
    function perfil() {
        nav.navigate('PerfilUsuario');
    }

    function deslogar() {
        auth.signOut();
        nav.replace('Tela1');
    }

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalho}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                {/* Contêiner para o texto e o botão */}
                <View style={{ position: 'absolute', right: 10, top: 10, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={{ color: 'white', marginRight: 50 }}>
                        {usuario ? usuario.email : 'Usuário não logado'}
                    </Text>

                    <TouchableOpacity style={estilos.cabecalhoBotoes} onPress={deslogar}> {/* Corrigido de logout para deslogar */}
                        <Icon name={'log-out'} size={18} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={estilos.corpoMenu}>
                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => novacorrida()}
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Nova Corrida</Text>
                </TouchableHighlight>

                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => listaCorridas()}
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Todas Corridas</Text>
                </TouchableHighlight>

               
                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => perfil()}
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Perfil Usuário</Text>
                </TouchableHighlight>

                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => calendario()}
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Calendário</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default Menu;
