import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, TextInput, Pressable, Modal, Alert } from "react-native"; 
import { estilos } from "../styleSheet/estilos";
import { doc, updateDoc } from "firebase/firestore";
import database from "../database/firebaseconexao"; 
import { useNavigation, useRoute } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import moment from 'moment-timezone'; // Adicionando moment-timezone

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
    const [showCalendar, setShowCalendar] = useState(false); 
    

    const onDayPress = (day) => {
        // Ajuste a data para o fuso horário local
        const selectedDate = moment(day.dateString).tz(moment.tz.guess()).format('YYYY-MM-DD');
        setData(selectedDate);
        setShowCalendar(false);
    };
    
    
    const handleUpdate = async () => {
        // Campos obrigatórios que precisam ser preenchidos
        if (!data || !distancia || !local || !horario || !valor) {
            Alert.alert("Erro", "Os campos Data, Distância, Local, Horário e Valor são obrigatórios!");
            return;
        }
    
        try {
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
            
            Alert.alert("Sucesso", "Corrida atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar a corrida: ", error);
            Alert.alert("Erro", "Ocorreu um erro ao atualizar a corrida. Tente novamente.");
        } finally {
            navigation.navigate('ListaCorridas'); // Navega para a tela ListaCorridas
        }
    };
    



    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalho}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
            </View>

            <View style={estilos.corpoMenu}>
                <Text style={estilos.titulo}>{corrida.nomeEvento}</Text> 

                <Pressable onPress={() => setShowCalendar(true)} style={{ padding: 10 }}>
                    <Text style={estilos.entrada_texto4}>{data ? `Data Selecionada: ${data}` : "Selecione a data:"}</Text>
                </Pressable>

                <Modal transparent={true} visible={showCalendar} animationType="slide" onRequestClose={() => setShowCalendar(false)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                            <Calendar 
                                onDayPress={onDayPress} 
                                markedDates={{ [data]: { selected: true, selectedColor: 'blue' } }} 
                            />
                            <Pressable onPress={() => setShowCalendar(false)}>
                                <Text style={{ marginTop: 10, color: 'blue', textAlign: 'center' }}>Fechar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <TextInput
                    style={estilos.entrada_texto4} 
                    placeholder="Distância (km):"
                    autoCapitalize="none"
                    maxLength={10}
                    keyboardType="default"
                    editable={true}
                    onChangeText={setDistancia}
                    value={distancia}
                />
                <TextInput
                    style={estilos.entrada_texto4} 
                    placeholder="Local:"
                    autoCapitalize="none"
                    maxLength={30}
                    keyboardType="default"
                    editable={true}
                    onChangeText={setLocal}
                    value={local}
                />
                <TextInput
                    style={estilos.entrada_texto4} 
                    placeholder="Horário (hh:mm):"
                    autoCapitalize="none"
                    maxLength={5}
                    keyboardType="default"
                    editable={true}
                    onChangeText={setHorario}
                    value={horario}
                />
                <TextInput
                    style={estilos.entrada_texto4} 
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