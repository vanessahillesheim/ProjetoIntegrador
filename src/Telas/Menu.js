import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { useNavigation } from "@react-navigation/native";
import Cabecalho from "./Cabecalho";
import { auth } from "../database/firebaseconexao";






function Menu() {
    
 
    const nav = useNavigation();

    function calendario(){
        nav.navigate('Calendario')
    }
    function novacorrida(){
        nav.navigate('CadastroCorrida')
    }

    function lista(){
        nav.navigate('ListaCorridas')
    }

    function detalhes(){
        nav.navigate('AtualizacaoUsuario')
    }

    function diaNoite(){
        nav.navigate('DiaNoite')
    }

    function deslogar(){
        auth.signOut();
        nav.replace('Tela1');
    }


    return (
        <View style={estilos.fundo}>
            <Cabecalho logout={deslogar}/>
           
            <View style={estilos.corpoMenu}>
            <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => novacorrida()}

                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Nova Corrida</Text>
                </TouchableHighlight>
              
               
            
                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => lista()}

                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Todas Corridas</Text>
                </TouchableHighlight>

                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => detalhes()}

                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Atualização Usuário</Text>
                </TouchableHighlight>

                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => diaNoite()}

                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Dia ou noite?</Text>
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