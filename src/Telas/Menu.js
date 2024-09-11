import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { useNavigation } from "@react-navigation/native";


function Menu() {
    let fundoCabecalho = require("../img/cabecalho.png");

    const nav = useNavigation();

    function lista(){
        nav.navigate('ListaCorridas')
    }
    function novacorrida(){
        nav.navigate('CadastroCorrida')
    }

    function status(){
        nav.navigate('StatusCorrida')
    }

    function detalhes(){
        nav.navigate('DetalhesCorridas')
    }

    function diaNoite(){
        nav.navigate('DiaNoite')
    }

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalhoCadastro}>
                <View>
                    <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                </View>
              
            </View>
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
                    onPress={() => status()}

                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Status Corridas</Text>
                </TouchableHighlight>

                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => detalhes()}

                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Detalhes da Corrida</Text>
                </TouchableHighlight>

                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => diaNoite()}

                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Dia ou noite?</Text>
                </TouchableHighlight>
                        
            </View>

            
        </View>

        



    );
}
export default Menu