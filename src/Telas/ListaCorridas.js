// src/Telas/ListaCorridas.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import database from "../database/firebaseconexao"; // Importa a configuração do Firebase
import { estilos } from "../styleSheet/estilos"; // Importa os estilos
import Icon from 'react-native-vector-icons/FontAwesome5'; // Importa o ícone

function ListaCorridas({ navigation }) {
    const fundoCabecalho = require("../img/cabecalho.png");
    const [corridas, setCorridas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCorridas = async () => {
            try {
                const corridasCollection = collection(database, "corridas");
                const corridasSnapshot = await getDocs(corridasCollection);
                const corridasList = corridasSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                // Ordena as corridas por data em ordem decrescente
                const sortedCorridas = corridasList.sort((a, b) => new Date(b.data) - new Date(a.data));
                setCorridas(sortedCorridas);
            } catch (error) {
                console.error("Erro ao buscar corridas: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCorridas();
    }, []);

    const handleUpdate = (item) => {
        navigation.navigate('AtualizacaoCorrida', { corrida: item });
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
                        <Text style={estilos.cardTitle}>{item.nomeEvento}</Text>
                        <Text>Data: {new Date(item.data).toLocaleDateString()}</Text>
                        <Text>Distância: {item.distancia} km</Text>
                        <Text>Local: {item.local}</Text>
                        <Text>Horário: {item.horario}</Text>
                        <Text>Valor: R$ {item.valor}</Text>
                        <Text>Tempo Bruto: {item.tempoBruto}</Text>
                        <Text>Tempo Líquido: {item.tempoLiquido}</Text>
                        <Text>Classificação Geral: {item.classificacaoGeral}</Text>
                        <Text>Classificação Faixa Etária: {item.classificacaoFaixaEtaria}</Text>
                        
                        <TouchableOpacity onPress={() => handleUpdate(item)}>
                            <Icon name="edit" size={20} color="#12B1F5" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                style={{ flex: 0.6 }} // Adiciona flex 0.6 ao FlatList
            />
        </View>
    );
}

export default ListaCorridas;
