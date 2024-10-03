import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from "react-native";
import { collection, onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore"; 
import database from "../database/firebaseconexao"; 
import { estilos } from "../styleSheet/estilos"; 
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import moment from 'moment-timezone'; 
import Cabecalho from "./Cabecalho";
import { auth } from "../database/firebaseconexao"; // Mantemos a importação do auth

function ListaCorridas({ navigation }) {
    const fundoCabecalho = require("../img/cabecalho.png");
    const [corridas, setCorridas] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const corridasCollection = collection(database, "corridas");

        const unsubscribe = onSnapshot(corridasCollection, (snapshot) => {
            const corridasList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const sortedCorridas = corridasList.sort((a, b) => new Date(b.data) - new Date(a.data));
            setCorridas(sortedCorridas);
            setLoading(false);
        }, (error) => {
            console.error("Erro ao buscar corridas: ", error);
            Alert.alert("Erro", "Não foi possível carregar as corridas.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleUpdate = (item) => {
        navigation.navigate('AtualizacaoCorrida', { corrida: item });
    };

    function deleteCorrida(id){
        const corridasDocRef = doc(database, "corridas", id);
        deleteDoc(corridasDocRef);
    };



    if (loading) {
        return (
            <View style={estilos.fundo}>
                <Text>Carregando corridas...</Text>
            </View>
        );
    }

    // Função de logout
    function deslogar() {
        auth.signOut();
        navigation.replace('Tela1');
    }

        

    return (
        <View style={estilos.fundo}>
       <View>
                    <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                </View>
         <Text style={[estilos.titulo, {marginTop: 10}]}>Corridas Cadastradas</Text>

         <FlatList
                data={corridas}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={estilos.card} activeOpacity={0.7}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={estilos.cardTitle}>{item.nomeEvento}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => handleUpdate(item)} style={{ marginRight: 10 }}>
                                    <Icon name="edit" size={15} color="#12B1F5" />
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={() => deleteCorrida(item.id)}>
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
                style={{ flex: 1, margingBottom: 30 }}
            />
             
        </View>
    );
}

export default ListaCorridas;
