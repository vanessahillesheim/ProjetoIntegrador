import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import CxTxTCorrida from "./CxTxTCorrida";
import { useNavigation } from "@react-navigation/native";

function CadastroCorrida() {
    const nav = useNavigation();
    let fundoCabecalho = require("../img/cabecalho.png");

    let arraypHol = ['Nome do evento:', 'Data:', 'Distância a percorrer (km);', 'Local da largada:', 'Horário da largada:', 'Valor da Inscrição em R$:'];
    let arrayaCap = ['characters', 'none', 'none', 'none', 'none', 'none'];
    let arraycMax = ['50', '11', '2', '30', '5', '10'];
    let arraykTyp = ['default', 'number-date', 'number-pad', 'email-address', 'phone-pad', 'default'];
    let arrayEdit = ['true', 'true', 'true', 'true', 'true', 'true'];
    let arraysegT = ['false', 'false', 'false', 'false', 'false', 'false'];
    let arraymLin = ['false', 'false', 'false', 'false', 'false', 'false'];
    let campos = [];

    for (let i = 0; i < arraypHol.length; i++) {
        campos.push(
            <CxTxTCorrida
                key={i}
                pHol={arraypHol[i]}
                aCap={arrayaCap[i]}
                cMax={arraycMax[i]}
                kTyp={arraykTyp[i]}
                edit={arrayEdit[i]}
                segT={arraysegT[i]}
                mLin={arraymLin[i]}
            />
        );
    }

    function cadastroSucesso() {
        nav.navigate('CadastroSucesso');
    }

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalhoCadastro}>
                <View>
                    <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                </View>
            </View>
            <View style={estilos.corpoCadastro}>
                <Text style={estilos.titulo}>Cadastre a nova corrida:</Text>
                {campos}
            </View>
           
           
           
           
            <View style={estilos.rodapeCadastro}> 
                <TouchableHighlight
                    style={estilos.rodapeBotao}
                    onPress={() => cadastroSucesso()}
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Adicionar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroCorrida;
