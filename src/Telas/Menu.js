import React, { useEffect, useState } from "react"; // Mantenha apenas esta importação
import { View, Text, Image, TouchableHighlight, TouchableOpacity } from "react-native"; // Adicione TouchableOpacity aqui
import { estilos } from "../styleSheet/estilos";
import { auth } from "../database/firebaseconexao";
import Cabecalho from "./Cabecalho";
import { useNavigation } from "@react-navigation/native"; // Importando para navegação

function Menu() {

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
        nav.navigate('Nova Corrida');
    }

    function listaCorridas() {
        nav.navigate('Todas Corridas');
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
            <Cabecalho logout={deslogar} />

            
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
