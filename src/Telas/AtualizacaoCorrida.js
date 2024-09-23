import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, Alert, TextInput } from "react-native"; // Adicione TextInput aqui
import { estilos } from "../styleSheet/estilos";
import { doc, updateDoc } from "firebase/firestore";
import database from "../database/firebaseconexao"; 
import { useNavigation, useRoute } from "@react-navigation/native";

function AtualizacaoCorrida() {
    const route = useRoute();
    const navigation = useNavigation();
    const { corrida } = route.params; 
    const fundoCabecalho = require("../img/cabecalho.png");

    const [tempoBruto, setTempoBruto] = useState(corrida.tempoBruto);
    const [tempoLiquido, setTempoLiquido] = useState(corrida.tempoLiquido);
    const [classificacaoGeral, setClassificacaoGeral] = useState(corrida.classificacaoGeral);
    const [classificacaoFaixaEtaria, setClassificacaoFaixaEtaria] = useState(corrida.classificacaoFaixaEtaria);
    const [data, setData] = useState(corrida.data);
    const [distancia, setDistancia] = useState(corrida.distancia);
    const [local, setLocal] = useState(corrida.local);
    const [horario, setHorario] = useState(corrida.horario);
    const [valor, setValor] = useState(corrida.valor);

    const handleUpdate = async () => {
        if (!tempoBruto || !tempoLiquido || !classificacaoGeral || !classificacaoFaixaEtaria || !data || !distancia || !local || !horario || !valor) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return;
        }

        const corridaRef = doc(database, "corridas", corrida.id);
        await updateDoc(corridaRef, {
            tempoBruto,
            tempoLiquido,
            classificacaoGeral,
            classificacaoFaixaEtaria,
            data,
            distancia,
            local,
            horario,
            valor,
        });
        navigation.goBack(); 
    };

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalho}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
            </View>

            <View style={estilos.corpoCadastro}>
                <Text style={estilos.titulo}>Evento: {corrida.nomeEvento}</Text> 

                <TextInput
                    style={estilos.entrada_texto} // Aplica o estilo direto
                    placeholder="Data (YYYY-MM-DD):"
                    autoCapitalize="none"
                    maxLength={10}
                    keyboardType="default"
                    editable={true}
                    onChangeText={setData}
                    value={data}
                />
                <TextInput
                    style={estilos.entrada_texto} 
                    placeholder="Distância (km):"
                    autoCapitalize="none"
                    maxLength={10}
                    keyboardType="default"
                    editable={true}
                    onChangeText={setDistancia}
                    value={distancia}
                />
                <TextInput
                    style={estilos.entrada_texto} 
                    placeholder="Local:"
                    autoCapitalize="none"
                    maxLength={30}
                    keyboardType="default"
                    editable={true}
                    onChangeText={setLocal}
                    value={local}
                />
                <TextInput
                    style={estilos.entrada_texto} 
                    placeholder="Horário (hh:mm):"
                    autoCapitalize="none"
                    maxLength={5}
                    keyboardType="default"
                    editable={true}
                    onChangeText={setHorario}
                    value={horario}
                />
                <TextInput
                    style={estilos.entrada_texto} 
                    placeholder="Valor (R$):"
                    autoCapitalize="none"
                    maxLength={10}
                    keyboardType="default"
                    editable={true}
                    onChangeText={setValor}
                    value={valor}
                />

                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={estilos.entrada_texto3} 
                        placeholder="Tempo Bruto:"
                        autoCapitalize="none"
                        maxLength={8}
                        keyboardType="default"
                        editable={true}
                        onChangeText={setTempoBruto}
                        value={tempoBruto}
                    />
                    <TextInput
                        style={estilos.entrada_texto3} 
                        placeholder="Tempo Líquido:"
                        autoCapitalize="none"
                        maxLength={8}
                        keyboardType="default"
                        editable={true}
                        onChangeText={setTempoLiquido}
                        value={tempoLiquido}
                    />
                </View>

                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        style={estilos.entrada_texto3} 
                        placeholder="Classif. Geral:"
                        autoCapitalize="none"
                        maxLength={10}
                        keyboardType="default"
                        editable={true}
                        onChangeText={setClassificacaoGeral}
                        value={classificacaoGeral}
                    />
                    <TextInput
                        style={estilos.entrada_texto3} 
                        placeholder="Classif. Faixa Etária:"
                        autoCapitalize="none"
                        maxLength={10}
                        keyboardType="default"
                        editable={true}
                        onChangeText={setClassificacaoFaixaEtaria}
                        value={classificacaoFaixaEtaria}
                    />
                </View>
            </View>

            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight style={[estilos.rodapeBotao, { marginTop: 20 }]} onPress={handleUpdate}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Atualizar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default AtualizacaoCorrida;
