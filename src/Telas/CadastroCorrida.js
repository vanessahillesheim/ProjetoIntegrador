import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import CxTxTCorrida from "./CxTxTCorrida";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import database from "../database/firebaseconexao"; // Importa a configuração do Firebase

function CadastroCorrida() {
    const [nomeEvento, setNomeEvento] = useState("");
    const [data, setData] = useState("");
    const [distancia, setDistancia] = useState("");
    const [local, setLocal] = useState("");
    const [horario, setHorario] = useState("");
    const [valor, setValor] = useState("");

    const nav = useNavigation();
    let fundoCabecalho = require("../img/cabecalho.png");

    const handleAddCorrida = async () => {
        try {
            await addDoc(collection(database, "corridas"), {
                nomeEvento,
                data,
                distancia,
                local,
                horario,
                valor,
            });
            nav.navigate('CadastroSucessoCorrida');
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
        }
    };

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalhoCadastro}>
                <View>
                    <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                </View>
            </View>
            <View style={estilos.corpoCadastro}>
                <Text style={estilos.titulo}>Cadastre a nova corrida:</Text>
                <CxTxTCorrida
                    pHol="Nome do evento:"
                    aCap="characters"
                    cMax="50"
                    kTyp="default"
                    edit="true"
                    onChangeText={setNomeEvento}
                />
                <CxTxTCorrida
                    pHol="Data:"
                    aCap="none"
                    cMax="11"
                    kTyp="number-date"
                    edit="true"
                    onChangeText={setData}
                />
                <CxTxTCorrida
                    pHol="Distância a percorrer (km):"
                    aCap="none"
                    cMax="2"
                    kTyp="number-pad"
                    edit="true"
                    onChangeText={setDistancia}
                />
                <CxTxTCorrida
                    pHol="Local da largada:"
                    aCap="none"
                    cMax="30"
                    kTyp="default"
                    edit="true"
                    onChangeText={setLocal}
                />
                <CxTxTCorrida
                    pHol="Horário da largada:"
                    aCap="none"
                    cMax="5"
                    kTyp="default"
                    edit="true"
                    onChangeText={setHorario}
                />
                <CxTxTCorrida
                    pHol="Valor da Inscrição em R$:"
                    aCap="none"
                    cMax="10"
                    kTyp="default"
                    edit="true"
                    onChangeText={setValor}
                />
            </View>
            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight
                    style={estilos.rodapeBotao}
                    onPress={handleAddCorrida}
                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Adicionar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroCorrida;
