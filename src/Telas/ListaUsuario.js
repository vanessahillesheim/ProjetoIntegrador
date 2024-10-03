import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Alert, Image } from "react-native";
import { collection, onSnapshot, doc, deleteDoc, getDoc } from "firebase/firestore";
import database from "../database/firebaseconexao";
import { estilos } from "../styleSheet/estilos";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Cabecalho from "./Cabecalho";
import { auth } from "../database/firebaseconexao";

function ListaUsuario({ navigation }) {
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const usuariosCollection = collection(database, "usuarios");

        const unsubscribe = onSnapshot(usuariosCollection, (snapshot) => {
            const usuariosList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsuarios(usuariosList);
            setLoading(false);
            console.log("Usuários atualizados:", usuariosList);
        }, (error) => {
            console.error("Erro ao buscar usuários: ", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Função para deletar usuário
    const handleDelete = async (id) => {
        Alert.alert(
            "Excluir Usuário",
            "Tem certeza que deseja excluir este usuário?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            const usuarioRef = doc(database, "usuarios", id);
                            const docSnapshot = await getDoc(usuarioRef);

                            // Verifica se o usuário existe
                            if (!docSnapshot.exists()) {
                                Alert.alert("Erro", "Usuário não encontrado.");
                                return;
                            }

                            // Exclui o documento do Firestore
                            await deleteDoc(usuarioRef);
                            Alert.alert("Sucesso", "Usuário excluído com sucesso!");

                            // Atualiza a lista de usuários, removendo o excluído
                            setUsuarios(prevUsuarios => prevUsuarios.filter(usuario => usuario.id !== id));
                        } catch (error) {
                            console.error("Erro ao excluir usuário: ", error.message);
                            Alert.alert("Erro", `Não foi possível excluir o usuário. Erro: ${error.message}`);
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
                <Text>Carregando usuários...</Text>
            </View>
        );
    }

     // Função de logout
 
     function deslogar() {
        auth.signOut();
        navigation.navigate('Tela1');
    }
    

    return (
        <View style={estilos.fundo}>
           <Cabecalho logout={deslogar} />
            <Text style={[estilos.titulo, {paddingTop: 60} ]}>Usuários Cadastrados</Text>

            <FlatList
    data={usuarios}
    keyExtractor={item => item.id}
    renderItem={({ item }) => (
        <TouchableOpacity style={estilos.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Exibindo a foto do usuário */}
                {item.foto ? (
                    <Image
                        source={{ uri: item.foto }}
                        style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                    />
                ) : (
                    <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: '#ccc', marginRight: 10 }} />
                )}
                <View style={{ flex: 1 }}>
                    <Text style={estilos.cardTitle}>{item.nome}</Text>
                    <Text style={{ color: '#555' }}>email: {item.email}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {/* Ícone de edição */}
                    <TouchableOpacity onPress={() => navigation.navigate('AtualizacaoUsuario', { usuario: item })}>
                        <Icon name="edit" size={15} color="#12B1F5" style={{ marginRight: 10 }} />
                    </TouchableOpacity>

                    
                </View>
            </View>
            <View>
  <Text style={{ color: '#555' }}>
    {item.endereco?.rua || 'N/A'}, Bairro: {item.endereco?.bairro || 'N/A'}
  </Text>
  <View style={{ flexDirection: "row" }}>
    <Text style={{ color: '#555' }}>
      CEP: {item.endereco?.cep || 'N/A'}, Cidade: {item.endereco?.cidade || 'N/A'}
    </Text>
  </View>
</View>

        </TouchableOpacity>
    )}
    style={{ flex: 1, margingBottom: 30 }}
/>


        </View>
    );
}

export default ListaUsuario;
