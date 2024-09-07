import React from "react";
import { View, Text, Image, TouchableHighlight, TextInput } from "react-native";
import { estilos } from "../styleSheet/estilos";
import CxTxTCorrida from "./CxTxTCorrida";
import { useNavigation } from "@react-navigation/native";


function atualizacaoCorrida() {
    let fundoCabecalho = require("../img/cabecalho.png");



    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalho}>
                <View>
                    <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                </View>


            </View>

            <View style={{ flex: 0.5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text>Tempo Bruto:</Text>
                    <Text>Tempo Líquido:</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TextInput
                        style={estilos.entrada_texto3}
                        placeholder=""
                        autoCapitalize="none"
                    />


                    <TextInput
                        style={estilos.entrada_texto3}
                        placeholder=""
                        autoCapitalize="none"


                    />
                </View>
           

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Text>Classificação Geral:</Text>
                <Text>Classificação faixa etária:</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TextInput
                    style={estilos.entrada_texto3}
                    placeholder=""
                    autoCapitalize="none"
                />


                <TextInput
                    style={estilos.entrada_texto3}
                    placeholder=""
                    autoCapitalize="none"


                />
            </View>
                
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <Text>Foto da Medalha:</Text>

            </View>
            </View>



            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight
                    style={estilos.rodapeBotao}
                /*  onPress={() => cadastroSucesso()} */
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Atualizar</Text>
                </TouchableHighlight>
            </View>



        </View>
    );
}
export default atualizacaoCorrida;
