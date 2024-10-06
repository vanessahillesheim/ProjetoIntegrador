import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore"; 
import database from "../database/firebaseconexao"; 
import { estilos } from "../styleSheet/estilos"; 
import Icon from 'react-native-vector-icons/FontAwesome5'; 
import moment from 'moment-timezone'; 
import { auth } from "../database/firebaseconexao";
import Cabecalho from "./Cabecalho";
import { useNavigation } from "@react-navigation/native"; // Importando para navegação

function ListaCorridas({ navigation }) {
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

    function deslogar() {
        auth.signOut();
        navigation.navigate('Tela1'); 
    }
    
    function irParaMenu() {
        navigation.navigate('Menu'); // Navegação para a tela de Menu
    }
    

    return (
        <View style={estilos.fundo}>
          <Cabecalho navigation={navigation} logout={deslogar} irParaMenu={irParaMenu} />
            <View>
                <Text style={[estilos.titulo, { marginTop: 60 }]}>Corridas Cadastradas</Text>
            </View>
            <FlatList
    data={corridas}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
        <TouchableOpacity style={estilos.card} activeOpacity={0.7}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Certifique-se de que o texto esteja envolvido por <Text> */}
                <Text style={estilos.cardTitle}>{item.nomeEvento}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => handleUpdate(item)} style={{ marginRight: 10 }}>
                        <Icon name="edit" size={15} color="#12B1F5" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteCorrida(item.id)}>
                        <Icon name="trash" size={15} color="#12B1F5" />
                    </TouchableOpacity>
                </View>
            </View>
            <View>

            {/* Todos os textos devem estar dentro de <Text> */}
            <Text>Data: {moment(item.data).tz(moment.tz.guess()).format('DD/MM/YYYY')}</Text>
            <Text>Distância: {item.distancia} km</Text>
            <Text>Local: {item.local}</Text>
            <Text>Horário: {item.horario}</Text>
            <Text>Valor: R$ {item.valor}</Text>
            <Text>Tempo Bruto: {item.tempoBruto}</Text>
            <Text>Tempo Líquido: {item.tempoLiquido}</Text>
            <Text>Classificação Geral: {item.classificacaoGeral}</Text>
            <Text>Classif. Faixa Etária: {item.classificacaoFaixaEtaria}</Text>
            </View>
        </TouchableOpacity>
    )}
    style={{ flex: 1, marginBottom: 30 }}
/>

        </View>
    );
}

export default ListaCorridas;
