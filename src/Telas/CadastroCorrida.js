import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight, Pressable, Modal } from "react-native";
import { Calendar } from 'react-native-calendars';
import { estilos } from "../styleSheet/estilos";
import CxTxTCorrida from "./CxTxTCorrida";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import database from "../database/firebaseconexao";
import Cabecalho from "./Cabecalho";
import { auth } from "../database/firebaseconexao";

function CadastroCorrida() {
    const [nomeEvento, setNomeEvento] = useState("");
    const [data, setData] = useState("");
    const [distancia, setDistancia] = useState("");
    const [local, setLocal] = useState("");
    const [horario, setHorario] = useState("");
    const [valor, setValor] = useState("");
    const [showCalendar, setShowCalendar] = useState(false);
    const [error, setError] = useState(false); // Estado de erro
    const navigation = useNavigation();
    

    const handleAddCorrida = async () => {
        // Verifica se todos os campos obrigatórios foram preenchidos
        if (!nomeEvento || !data || !distancia || !local || !horario || !valor) {
            setError(true); // Ativa o estado de erro se algum campo estiver vazio
            return;
        }

        setError(false); // Reseta o erro se tudo estiver preenchido

        try {
            await addDoc(collection(database, "corridas"), {
                nomeEvento,
                data,
                distancia,
                local,
                horario,
                valor,
            });
            navigation.navigate('CadastroSucessoCorrida');
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
        }
    };

    const onDayPress = (day) => {
        setData(day.dateString);
        setShowCalendar(false);
    };
    
    function deslogar() {
        auth.signOut();
        navigation.replace('Tela1');
    }

    function irParaMenu() {
        navigation.navigate('Menu');
    }
    return (
        <View style={estilos.fundo}>
           <Cabecalho navigation={navigation} logout={deslogar} irParaMenu={irParaMenu} />
            <View style={estilos.corpoCadastro}>
                <Text style={[estilos.titulo, { marginTop: 10 }]}>Cadastre a nova corrida:</Text>

                <CxTxTCorrida 
                    pHol="Nome do evento:" 
                    aCap="characters" 
                    cMax="50" 
                    kTyp="default" 
                    edit={true} 
                    onChangeText={setNomeEvento} 
                />

                <Pressable onPress={() => setShowCalendar(true)} style={{ padding: 10 }}>
                    <Text style={estilos.entrada_texto4}>{data ? `Data Selecionada: ${data}` : "Selecione a data:"}</Text>
                </Pressable>

                <Modal transparent={true} visible={showCalendar} animationType="slide" onRequestClose={() => setShowCalendar(false)}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, }}>
                            <Calendar onDayPress={onDayPress} markedDates={{ [data]: { selected: true, selectedColor: 'blue' } }} />
                            <Pressable onPress={() => setShowCalendar(false)}>
                                <Text style={{ marginTop: 10, color: 'blue', textAlign: 'center' }}>Fechar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

                <CxTxTCorrida 
                    pHol="Distância a percorrer (km):" 
                    aCap="none" 
                    cMax="2" 
                    kTyp="number-pad" 
                    edit={true} 
                    onChangeText={setDistancia} 
                />

                <CxTxTCorrida 
                    pHol="Local da largada:" 
                    aCap="none" 
                    cMax="30" 
                    kTyp="default" 
                    edit={true} 
                    onChangeText={setLocal} 
                />

                <CxTxTCorrida 
                    pHol="Horário da largada:" 
                    aCap="none" 
                    cMax="5" 
                    kTyp="default" 
                    edit={true} 
                    onChangeText={setHorario} 
                />

                <CxTxTCorrida 
                    pHol="Valor da Inscrição em R$:" 
                    aCap="none" 
                    cMax="10" 
                    kTyp="default" 
                    edit={true} 
                    onChangeText={setValor} 
                />
                
                {/* Exibe a mensagem de erro em vermelho se houver campos não preenchidos */}
                {error && (
                    <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>
                        Obrigatório o preenchimento de todos os campos.
                    </Text>
                )}

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
