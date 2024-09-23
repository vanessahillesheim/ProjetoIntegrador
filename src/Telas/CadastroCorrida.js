<<<<<<< HEAD
import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, Pressable, Modal, Alert } from "react-native";
import { Calendar } from 'react-native-calendars';
import { estilos } from "../styleSheet/estilos";
import CxTxTCorrida from "./CxTxTCorrida";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import database from "../database/firebaseconexao";

function CadastroCorrida() {
    const [nomeEvento, setNomeEvento] = useState("");
    const [data, setData] = useState("");
    const [distancia, setDistancia] = useState("");
    const [local, setLocal] = useState("");
    const [horario, setHorario] = useState("");
    const [valor, setValor] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const nav = useNavigation();
    const fundoCabecalho = require("../img/cabecalho.png");

    const handleAddCorrida = async () => {
        if (!nomeEvento || !data || !distancia || !local || !horario || !valor) {
            Alert.alert("Erro", "Todos os campos são obrigatórios!");
            return;
        }

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

    const onDayPress = (day) => {
        setData(day.dateString);
        setShowCalendar(false);
    };

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalhoCadastro}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
            </View>
            <View style={estilos.corpoCadastro}>
                <Text style={estilos.titulo}>Cadastre a nova corrida:</Text>
                <CxTxTCorrida pHol="Nome do evento:" aCap="characters" cMax="50" kTyp="default" edit={true} onChangeText={setNomeEvento} />

                <Pressable onPress={() => setShowCalendar(true)} style={{ padding: 10 }}>
                    <Text style={estilos.entrada_texto}>{data ? `Data Selecionada: ${data}` : "Selecione a data:"}</Text>
                </Pressable>

                <Modal transparent={true} visible={showCalendar} animationType="slide" onRequestClose={() => setShowCalendar(false)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                            <Calendar onDayPress={onDayPress} markedDates={{ [data]: { selected: true, selectedColor: 'blue' } }} />
                            <Pressable onPress={() => setShowCalendar(false)}>
                                <Text style={{ marginTop: 10, color: 'blue', textAlign: 'center' }}>Fechar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <CxTxTCorrida pHol="Distância a percorrer (km):" aCap="none" cMax="2" kTyp="number-pad" edit={true} onChangeText={setDistancia} />
                <CxTxTCorrida pHol="Local da largada:" aCap="none" cMax="30" kTyp="default" edit={true} onChangeText={setLocal} />
                <CxTxTCorrida pHol="Horário da largada:" aCap="none" cMax="5" kTyp="default" edit={true} onChangeText={setHorario} />
                <CxTxTCorrida pHol="Valor da Inscrição em R$:" aCap="none" cMax="10" kTyp="default" edit={true} onChangeText={setValor} />
            </View>
            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight style={estilos.rodapeBotao} onPress={handleAddCorrida}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Adicionar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default CadastroCorrida;
=======
import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, TouchableOpacity, Modal } from "react-native";
import { Calendar } from 'react-native-calendars'; // Importa o componente Calendar
import { estilos } from "../styleSheet/estilos";
import CxTxTCorrida from "./CxTxTCorrida";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import database from "../database/firebaseconexao"; // Importa a configuração do Firebase

function CadastroCorrida() {
    const [nomeEvento, setNomeEvento] = useState("");
    const [data, setData] = useState(""); // Estado para a data selecionada
    const [distancia, setDistancia] = useState("");
    const [local, setLocal] = useState("");
    const [horario, setHorario] = useState("");
    const [valor, setValor] = useState("");

    const [showCalendar, setShowCalendar] = useState(false); // Estado para controlar a exibição do calendário
    const nav = useNavigation();
    let fundoCabecalho = require("../img/cabecalho.png");

    const handleAddCorrida = async () => {
        try {
            await addDoc(collection(database, "corridas"), {
                nomeEvento,
                data, // A data selecionada será armazenada no formato yyyy-mm-dd
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

    // Função para lidar com a seleção de data no calendário
    const onDayPress = (day) => {
        setData(day.dateString); // Armazena a data selecionada (formato yyyy-mm-dd)
        setShowCalendar(false); // Fecha o modal após a seleção
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

                {/* Campo de data */}
                <TouchableOpacity
                    onPress={() => setShowCalendar(true)}
                    activeOpacity={1} // Define uma opacidade fixa, evitando qualquer alteração visual ao pressionar ou passar o mouse
                >
                    <View >
                        <Text style={estilos.entrada_texto}>{data ? `Data Selecionada: ${data}` : "Selecione a data:"}</Text>
                    </View>
                </TouchableOpacity>

                {/* Exibe o Modal com o calendário */}
                <Modal
                    transparent={true}
                    visible={showCalendar}
                    animationType="slide"
                    onRequestClose={() => setShowCalendar(false)} // Fecha o modal se o usuário pressionar o botão voltar
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                            <Calendar
                                onDayPress={onDayPress} // Chama a função ao pressionar um dia
                                markedDates={{
                                    [data]: { selected: true, selectedColor: 'blue' } // Marca a data selecionada
                                }}
                            />
                            <TouchableOpacity onPress={() => setShowCalendar(false)}>
                                <Text style={{ marginTop: 10, color: 'blue', textAlign: 'center' }}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

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
>>>>>>> 7445952cd1ba76e126cb4c5471bc8e60f9c7d606
