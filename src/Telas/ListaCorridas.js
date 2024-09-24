import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { collection, onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore"; // Importa deleteDoc e getDoc
import database from "../database/firebaseconexao"; // Importa a configuração do Firebase
import { estilos } from "../styleSheet/estilos"; // Importa os estilos
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importa o ícone
import moment from 'moment-timezone'; // Importa moment-timezone

function ListaCorridas({ navigation }) {
    const fundoCabecalho = require("../img/cabecalho.png");
    const [corridas, setCorridas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const corridasCollection = collection(database, "corridas");

        const unsubscribe = onSnapshot(corridasCollection, (snapshot) => {
            const corridasList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Ordena as corridas por data
            const sortedCorridas = corridasList.sort((a, b) => new Date(b.data) - new Date(a.data));
            setCorridas(sortedCorridas);
            setLoading(false);
            console.log("Corridas atualizadas:", sortedCorridas); // Log das corridas atualizadas
        }, (error) => {
            console.error("Erro ao buscar corridas: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleUpdate = (item) => {
        navigation.navigate('AtualizacaoCorrida', { corrida: item });
    };

    const handleDelete = async (id) => {
        Alert.alert(
            "Excluir Corrida",
            "Tem certeza que deseja excluir esta corrida?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        console.log("Exclusão iniciada para ID:", id); // Log para verificar se a exclusão está sendo chamada
                        try {
                            const corridaRef = doc(database, "corridas", id);
                            console.log("Referência do documento:", corridaRef.path); // Log da referência do documento
    
                            const docSnapshot = await getDoc(corridaRef); // Verifica se o documento existe
                            if (!docSnapshot.exists()) {
                                Alert.alert("Erro", "Corrida não encontrada.");
                                return; // Se o documento não existe, sai da função
                            }
    
                            await deleteDoc(corridaRef); // Tenta deletar o documento
                            console.log("Corrida excluída com sucesso!"); // Log de sucesso
                            Alert.alert("Sucesso", "Corrida excluída com sucesso!"); // Alerta de sucesso
    
                            // Atualiza a lista após a exclusão
                            setCorridas(prevCorridas => prevCorridas.filter(corrida => corrida.id !== id));
                        } catch (error) {
                            console.error("Erro ao excluir corrida: ", error.message); // Exibe a mensagem detalhada do erro
                            Alert.alert("Erro", `Não foi possível excluir a corrida. Erro: ${error.message}`); // Alerta de erro
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    };
    

    if (loading) {
        return (
            <View style={estilos.fundo}>
                <Text>Carregando corridas...</Text>
            </View>
        );
    }

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalhoCadastro}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
            </View>
            
            <Text style={[estilos.titulo, { paddingTop: 50 }]}>Corridas Cadastradas</Text>

            <FlatList
                data={corridas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={estilos.card}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={estilos.cardTitle}>{item.nomeEvento}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => handleUpdate(item)}>
                                    <Icon name="edit" size={15} color="#12B1F5" style={{ marginRight: 10 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    console.log("Delete icon pressed for ID:", item.id); // Log ao clicar no ícone de delete
                                    handleDelete(item.id);
                                }}>
                                    <Icon name="trash" size={15} color="#12B1F5" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text>Data: {moment(item.data).tz(moment.tz.guess()).format('DD/MM/YYYY')}</Text>
                        <Text>Distância: {item.distancia} km</Text>
                        <Text>Local: {item.local}</Text>
                        <Text>Horário: {item.horario}</Text>
                        <Text>Valor: R$ {item.valor}</Text>
                        <Text>Tempo Bruto: {item.tempoBruto}</Text>
                        <Text>Tempo Líquido: {item.tempoLiquido}</Text>
                        <Text>Classificação Geral: {item.classificacaoGeral}</Text>
                        <Text>Classif. Faixa Etária: {item.classificacaoFaixaEtaria}</Text>
                    </TouchableOpacity>
                )}
                style={{ flex: 0.6 }} // Adiciona flex 0.6 ao FlatList
            />
        </View>
    );
}

export default ListaCorridas;
