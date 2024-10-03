import React, { useEffect, useState } from "react";
import { View, Text, Alert, Image, Button, TouchableHighlight } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import database from "../database/firebaseconexao";
import { estilos } from "../styleSheet/estilos";
import { auth } from "../database/firebaseconexao";
import Cabecalho from "./Cabecalho";
import { useNavigation } from "@react-navigation/native"; // Importando para navegação

function PerfilUsuario() {
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation(); // Hook de navegação

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("Usuário autenticado: ", user); // Log para depuração
                try {
                    const usuariosCollection = collection(database, "usuarios");
                    // Consulta para encontrar o documento onde o campo UID é igual ao UID do usuário autenticado
                    const q = query(usuariosCollection, where("uid", "==", user.uid));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        const usuarioData = querySnapshot.docs[0].data();
                        setUsuario({ id: querySnapshot.docs[0].id, ...usuarioData });
                    } else {
                        Alert.alert("Usuário não encontrado!");
                    }
                } catch (error) {
                    console.error("Erro ao buscar dados do usuário: ", error);
                    Alert.alert("Erro ao buscar dados do usuário: ", error.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setUsuario(null);
                setLoading(false);
            }
        });

        return () => unsubscribeAuth();
    }, []);

    if (loading) {
        return (
            <View style={estilos.fundo}>
                <Text>Carregando perfil...</Text>
            </View>
        );
    }

    function deslogar() {
        auth.signOut();
        navigation.replace('Tela1');
    }

    return (
        <View style={estilos.fundo}>
            <Cabecalho logout={deslogar} />
            {usuario ? (
                <View style={{ alignItems: 'center', paddingTop: 100, flex: 0.8 }}>
                    {usuario.foto && (
                        <Image
                            source={{ uri: usuario.foto }}
                            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }} // Margem inferior para espaçamento
                        />
                    )}
                    <Text style={estilos.titulo}> {usuario.nome}</Text>
                    {/* Exibindo informações do usuário com espaçamento maior */}

                    <Text style={{ marginBottom: 10, fontSize: 18 }}>{usuario.endereco?.rua || 'N/A'}</Text>
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>Bairro: {usuario.endereco?.bairro || 'N/A'}</Text>
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>Cidade: {usuario.endereco?.cidade || 'N/A'}</Text>
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>CEP: {usuario.endereco?.cep || 'N/A'}</Text>
                    <Text style={{ marginBottom: 10, fontSize: 18 }}>e-mail: {usuario.email || 'N/A'}</Text>

                    <View style={{paddingTop: 50}}>
                    <TouchableHighlight style={estilos.rodapeBotao} onPress={() => navigation.navigate("AtualizacaoUsuario")}>
                        <Text style={{ color: 'white', fontWeight: "bold" }}>Editar</Text>
                    </TouchableHighlight>
                    </View>

                </View>
            ) : (
                <Text>Nenhum usuário encontrado</Text>
            )}
        </View>
    );
}

export default PerfilUsuario;
